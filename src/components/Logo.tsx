import Image from "next/image";
import Link from "next/link";
import { madrasa } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src="/logo.svg" alt="" width={48} height={48} priority className="size-12 shrink-0" />
      <span className="leading-tight">
        <span
          className={`block font-serif text-base sm:text-lg ${light ? "text-white" : "text-brand-700"}`}
        >
          {madrasa.name}
        </span>
        <span className={`block text-xs ${light ? "text-gold-300" : "text-gold-600"}`}>
          {madrasa.address.line2}
        </span>
      </span>
    </Link>
  );
}
