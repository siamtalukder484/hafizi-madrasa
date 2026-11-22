import type { Metadata } from "next";
import { ButtonLink, Card, Container, PageHeader } from "@/components/ui";
import { mahfil, notices } from "@/data/site";

export const metadata: Metadata = { title: "নোটিশ ও মাহফিল" };

export default function NoticesPage() {
  return (
    <>
      <PageHeader title="নোটিশ ও মাহফিল" subtitle="মাদ্রাসার সকল ঘোষণা ও আয়োজন" />

      {/* মাহফিল বিস্তারিত */}
      <Container className="mt-12">
        <div className="overflow-hidden rounded-2xl border-2 border-gold-500 bg-white shadow-sm">
          <div className="pattern-bg p-6 text-center text-white sm:p-8">
            <p className="text-gold-300">ঐতিহাসিক</p>
            <h2 className="mt-1 font-serif text-3xl">{mahfil.title}</h2>
            <p className="mt-2 text-brand-100">{mahfil.occasion}</p>
            <p className="mt-4 inline-block rounded-full bg-gold-500 px-5 py-2 font-semibold text-brand-800">
              {mahfil.dates} • {mahfil.days}
            </p>
            <p className="mt-2 text-sm text-brand-100">{mahfil.banglaDates}</p>
          </div>
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-brand-700">স্থান</h3>
              <p className="mt-1 text-gray-700">{mahfil.venue}</p>
              <h3 className="mt-5 font-semibold text-brand-700">প্রধান অতিথি</h3>
              <p className="mt-1 text-gray-700">{mahfil.chiefGuest.name}</p>
              <h3 className="mt-5 font-semibold text-brand-700">সভাপতিত্ব করবেন</h3>
              <p className="mt-1 text-gray-700">{mahfil.president}</p>
              <h3 className="mt-5 font-semibold text-brand-700">পৃষ্ঠপোষকতায়</h3>
              <p className="mt-1 text-gray-700">{mahfil.patron}</p>
              <p className="mt-1 text-sm text-gray-500">সার্বিক ব্যবস্থাপনায়: {mahfil.management}</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-700">আলোচকবৃন্দ</h3>
              <ul className="mt-2 space-y-3">
                {mahfil.speakers.map((s) => (
                  <li key={s.name} className="rounded-lg bg-brand-50 px-4 py-3">
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <p className="text-sm text-gold-600">{s.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-gray-600">আরো অন্যান্য ওলামায়ে কেরামগণ তাফসীর করিবেন।</p>
            </div>
          </div>
          <div className="border-t border-brand-100 bg-brand-50 p-6 text-center">
            <p className="text-gray-700">
              উক্ত মাহফিলে আপনারা দলে দলে যোগদান করিয়া দো-জাহানের অশেষ নেকি হাসিল করুন।
            </p>
            <div className="mt-4">
              <ButtonLink href="/donate?fund=mahfil">মাহফিলে সহযোগিতা করুন</ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      {/* নোটিশ তালিকা */}
      <Container className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-brand-700">নোটিশ বোর্ড</h2>
        <div className="space-y-4">
          {notices.map((n) => (
            <Card key={n.id}>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">{n.tag}</span>
                <span className="text-gray-500">{n.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{n.title}</h3>
              <p className="mt-1 text-gray-700">{n.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
