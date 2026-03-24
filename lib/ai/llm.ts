// ============================================
// LLM Integration Layer
// Unified interface for all AI providers
// ============================================

import { parseModelString, getProviderConfig } from "./providers";

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "openai:gpt-4o";

export async function generateText(
  messages: LLMMessage[],
  options: LLMOptions = {}
): Promise<LLMResponse> {
  const modelString = options.model || DEFAULT_MODEL;
  const { provider, model } = parseModelString(modelString);
  const config = getProviderConfig(provider);

  if (!config) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    throw new Error(`API key not configured for provider: ${provider}. Set ${config.apiKeyEnv}`);
  }

  const baseUrl = config.baseUrlEnv
    ? process.env[config.baseUrlEnv] || getDefaultBaseUrl(provider)
    : getDefaultBaseUrl(provider);

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(provider === "anthropic"
        ? { "x-api-key": apiKey, "anthropic-version": "2023-06-01" }
        : {}),
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 4096,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error (${response.status}): ${error}`);
  }

  const data = await response.json();

  return {
    content: data.choices?.[0]?.message?.content || "",
    model: data.model || model,
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        }
      : undefined,
  };
}

export async function* generateTextStream(
  messages: LLMMessage[],
  options: LLMOptions = {}
): AsyncGenerator<string> {
  const modelString = options.model || DEFAULT_MODEL;
  const { provider, model } = parseModelString(modelString);
  const config = getProviderConfig(provider);

  if (!config) throw new Error(`Unknown provider: ${provider}`);

  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) throw new Error(`API key not configured for ${provider}`);

  const baseUrl = config.baseUrlEnv
    ? process.env[config.baseUrlEnv] || getDefaultBaseUrl(provider)
    : getDefaultBaseUrl(provider);

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 4096,
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`LLM streaming error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

    for (const line of lines) {
      const data = line.slice(6);
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // Skip malformed chunks
      }
    }
  }
}

function getDefaultBaseUrl(provider: string): string {
  switch (provider) {
    case "openai":
      return "https://api.openai.com/v1";
    case "anthropic":
      return "https://api.anthropic.com/v1";
    case "google":
      return "https://generativelanguage.googleapis.com/v1beta/openai";
    default:
      return "https://api.openai.com/v1";
  }
}
