import type { Metadata } from "next";
import { Card, Container, PageHeader, Placeholder, SectionTitle } from "@/components/ui";
import { committee, madrasa } from "@/data/site";

export const metadata: Metadata = { title: "আমাদের সম্পর্কে" };

const goals = [
  { title: "সহীহ কুরআন শিক্ষা", text: "প্রতিটি শিশুকে শুদ্ধ উচ্চারণে কুরআন তিলাওয়াত শেখানো।" },
  { title: "হাফেজে কুরআন তৈরি", text: "দক্ষ ও আমলদার হাফেজ গড়ে তোলা।" },
  { title: "আদব ও আখলাক", text: "ইসলামী আদর্শে চরিত্রবান ও দায়িত্বশীল মানুষ গড়া।" },
  { title: "অসহায়ের পাশে", text: "লিল্লাহ বোর্ডিংয়ের মাধ্যমে এতিম ও গরিব ছাত্রদের শিক্ষা নিশ্চিত করা।" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="আমাদের সম্পর্কে" subtitle={madrasa.tagline} />
      <Container className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 leading-relaxed text-gray-700">
          <h2 className="font-serif text-2xl text-brand-700">পরিচিতি</h2>
          <p>
            {madrasa.name} {madrasa.address.full} এ অবস্থিত একটি দ্বীনি শিক্ষা প্রতিষ্ঠান। এলাকার
            শিশু-কিশোরদের সহীহ-শুদ্ধভাবে কুরআন শিক্ষা দেওয়া এবং হাফেজে কুরআন হিসেবে গড়ে তোলার
            লক্ষ্যে মাদ্রাসাটি প্রতিষ্ঠিত হয়।
          </p>
          <p>
            বর্তমানে মাদ্রাসায় হিফজুল কুরআন ও নূরানী — এই দুটি বিভাগ চালু রয়েছে। অভিজ্ঞ ৪ জন
            শিক্ষক ছাত্রদের পাঠদান করেন। এতিম ও অসহায় ছাত্রদের জন্য রয়েছে লিল্লাহ বোর্ডিংয়ের
            ব্যবস্থা। প্রতি বছর তাফসীরুল কুরআন মাহফিলে হিফজ সম্পন্নকারী ছাত্রদের দস্তারবন্দী করা
            হয় — আলহামদুলিল্লাহ, ২০২৬ সালে ২১তম মাহফিল অনুষ্ঠিত হচ্ছে।
          </p>
          <p>
            প্রতিষ্ঠাকাল: <Placeholder>সাল লিখুন</Placeholder>
          </p>
        </div>
        <Card>
          <h3 className="font-serif text-lg text-brand-700">পরিচালনা কমিটি</h3>
          <ul className="mt-4 space-y-4">
            {committee.map((m) => (
              <li key={m.name}>
                <p className="font-semibold text-gray-900">{m.name}</p>
                <p className="text-sm text-gold-600">{m.role}</p>
              </li>
            ))}
          </ul>
        </Card>
      </Container>

      <Container className="mt-16">
        <SectionTitle title="আমাদের লক্ষ্য ও উদ্দেশ্য" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((g) => (
            <Card key={g.title}>
              <h3 className="font-semibold text-brand-700">{g.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{g.text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
