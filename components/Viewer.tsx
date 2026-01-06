
import React, { Suspense, useEffect, useState } from 'react';
import { useStore } from '@/store';
import { resolveBlock } from '../utils/blockRegistry';

export const Viewer = () => {
    const { contentBlocks, importProjectData } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Option A: Use injected state (Instant)
        if ((window as any).__DNA_INITIAL_STATE__) {
            importProjectData((window as any).__DNA_INITIAL_STATE__);
            setLoading(false);
            return;
        }

        // Option B: Fetch fallback (Network)
        fetch('/project-data.json')
            .then(res => res.json())
            .then(data => {
                importProjectData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center bg-black text-white font-black tracking-[0.5em] text-xs uppercase animate-pulse">DNA_LOADING...</div>;

    return (
        <main className="min-h-screen bg-black">
            {contentBlocks.map((block) => {
                const Component = resolveBlock(block.type);
                if (!Component) return null;
                return (
                    <Suspense key={block.id} fallback={<div className="h-40 bg-zinc-900/10 animate-pulse" />}>
                        <Component id={block.id} type={block.type} localOverrides={block.localOverrides} />
                    </Suspense>
                );
            })}
        </main>
    );
};