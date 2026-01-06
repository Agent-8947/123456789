
import React, { Suspense, useEffect, useState } from 'react';
import { useStore } from '@/store';
import { resolveBlock } from '../utils/blockRegistry';

export const Viewer = () => {
    const { contentBlocks, globalSettings, importProjectData } = useStore();
    const [loading, setLoading] = useState(true);

    // SYSTEM 1: DATA HYDRATION
    useEffect(() => {
        if ((window as any).__DNA_INITIAL_STATE__) {
            importProjectData((window as any).__DNA_INITIAL_STATE__);
            setLoading(false);
        } else {
            fetch('/project-data.json')
                .then(res => res.json())
                .then(data => {
                    importProjectData(data);
                    setLoading(false);
                })
                .catch(e => console.error(e));
        }
    }, []);

    // SYSTEM 2: DNA BINDING ENGINE (Theme Synchronization)
    useEffect(() => {
        if (!globalSettings['GL01']) return;

        const root = document.documentElement;
        try {
            const gl01 = globalSettings['GL01'].params; // Typography
            const gl02 = globalSettings['GL02'].params; // Colors
            
            // 1. Fonts & Typography
            const fontName = gl01[7]?.value || 'Space Grotesk';
            const fontMap: Record<string, string> = {
                'Space Grotesk': 'Space Grotesk', 'Inter': 'Inter', 'Roboto': 'Roboto', 
                'Open Sans': 'Open Sans', 'Manrope': 'Manrope', 'Playfair Display': 'Playfair Display'
            };
            const family = fontMap[fontName] || 'Space Grotesk';
            
            // Update Google Fonts Link
            const link = document.getElementById('google-fonts') as HTMLLinkElement;
            if (link) {
                link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@300..900&display=swap`;
            }

            root.style.setProperty('--dna-font-family', `'${family}', sans-serif`);
            root.style.setProperty('--dna-base-size', (gl01[0]?.value || 16) + 'px');
            
            // 2. Colors
            root.style.setProperty('--dna-bg', gl02[0]?.value || '#000000');
            root.style.setProperty('--dna-surface', gl02[1]?.value || '#111111');
            root.style.setProperty('--dna-accent', gl02[2]?.value || '#3b82f6');
            root.style.setProperty('--dna-text-prim', gl02[3]?.value || '#ffffff');
            root.style.setProperty('--dna-text-sec', gl02[4]?.value || '#a1a1aa');
            root.style.setProperty('--dna-border', gl02[5]?.value || '#27272a');
        } catch (e) {
            console.warn('DNA Theme Sync Failed', e);
        }

    }, [globalSettings]);

    if (loading) return <div className="h-screen flex items-center justify-center bg-black text-white font-black tracking-[0.5em] text-xs uppercase animate-pulse">DNA_LOADING...</div>;

    return (
        <main className="min-h-screen transition-colors duration-700" style={{ backgroundColor: 'var(--dna-bg)', color: 'var(--dna-text-prim)' }}>
            {contentBlocks.map((block) => {
                const Component = resolveBlock(block.type);
                if (!Component) return null;
                return (
                    <Suspense key={block.id} fallback={<div className="h-40 animate-pulse bg-white/5" />}>
                        <Component id={block.id} type={block.type} localOverrides={block.localOverrides} />
                    </Suspense>
                );
            })}
        </main>
    );
};