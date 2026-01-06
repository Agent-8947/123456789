
export const LANGUAGE_NAMES: Record<string, { name: string, flag: string }> = {
    en: { name: 'English', flag: '🇺🇸' },
    uk: { name: 'Ukrainian', flag: '🇺🇦' },
    ru: { name: 'Russian', flag: '🇷🇺' }
};
export const useTranslation = () => ({ t: (key: string) => key });
