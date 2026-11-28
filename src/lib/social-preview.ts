/** Fallback institucional para páginas públicas da APTOS. */
export const DEFAULT_SOCIAL_IMAGE = {
  url: "https://autoescolaaptos.com.br/social-preview.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Autoescola APTOS — Centro de Formação de Condutores em São José dos Pinhais",
} as const;

export type SocialImageDetails = { width: number; height: number; type: "image/png" | "image/jpeg" | "image/webp"; alt: string };
