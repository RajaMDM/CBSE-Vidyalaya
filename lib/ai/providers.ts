// ============================================
// AI Provider Configuration
// Multi-LLM support inspired by OpenMAIC
// ============================================

export interface ProviderConfig {
  id: string;
  name: string;
  apiKeyEnv: string;
  baseUrlEnv?: string;
  modelsEnv?: string;
  defaultModels: string[];
}

export const AI_PROVIDERS: ProviderConfig[] = [
  {
    id: "openai",
    name: "OpenAI",
    apiKeyEnv: "OPENAI_API_KEY",
    baseUrlEnv: "OPENAI_BASE_URL",
    modelsEnv: "OPENAI_MODELS",
    defaultModels: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    apiKeyEnv: "ANTHROPIC_API_KEY",
    baseUrlEnv: "ANTHROPIC_BASE_URL",
    modelsEnv: "ANTHROPIC_MODELS",
    defaultModels: ["claude-sonnet-4-20250514", "claude-haiku-4-20250414"],
  },
  {
    id: "google",
    name: "Google",
    apiKeyEnv: "GOOGLE_API_KEY",
    baseUrlEnv: "GOOGLE_BASE_URL",
    modelsEnv: "GOOGLE_MODELS",
    defaultModels: ["gemini-2.0-flash", "gemini-1.5-pro"],
  },
];

export function getProviderConfig(providerId: string): ProviderConfig | undefined {
  return AI_PROVIDERS.find((p) => p.id === providerId);
}

export function parseModelString(modelString: string): { provider: string; model: string } {
  const parts = modelString.split(":");
  if (parts.length === 2) {
    return { provider: parts[0], model: parts[1] };
  }
  return { provider: "openai", model: modelString };
}

export function getAvailableProviders(): ProviderConfig[] {
  return AI_PROVIDERS.filter((p) => {
    const apiKey = process.env[p.apiKeyEnv];
    return apiKey && apiKey.length > 0;
  });
}

export function getModelsForProvider(providerId: string): string[] {
  const config = getProviderConfig(providerId);
  if (!config) return [];

  const customModels = config.modelsEnv ? process.env[config.modelsEnv] : undefined;
  if (customModels) {
    return customModels.split(",").map((m) => m.trim());
  }
  return config.defaultModels;
}
