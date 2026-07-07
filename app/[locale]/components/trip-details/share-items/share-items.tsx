import React from 'react';
import { ShareItemsSection } from './type';

export default function ShareItems({ items }: ShareItemsSection) {
  return (
    <div className="flex justify-center flex-col gap-4 md:flex-row my-10">
      {items?.map((item) => (
        <div className="bg-blue-800 px-4 py-2 rounded-md text-white" key={item.id}>
          {item.title}
        </div>
      ))}
    </div>
  );
}
