export type LegalPageKind = 'privacy' | 'terms' | 'support'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface LegalPageCopy {
  eyebrow: string
  title: string
  summary: string
  dateLabel: string
  date: string
  sections: LegalSection[]
  contactTitle: string
  contactDescription: string
  contactAction: string
}

export interface LegalLocaleCopy {
  sectionNavLabel: string
  pages: Record<LegalPageKind, LegalPageCopy>
}
