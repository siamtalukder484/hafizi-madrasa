import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="pattern-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-16">
        <h1 className="font-serif text-3xl text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-brand-100">{subtitle}</p>}
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-500" />
      </div>
    </section>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-serif text-2xl text-brand-700 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-2 max-w-2xl text-gray-600">{subtitle}</p>}
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-500" />
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-brand-100 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline";
}) {
  const styles = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    gold: "bg-gold-500 text-brand-800 hover:bg-gold-300",
    outline: "border border-white/60 text-white hover:bg-white/10",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-block rounded-full px-6 py-2.5 font-semibold shadow-sm transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-50 px-1.5 text-xs text-amber-700" title="নমুনা তথ্য — পরিবর্তন করুন">
      {children}
    </span>
  );
}
