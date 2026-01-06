
import React, { lazy } from 'react';

export const resolveBlock = (type: string) => {
    const map: Record<string, string> = {
        'B0101': 'Navbar', 'B0102': 'Navbar',
        'B0201': 'Hero', 'B0202': 'Hero', 'B0203': 'Hero',
        'B0301': 'Skills', 'B0302': 'Skills',
        'B0401': 'Article', 'B0402': 'Article',
        'B0501': 'Portfolio', 'B0503': 'Portfolio',
        'B1401': 'Footer'
    };
    const name = map[type];
    if (!name) return null;
    
    // CRITICAL: Module normalization for mixed Export types (Default vs Named)
    return lazy(() => 
      import(`../components/${name}.tsx`)
      .then(module => {
          // If the module has a default export, use it.
          // Otherwise, look for a named export matching the component name.
          if (module.default) return { default: module.default };
          if (module[name]) return { default: module[name] };
          
          throw new Error(`Component ${name} has no default export or named export '${name}'`);
      })
      .catch((err) => {
        console.warn(`Block load failed: ${name}`, err);
        return { 
            default: () => (
              <div className="p-10 bg-zinc-900 border border-red-500/20 text-red-400 rounded-xl m-4 text-center">
                <div className="font-bold uppercase tracking-widest text-xs mb-1">Load Error: {name}</div>
                <div className="text-[9px] opacity-70 font-mono">{err.message}</div>
              </div>
            )
        };
      })
    );
};