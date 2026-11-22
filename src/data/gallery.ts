// গ্যালারির ছবি।
// নতুন ছবি যোগ করতে: ছবিটি public/gallery/ ফোল্ডারে রাখুন (jpg/png/webp),
// তারপর নিচের তালিকায় একটি লাইন যোগ করুন। নতুন ক্যাটাগরি লাগলে galleryCategories এ যোগ করুন।
// এখনকার .svg ছবিগুলো নমুনা — আসল ছবি দিয়ে বদলে দিন।
// পরে ব্যাকএন্ড হলে এই ডেটা API/ডাটাবেস থেকে আসবে।

export const galleryCategories = [
  { id: "mahfil", label: "মাহফিল" },
  { id: "dastarbandi", label: "দস্তারবন্দী" },
  { id: "classroom", label: "শ্রেণিকক্ষ ও পড়াশোনা" },
  { id: "lillah", label: "লিল্লাহ বোর্ডিং" },
  { id: "building", label: "মাদ্রাসা ভবন" },
  { id: "events", label: "অন্যান্য অনুষ্ঠান" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

export type GalleryImage = {
  id: string;
  src: string;
  title: string;
  category: GalleryCategory;
  date?: string;
};

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/gallery/mahfil-01.svg", title: "২০তম তাফসীরুল কুরআন মাহফিলের মঞ্চ", category: "mahfil", date: "ডিসেম্বর ২০২৫" },
  { id: "g2", src: "/gallery/dastarbandi-01.svg", title: "হাফেজ ছাত্রদের দস্তারবন্দী", category: "dastarbandi", date: "ডিসেম্বর ২০২৫" },
  { id: "g3", src: "/gallery/classroom-01.svg", title: "হিফজ বিভাগের সকালের সবক", category: "classroom" },
  { id: "g4", src: "/gallery/building-01.svg", title: "মাদ্রাসার মূল ভবন", category: "building" },
  { id: "g5", src: "/gallery/lillah-01.svg", title: "লিল্লাহ বোর্ডিংয়ের ছাত্রদের খাবার", category: "lillah" },
  { id: "g6", src: "/gallery/events-01.svg", title: "বার্ষিক পুরস্কার বিতরণী", category: "events" },
  { id: "g7", src: "/gallery/mahfil-02.svg", title: "মাহফিলে আগত মুসল্লিবৃন্দ", category: "mahfil", date: "ডিসেম্বর ২০২৫" },
  { id: "g8", src: "/gallery/classroom-02.svg", title: "নূরানী বিভাগের শিশুরা", category: "classroom" },
  { id: "g9", src: "/gallery/dastarbandi-02.svg", title: "দস্তারবন্দী পরবর্তী দোয়া", category: "dastarbandi", date: "ডিসেম্বর ২০২৫" },
  { id: "g10", src: "/gallery/lillah-02.svg", title: "বোর্ডিংয়ের থাকার কক্ষ", category: "lillah" },
  { id: "g11", src: "/gallery/building-02.svg", title: "মাদ্রাসা প্রাঙ্গণ", category: "building" },
  { id: "g12", src: "/gallery/events-02.svg", title: "হিফজ প্রতিযোগিতা", category: "events" },
  { id: "g13", src: "/gallery/mahfil-03.svg", title: "প্রধান অতিথির বক্তব্য", category: "mahfil", date: "ডিসেম্বর ২০২৫" },
  { id: "g14", src: "/gallery/classroom-03.svg", title: "তাজবীদ ক্লাস", category: "classroom" },
  { id: "g15", src: "/gallery/dastarbandi-03.svg", title: "নতুন হাফেজদের সাথে শিক্ষকবৃন্দ", category: "dastarbandi", date: "ডিসেম্বর ২০২৫" },
  { id: "g16", src: "/gallery/lillah-03.svg", title: "ইফতার আয়োজন", category: "lillah" },
  { id: "g17", src: "/gallery/building-03.svg", title: "নির্মাণাধীন নতুন শ্রেণিকক্ষ", category: "building" },
  { id: "g18", src: "/gallery/events-03.svg", title: "অভিভাবক সমাবেশ", category: "events" },
  { id: "g19", src: "/gallery/mahfil-04.svg", title: "মাহফিলের রাতের দৃশ্য", category: "mahfil", date: "ডিসেম্বর ২০২৪" },
  { id: "g20", src: "/gallery/classroom-04.svg", title: "মাসিক পরীক্ষা", category: "classroom" },
  { id: "g21", src: "/gallery/events-04.svg", title: "ঈদ পুনর্মিলনী", category: "events" },
  { id: "g22", src: "/gallery/dastarbandi-04.svg", title: "দস্তারবন্দী ২০২৪", category: "dastarbandi", date: "ডিসেম্বর ২০২৪" },
  { id: "g23", src: "/gallery/lillah-04.svg", title: "শীতবস্ত্র বিতরণ", category: "lillah" },
  { id: "g24", src: "/gallery/building-04.svg", title: "মাদ্রাসার অজুখানা", category: "building" },
];
