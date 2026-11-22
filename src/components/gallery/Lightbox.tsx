"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { GalleryCategory, GalleryImage } from "@/data/gallery";
import { toBn } from "@/lib/bn";

export function Lightbox({
  images,
  index,
  categoryLabel,
  onChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  categoryLabel: (id: GalleryCategory) => string;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const img = images[index];
  const prev = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
    }
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, images.length, onChange, onClose]);

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-2 text-3xl leading-none text-white backdrop-blur transition hover:bg-white/30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="বন্ধ করুন"
        className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xl text-white hover:bg-white/30"
      >
        ✕
      </button>

      <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[4/3] w-full">
          <Image src={img.src} alt={img.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-contain" />
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-white">
          <span>
            <span className="block font-medium">{img.title}</span>
            <span className="text-sm text-gold-300">
              {categoryLabel(img.category)}
              {img.date && ` • ${img.date}`}
            </span>
          </span>
          <span className="text-sm text-white/70">
            {toBn(index + 1)} / {toBn(images.length)}
          </span>
        </figcaption>
      </figure>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="আগের ছবি"
            className={`${navBtn} left-2 sm:left-6`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="পরের ছবি"
            className={`${navBtn} right-2 sm:right-6`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
