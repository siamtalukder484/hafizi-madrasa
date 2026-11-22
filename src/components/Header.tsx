"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { madrasa, navLinks } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      {/* উপরের ছোট বার */}
      <div className="bg-brand-700 text-xs text-brand-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5">
          <span className="hidden sm:inline">{madrasa.address.full}</span>
          <span className="flex gap-3">
            {madrasa.phones.map((p, i) => (
              <a key={p} href={`tel:${madrasa.phonesTel[i]}`} className="hover:text-gold-300">
                ☎ {p}
              </a>
            ))}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="hidden rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-brand-800 shadow-sm transition hover:bg-gold-300 sm:inline-block"
          >
            দান করুন
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2 text-brand-700 hover:bg-brand-50 lg:hidden"
            aria-label="মেনু"
            aria-expanded={open}
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ডেস্কটপ মেনু */}
      <nav className="hidden border-t border-brand-100 lg:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap px-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block border-b-2 px-4 py-2.5 text-[15px] font-medium transition ${
                  isActive(l.href)
                    ? "border-gold-500 text-brand-700"
                    : "border-transparent text-gray-700 hover:text-brand-600"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* মোবাইল মেনু */}
      {open && (
        <nav className="border-t border-brand-100 lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 font-medium ${
                    isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-gray-700"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-2">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold-500 px-5 py-2.5 text-center font-semibold text-brand-800"
              >
                দান করুন
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
