export const CONTENT_TYPES = {
  HEADER: "header",
  FOOTER: "footer",
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  DINNER: "dinner",
  PAGE: "page",
};

export const LOCALES = {
  "en-us": "English - United States",
  "fr-fr": "French - France",
} as const;

export type LocaleCode = keyof typeof LOCALES;

export const DEFAULT_LOCALE: LocaleCode = "en-us";
