import { ReactNode } from 'react';

declare module './LanguageContext' {
  export interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => string;
  }

  export const LanguageProvider: React.FC<{ children: ReactNode }>;
  export const useLanguage: () => LanguageContextType;
}
