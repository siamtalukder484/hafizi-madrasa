import type { Metadata } from "next";
import { Card, Container, PageHeader } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { madrasa } from "@/data/site";

export const metadata: Metadata = { title: "যোগাযোগ" };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="যোগাযোগ" subtitle="যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন" />
      <Container className="mt-12 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold text-brand-700">ঠিকানা</h2>
            <p className="mt-2 text-gray-700">{madrasa.name}</p>
            <p className="text-gray-700">{madrasa.address.line1}</p>
            <p className="text-gray-700">{madrasa.address.line2}</p>
          </Card>
          <Card>
            <h2 className="font-semibold text-brand-700">মোবাইল</h2>
            {madrasa.phones.map((p, i) => (
              <a
                key={p}
                href={`tel:${madrasa.phonesTel[i]}`}
                className="mt-2 block text-lg font-semibold text-gray-900 hover:text-brand-600"
              >
                ☎ {p}
              </a>
            ))}
          </Card>
          <div className="overflow-hidden rounded-2xl border border-brand-100">
            <iframe
              title="মাদ্রাসার অবস্থান"
              src={`https://www.google.com/maps?q=${encodeURIComponent(madrasa.mapQuery)}&output=embed`}
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
        <Card>
          <h2 className="font-serif text-xl text-brand-700">বার্তা পাঠান</h2>
          <ContactForm />
        </Card>
      </Container>
    </>
  );
}
