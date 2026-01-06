
import React from 'react';

export const Hero = ({ localOverrides = {} }: any) => (
  <section className="h-[70vh] flex flex-col items-center justify-center text-center px-10">
    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter max-w-5xl leading-none">
      {localOverrides.data?.title || 'ARCHITECTING DIGITAL DNA'}
    </h1>
    <p className="mt-8 opacity-40 uppercase tracking-[0.3em] text-[10px]">
      {localOverrides.data?.description || 'Synchronized Parameters v1.1'}
    </p>
  </section>
);