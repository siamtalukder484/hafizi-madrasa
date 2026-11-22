import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, PageHeader } from "@/components/ui";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = { title: "গ্যালারি" };

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="ফটো গ্যালারি" subtitle="মাদ্রাসার বিভিন্ন আয়োজন ও দৈনন্দিন কার্যক্রমের ছবি" />
      <Container className="mt-10">
        <Suspense fallback={<p className="text-center text-gray-500">লোড হচ্ছে...</p>}>
          <GalleryGrid />
        </Suspense>
      </Container>
    </>
  );
}
