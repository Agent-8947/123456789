
import { create } from 'zustand';

interface AppState {
  currentLanguage: string;
  globalSettings: any;
  contentBlocks: any[];
  uiTheme: any;
  setCurrentLanguage: (lang: string) => void;
  importProjectData: (json: string) => void;
}

export const useStore = create<AppState>((set) => ({
    currentLanguage: 'en',
    globalSettings: {},
    contentBlocks: [],
    uiTheme: {},
    
    setCurrentLanguage: (lang) => set({ currentLanguage: lang }),
    
    importProjectData: (json) => {
        try {
            const data = typeof json === 'string' ? JSON.parse(json) : json;
            set({
                globalSettings: data.globalSettings || {},
                contentBlocks: data.pages?.home || [],
                uiTheme: data.uiTheme || {},
                currentLanguage: data.currentLanguage || 'en'
            });
        } catch (e) {
            console.error("Store import failed", e);
        }
    }
}));