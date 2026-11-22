import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Card, Container, SectionTitle } from "@/components/ui";
import { departments, madrasa, mahfil, notices, stats } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* হিরো */}
      <section className="pattern-bg">
        <Container className="grid items-center gap-10 py-16 md:grid-cols-[1fr_auto] md:py-24">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-gold-300">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            <h1 className="mt-4 font-serif text-3xl leading-snug text-white sm:text-5xl sm:leading-tight">
              {madrasa.name}
            </h1>
            <p className="mt-4 text-lg text-brand-100">{madrasa.tagline}</p>
            <p className="mt-1 text-sm text-brand-200">{madrasa.address.full}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <ButtonLink href="/donate" variant="gold">
                দান করুন
              </ButtonLink>
              <ButtonLink href="/admission" variant="outline">
                ভর্তি তথ্য
              </ButtonLink>
            </div>
          </div>
          <Image
            src="/logo.svg"
            alt="মাদ্রাসার লোগো"
            width={260}
            height={260}
            priority
            className="mx-auto size-48 drop-shadow-xl md:size-64"
          />
        </Container>
      </section>

      {/* পরিসংখ্যান */}
      <Container className="-mt-8">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-md md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-brand-50 p-4 text-center">
              <p className="font-serif text-3xl text-brand-700">{s.value}</p>
              <p className="mt-1 text-sm text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* মাহফিল ব্যানার */}
      <Container className="mt-14">
        <div className="overflow-hidden rounded-2xl border-2 border-gold-500 bg-gradient-to-r from-brand-700 to-brand-600 p-6 text-white sm:p-8">
          <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-brand-800">
            আসন্ন আয়োজন
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl">{mahfil.title}</h2>
          <p className="mt-1 text-brand-100">{mahfil.occasion}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span>📅 {mahfil.dates} ({mahfil.days})</span>
            <span>🗓 {mahfil.banglaDates}</span>
          </div>
          <p className="mt-1 text-sm">📍 {mahfil.venue}</p>
          <Link href="/notices" className="mt-5 inline-block font-semibold text-gold-300 hover:underline">
            বিস্তারিত দেখুন →
          </Link>
        </div>
      </Container>

      {/* বিভাগসমূহ */}
      <Container className="mt-16">
        <SectionTitle title="আমাদের বিভাগসমূহ" subtitle="শিশুদের কুরআন শিক্ষার ভিত্তি থেকে পূর্ণ হিফজ পর্যন্ত" />
        <div className="grid gap-6 md:grid-cols-2">
          {departments.map((d) => (
            <Card key={d.slug}>
              <h3 className="font-serif text-xl text-brand-700">{d.name}</h3>
              <p className="mt-1 text-sm text-gold-600">{d.short}</p>
              <ul className="mt-4 space-y-1.5 text-gray-700">
                {d.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-brand-500">✔</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/departments" className="font-semibold text-brand-600 hover:underline">
            সকল বিভাগের বিস্তারিত →
          </Link>
        </div>
      </Container>

      {/* লিল্লাহ বোর্ডিং ও দান */}
      <Container className="mt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-brand-50">
            <h3 className="font-serif text-xl text-brand-700">লিল্লাহ বোর্ডিং</h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              এতিম, গরিব ও অসহায় ছাত্রদের জন্য বিনা খরচে থাকা-খাওয়ার ব্যবস্থা রয়েছে। আপনার
              দান ও সহযোগিতায় এই ছাত্ররা কুরআনের হাফেজ হয়ে উঠছে।
            </p>
            <Link href="/lillah-boarding" className="mt-4 inline-block font-semibold text-brand-600 hover:underline">
              বিস্তারিত জানুন →
            </Link>
          </Card>
          <Card className="border-gold-500 bg-[#fff8e6]">
            <h3 className="font-serif text-xl text-brand-700">সদকায়ে জারিয়ার সুযোগ</h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              “যে ব্যক্তি কুরআন শিখে এবং অন্যকে শেখায়, সে-ই তোমাদের মধ্যে সর্বোত্তম।” — সহীহ বুখারী।
              কুরআন শিক্ষার এই খেদমতে অংশ নিন।
            </p>
            <div className="mt-4">
              <ButtonLink href="/donate">অনলাইনে দান করুন</ButtonLink>
            </div>
          </Card>
        </div>
      </Container>

      {/* নোটিশ */}
      <Container className="mt-16">
        <SectionTitle title="সর্বশেষ নোটিশ" />
        <div className="grid gap-4 md:grid-cols-3">
          {notices.map((n) => (
            <Card key={n.id}>
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">{n.tag}</span>
                <span className="text-gray-500">{n.date}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug text-gray-900">{n.title}</h3>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
