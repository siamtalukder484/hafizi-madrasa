import type { Metadata } from "next";
import { ButtonLink, Card, Container, PageHeader, Placeholder } from "@/components/ui";

export const metadata: Metadata = { title: "লিল্লাহ বোর্ডিং" };

const facilities = [
  "বিনা খরচে তিন বেলা খাবার",
  "নিরাপদ আবাসন ও বিছানাপত্র",
  "শিক্ষকদের সার্বক্ষণিক তত্ত্বাবধান",
  "কিতাব ও শিক্ষা উপকরণ",
  "প্রাথমিক চিকিৎসা",
  "নিয়মিত তারবিয়াত ও আমলের পরিবেশ",
];

const sponsorOptions = [
  { label: "একজন ছাত্রের এক মাসের খাবার", amount: "নির্ধারিত হয়নি" },
  { label: "একজন ছাত্রের পূর্ণ মাসিক খরচ", amount: "নির্ধারিত হয়নি" },
  { label: "একজন ছাত্রের এক বছরের খরচ", amount: "নির্ধারিত হয়নি" },
];

export default function LillahPage() {
  return (
    <>
      <PageHeader
        title="লিল্লাহ বোর্ডিং"
        subtitle="এতিম, গরিব ও অসহায় ছাত্রদের জন্য বিনা খরচে থাকা-খাওয়ার ব্যবস্থা"
      />
      <Container className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-gray-700">
          <h2 className="font-serif text-2xl text-brand-700">লিল্লাহ বোর্ডিং কী?</h2>
          <p>
            আর্থিক অসচ্ছলতার কারণে কোনো শিশু যেন কুরআন শিক্ষা থেকে বঞ্চিত না হয় — এই লক্ষ্যে
            মাদ্রাসায় লিল্লাহ বোর্ডিং চালু রয়েছে। এখানে এতিম ও অসহায় ছাত্ররা সম্পূর্ণ বিনা খরচে
            থেকে হিফজ ও নূরানী শিক্ষা গ্রহণ করে।
          </p>
          <p>
            এই বোর্ডিং সম্পূর্ণভাবে দানশীল ভাই-বোনদের যাকাত, সদকা ও অনুদানের উপর নির্ভরশীল।
          </p>
          <p>
            বর্তমান বোর্ডিং ছাত্র সংখ্যা: <Placeholder>সংখ্যা লিখুন</Placeholder>
          </p>
        </div>
        <Card>
          <h3 className="font-serif text-lg text-brand-700">সুবিধাসমূহ</h3>
          <ul className="mt-4 grid gap-2">
            {facilities.map((f) => (
              <li key={f} className="flex gap-2 text-gray-700">
                <span className="text-brand-500">✔</span>
                {f}
              </li>
            ))}
          </ul>
        </Card>
      </Container>

      <Container className="mt-12">
        <Card className="border-gold-500 bg-[#fff8e6]">
          <h2 className="font-serif text-2xl text-brand-700">একজন ছাত্রের দায়িত্ব নিন</h2>
          <p className="mt-2 text-gray-700">
            আপনি চাইলে একজন ছাত্রের মাসিক বা বার্ষিক খরচের দায়িত্ব নিতে পারেন।
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {sponsorOptions.map((o) => (
              <li key={o.label} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="font-medium text-gray-900">{o.label}</p>
                <p className="mt-1">
                  <Placeholder>{o.amount}</Placeholder>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ButtonLink href="/donate?fund=lillah">লিল্লাহ বোর্ডিংয়ে দান করুন</ButtonLink>
          </div>
        </Card>
      </Container>
    </>
  );
}
