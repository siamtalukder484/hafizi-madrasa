import Image from "next/image";
import Link from "next/link";
import { madrasa, navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="pattern-bg mt-16 text-brand-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="" width={56} height={56} className="size-14" />
            <p className="font-serif text-lg text-white">{madrasa.name}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-100">{madrasa.tagline}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gold-300">দ্রুত লিংক</h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/donate" className="hover:text-gold-300">
                দান করুন
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gold-300">যোগাযোগ</h3>
          <address className="mt-3 space-y-2 text-sm not-italic">
            <p>{madrasa.address.line1}</p>
            <p>{madrasa.address.line2}</p>
            {madrasa.phones.map((p, i) => (
              <p key={p}>
                <a href={`tel:${madrasa.phonesTel[i]}`} className="hover:text-gold-300">
                  ☎ {p}
                </a>
              </p>
            ))}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-200">
        © {madrasa.name} — সর্বস্বত্ব সংরক্ষিত
      </div>
    </footer>
  );
}
