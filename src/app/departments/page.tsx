import type { Metadata } from "next";
import { ButtonLink, Card, Container, PageHeader } from "@/components/ui";
import { departments } from "@/data/site";

export const metadata: Metadata = { title: "বিভাগসমূহ" };

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader title="বিভাগসমূহ" subtitle="হিফজুল কুরআন ও নূরানী বিভাগ" />
      <Container className="mt-12 space-y-8">
        {departments.map((d, i) => (
          <Card key={d.slug} className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-600 font-serif text-3xl text-gold-300">
              {i === 0 ? "ح" : "ن"}
            </div>
            <div>
              <h2 id={d.slug} className="font-serif text-2xl text-brand-700">
                {d.name}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">{d.description}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {d.points.map((p) => (
                  <li key={p} className="flex gap-2 rounded-lg bg-brand-50 px-3 py-2 text-gray-800">
                    <span className="text-brand-500">✔</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
        <div className="text-center">
          <ButtonLink href="/admission">ভর্তি তথ্য দেখুন</ButtonLink>
        </div>
      </Container>
    </>
  );
}
