import React from 'react';
import { ShareItemsSection } from './type';

export default function ShareItems({ items }: ShareItemsSection) {
  return (
    <div className="flex justify-center flex-col gap-4 md:flex-row mb-10 max-w-[400px] mx-auto">
      {items?.map((item) => (
        <div 
          className="mx-auto max-w-[200px] group relative inline-flex h-12 items-center bg-white justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-brand-blue transition-all duration-100 [box-shadow:5px_5px_#2e5cb3]"
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}