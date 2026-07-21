import Image from 'next/image';
import { Partner } from './types';

interface Props {
  partner: Partner;
}

export default function PartnerCard({ partner }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition">
        <Image
          src={partner.logo}
          alt={partner.alt ?? partner.name}
          fill
          className="object-contain"
        />
      </div>

      <span className="mt-5 text-center text-md text-gray-800">{partner.name}</span>
    </div>
  );
}
