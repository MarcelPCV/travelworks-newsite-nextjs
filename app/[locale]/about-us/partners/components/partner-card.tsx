import Image from "next/image";
import { Partner } from "./types";

interface Props {
  partner: Partner;
}

export default function PartnerCard({ partner }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-28 w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-800 p-6 shadow-sm transition hover:shadow-md">
        <Image
          src={partner.logo}
          alt={partner.alt ?? partner.name}
          width={180}
          height={70}
          className="max-h-14 w-auto object-contain"
        />
      </div>

      <span className="mt-2 text-center text-xs text-gray-800">
        {partner.name}
      </span>
    </div>
  );
}