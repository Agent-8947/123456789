
import { lazy } from 'react';

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
    
    // Using relative path precisely as in reference structure
    return lazy(() => import(`../components/${name}.tsx`)
      .catch(() => ({ 
        default: () => (
          <div className="p-10 bg-zinc-900 text-zinc-500 rounded-3xl m-4 text-center border border-zinc-800">
            <div className="text-[10px] uppercase font-black tracking-widest">BLOCK [ ${name} ] NOT LOADED</div>
            <div className="text-[8px] opacity-40 mt-1">Check if components/${name}.tsx exists</div>
          </div>
        )
      }))
    );
};