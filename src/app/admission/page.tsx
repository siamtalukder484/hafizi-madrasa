import type { Metadata } from "next";
import { Card, Container, PageHeader, Placeholder } from "@/components/ui";
import { madrasa } from "@/data/site";

export const metadata: Metadata = { title: "ভর্তি" };

const steps = [
  "অভিভাবকসহ মাদ্রাসা অফিসে উপস্থিত হওয়া",
  "ভর্তি ফরম সংগ্রহ ও পূরণ",
  "ছাত্রের মৌখিক যাচাই (তিলাওয়াত/প্রাথমিক জ্ঞান)",
  "প্রয়োজনীয় কাগজপত্র জমা ও ভর্তি নিশ্চিতকরণ",
];

const documents = [
  "ছাত্রের জন্ম নিবন্ধনের ফটোকপি",
  "২ কপি পাসপোর্ট সাইজের ছবি",
  "অভিভাবকের জাতীয় পরিচয়পত্রের ফটোকপি",
  "লিল্লাহ বোর্ডিংয়ের জন্য: এতিম/অসচ্ছলতার প্রত্যয়নপত্র",
];

export default function AdmissionPage() {
  return (
    <>
      <PageHeader title="ভর্তি তথ্য" subtitle="হিফজ ও নূরানী বিভাগে ভর্তি চলছে" />
      <Container className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-xl text-brand-700">ভর্তি প্রক্রিয়া</h2>
          <ol className="mt-4 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
                  {["১", "২", "৩", "৪"][i]}
                </span>
                <span className="text-gray-700">{s}</span>
              </li>
            ))}
          </ol>
        </Card>
        <Card>
          <h2 className="font-serif text-xl text-brand-700">প্রয়োজনীয় কাগজপত্র</h2>
          <ul className="mt-4 space-y-2">
            {documents.map((d) => (
              <li key={d} className="flex gap-2 text-gray-700">
                <span className="text-brand-500">✔</span>
                {d}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="md:col-span-2">
          <h2 className="font-serif text-xl text-brand-700">বয়স ও ফি</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-brand-50 p-4">
              <p className="font-semibold">নূরানী বিভাগ</p>
              <p className="text-sm text-gray-600">
                বয়স: <Placeholder>৫–৭ বছর (নমুনা)</Placeholder>
              </p>
              <p className="text-sm text-gray-600">
                ফি: <Placeholder>নির্ধারণ করুন</Placeholder>
              </p>
            </div>
            <div className="rounded-xl bg-brand-50 p-4">
              <p className="font-semibold">হিফজ বিভাগ</p>
              <p className="text-sm text-gray-600">
                বয়স: <Placeholder>৭–১২ বছর (নমুনা)</Placeholder>
              </p>
              <p className="text-sm text-gray-600">
                ফি: <Placeholder>নির্ধারণ করুন</Placeholder>
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            লিল্লাহ বোর্ডিংয়ে এতিম ও অসহায় ছাত্রদের সম্পূর্ণ বিনা খরচে ভর্তি নেওয়া হয়। বিস্তারিত জানতে
            কল করুন: {madrasa.phones.join(", ")}
          </p>
        </Card>
      </Container>
    </>
  );
}
