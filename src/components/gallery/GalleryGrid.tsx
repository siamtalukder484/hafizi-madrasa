"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/data/gallery";
import { toBn } from "@/lib/bn";
import { Lightbox } from "./Lightbox";

const PAGE_SIZE = 9;

type Filter = GalleryCategory | "all";

export function GalleryGrid() {
  const params = useSearchParams();
  const initial = galleryCategories.some((c) => c.id === params.get("category"))
    ? (params.get("category") as GalleryCategory)
    : "all";

  const [filter, setFilter] = useState<Filter>(initial);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter);
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  function choose(f: Filter) {
    setFilter(f);
    setVisible(PAGE_SIZE);
    // লিংক শেয়ার করা যায় এমনভাবে URL আপডেট (পেজ রিলোড ছাড়া)
    const url = f === "all" ? "/gallery" : `/gallery?category=${f}`;
    window.history.replaceState(null, "", url);
  }

  const count = (f: Filter) =>
    f === "all" ? galleryImages.length : galleryImages.filter((i) => i.category === f).length;

  const label = (id: GalleryCategory) => galleryCategories.find((c) => c.id === id)!.label;

  return (
    <>
      {/* ক্যাটাগরি ফিল্টার */}
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="ক্যাটাগরি">
        {[{ id: "all" as const, label: "সব ছবি" }, ...galleryCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={filter === c.id}
            onClick={() => choose(c.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === c.id
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-brand-500 hover:text-brand-700"
            }`}
          >
            {c.label}
            <span className={`ml-1.5 text-xs ${filter === c.id ? "text-brand-100" : "text-gray-400"}`}>
              ({toBn(count(c.id))})
            </span>
          </button>
        ))}
      </div>

      {/* ছবির গ্রিড */}
      {shown.length === 0 ? (
        <p className="mt-12 text-center text-gray-500">এই ক্যাটাগরিতে এখনো কোনো ছবি নেই।</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {shown.map((img, i) => (
            <li key={img.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-brand-50 shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-300"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-left">
                  <span className="block text-sm font-medium leading-snug text-white">{img.title}</span>
                  <span className="mt-0.5 block text-xs text-gold-300">{label(img.category)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* লোড মোর */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          {toBn(filtered.length)}টি ছবির মধ্যে {toBn(shown.length)}টি দেখানো হচ্ছে
        </p>
        {remaining > 0 && (
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="mt-3 rounded-full bg-brand-600 px-8 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            আরো দেখুন ({toBn(Math.min(remaining, PAGE_SIZE))}টি)
          </button>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={shown}
          index={openIndex}
          categoryLabel={label}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
