import type { Metadata } from "next";
import { Card, Container, PageHeader, Placeholder } from "@/components/ui";
import { teachers } from "@/data/site";

export const metadata: Metadata = { title: "শিক্ষকবৃন্দ" };

export default function TeachersPage() {
  return (
    <>
      <PageHeader title="শিক্ষকবৃন্দ" subtitle="আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ ৪ জন শিক্ষক" />
      <Container className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.map((t, i) => (
          <Card key={i} className="text-center">
            {/* ছবি যুক্ত করতে public/teachers/ ফোল্ডারে ছবি রেখে এখানে <Image> ব্যবহার করুন */}
            <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-brand-50 ring-4 ring-gold-300">
              <svg viewBox="0 0 24 24" className="size-12 text-brand-600" fill="currentColor" aria-hidden>
                <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.5-8 5.5V21h16v-1.5c0-3-3.6-5.5-8-5.5Z" />
              </svg>
            </div>
            <h2 className="mt-4 font-semibold leading-snug text-gray-900">{t.name}</h2>
            <p className="mt-1 font-medium text-gold-600">{t.role}</p>
            <p className="mt-2 text-sm text-gray-600">{t.department}</p>
            <p className="text-sm text-gray-500">{t.qualification}</p>
            {t.placeholder && (
              <p className="mt-3">
                <Placeholder>নমুনা — আসল নাম দিন</Placeholder>
              </p>
            )}
          </Card>
        ))}
      </Container>
    </>
  );
}
