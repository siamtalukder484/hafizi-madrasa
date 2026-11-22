import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, Container, PageHeader } from "@/components/ui";
import { DonationFlow } from "@/components/donate/DonationFlow";
import { madrasa } from "@/data/site";

export const metadata: Metadata = { title: "দান করুন" };

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="দান করুন"
        subtitle="আপনার দান মাদ্রাসার ছাত্রদের কুরআন শিক্ষা, লিল্লাহ বোর্ডিং ও উন্নয়নে ব্যয় হবে"
      />
      <Container className="mt-12 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Suspense fallback={<Card>লোড হচ্ছে...</Card>}>
          <DonationFlow />
        </Suspense>

        <aside className="space-y-6">
          <Card className="bg-brand-50">
            <p className="font-serif text-lg leading-relaxed text-brand-700">
              “যারা আল্লাহর পথে তাদের সম্পদ ব্যয় করে, তাদের উপমা একটি শস্যদানার মতো, যা থেকে সাতটি
              শীষ জন্মায়, প্রতিটি শীষে একশত দানা।”
            </p>
            <p className="mt-2 text-sm text-gray-600">— সূরা আল-বাকারা, আয়াত ২৬১</p>
          </Card>
          <Card>
            <h2 className="font-semibold text-brand-700">সরাসরি দান করতে চাইলে</h2>
            <p className="mt-2 text-sm text-gray-600">
              মাদ্রাসা অফিসে এসে অথবা নিচের নম্বরে যোগাযোগ করে সরাসরি দান করতে পারেন।
            </p>
            {madrasa.phones.map((p, i) => (
              <a key={p} href={`tel:${madrasa.phonesTel[i]}`} className="mt-2 block font-semibold text-gray-900">
                ☎ {p}
              </a>
            ))}
          </Card>
          <Card>
            <h2 className="font-semibold text-brand-700">স্বচ্ছতা</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
              <li>✔ প্রতিটি দানের রশিদ দেওয়া হয়</li>
              <li>✔ যাকাতের অর্থ আলাদা হিসাবে রাখা হয়</li>
              <li>✔ বার্ষিক আয়-ব্যয়ের হিসাব কমিটির কাছে উপস্থাপন করা হয়</li>
            </ul>
          </Card>
        </aside>
      </Container>
    </>
  );
}
