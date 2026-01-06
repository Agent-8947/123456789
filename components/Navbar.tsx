
import React from 'react';

export const Navbar = ({ localOverrides = {} }: any) => (
  <nav className="p-8 border-b border-white/5 flex justify-between items-center">
    <div className="font-black uppercase tracking-widest">{localOverrides.data?.header || 'DNA MATRIX'}</div>
    <div className="text-[10px] opacity-40 uppercase font-black">Architecture Pro</div>
  </nav>
);