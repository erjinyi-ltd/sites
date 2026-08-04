import type { Locale } from "./chrome";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalPageCopy = {
  pageTitle: string;
  eyebrow: string;
  title: string;
  lead: string;
  updatedLabel: string;
  updatedDate: string;
  summaryTitle: string;
  summaryText: string;
  highlights: string[];
  sections: LegalSection[];
  contactAction: string;
};

export type LegalMessages = Record<Locale, LegalPageCopy>;
