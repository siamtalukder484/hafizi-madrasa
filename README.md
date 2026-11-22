# রায়রাবাদ হোসাইনিয়া হাফিজিয়া নূরানীয়া মাদ্রাসা — ওয়েবসাইট

Next.js (App Router) + Tailwind CSS দিয়ে তৈরি মাদ্রাসার ওয়েবসাইট (ফ্রন্টএন্ড)।

## চালানোর নিয়ম

```bash
npm install
npm run dev
```

তারপর ব্রাউজারে http://localhost:3000 খুলুন।

## পেজসমূহ

| পেজ | পাথ |
| --- | --- |
| হোম | `/` |
| আমাদের সম্পর্কে | `/about` |
| বিভাগসমূহ (হিফজ ও নূরানী) | `/departments` |
| শিক্ষকবৃন্দ | `/teachers` |
| লিল্লাহ বোর্ডিং | `/lillah-boarding` |
| ভর্তি | `/admission` |
| নোটিশ ও মাহফিল | `/notices` |
| যোগাযোগ | `/contact` |
| দান করুন | `/donate` (`/donate?fund=lillah` দিলে খাত আগে থেকে সিলেক্ট থাকে) |

## কোথায় কী পরিবর্তন করবেন

- **সব লেখা/তথ্য:** `src/data/site.ts` — নাম, ঠিকানা, ফোন, শিক্ষক, নোটিশ, মাহফিল, দানের খাত।
  শিক্ষকদের মধ্যে ৩ জনের নাম নমুনা (`placeholder: true`) — আসল নাম বসিয়ে দিন।
- **লোগো:** `public/logo.svg` (ফেভিকন: `src/app/icon.svg`)
- **রং:** `src/app/globals.css` এর `@theme` অংশে `brand` ও `gold` রং।
- সাইটে হলুদ ব্যাজে দেখানো তথ্যগুলো নমুনা — সেগুলো পরিবর্তন করুন।

## দান / পেমেন্ট (স্যান্ডবক্স)

এখন পেমেন্ট সম্পূর্ণ ডামি — কোনো টাকা কাটা হয় না।

- বিকাশ / নগদ / রকেট: যেকোনো নম্বর, OTP `123456`, PIN `12345`
- কার্ড: `4242 4242 4242 4242`, যেকোনো মেয়াদ ও CVC

কোড:

- `src/lib/payment/types.ts` — `PaymentProvider` ইন্টারফেস
- `src/lib/payment/sandbox.ts` — ডামি প্রোভাইডার
- `src/lib/payment/index.ts` — কোন প্রোভাইডার চালু তা এখানে ঠিক হয়
- `src/components/donate/` — দানের ফর্ম, নকল গেটওয়ে স্ক্রিন ও রশিদ

### আসল গেটওয়ে (bKash / SSLCommerz / aamarPay) যুক্ত করতে

1. `src/app/api/payment/init/route.ts` — সার্ভারে গেটওয়ের API কল করে পেমেন্ট URL ফেরত দেবে।
2. `src/app/api/payment/callback/route.ts` — গেটওয়ে থেকে ফলাফল যাচাই করে ডাটাবেসে সেভ করবে।
3. `src/lib/payment/` এ নতুন provider বানিয়ে `index.ts` এ `paymentProvider` বদলে দিন।
4. গেটওয়ের secret key `.env.local` এ রাখুন, কখনো ক্লায়েন্ট কোডে নয়।

যোগাযোগ ফর্মও এখন ডেমো — `src/components/ContactForm.tsx` এ `/api/contact` যুক্ত করার জায়গা চিহ্নিত আছে।
