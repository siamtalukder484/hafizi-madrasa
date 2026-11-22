"use client";

import { useState } from "react";

const input =
  "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-6 rounded-xl bg-brand-50 p-6 text-center text-brand-700">
        <p className="text-lg font-semibold">ধন্যবাদ! আপনার বার্তা পাওয়া গেছে।</p>
        <p className="mt-1 text-sm text-gray-600">(ডেমো — এখনো কোথাও পাঠানো হয়নি)</p>
      </div>
    );
  }

  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: ব্যাকএন্ড তৈরি হলে এখানে fetch("/api/contact", { method: "POST", body }) করুন
        setSent(true);
      }}
    >
      <label className="block">
        <span className="text-sm font-medium text-gray-700">আপনার নাম</span>
        <input required name="name" className={input} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">মোবাইল নম্বর</span>
        <input required name="phone" type="tel" inputMode="tel" className={input} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">বার্তা</span>
        <textarea required name="message" rows={5} className={input} />
      </label>
      <button
        type="submit"
        className="rounded-full bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700"
      >
        পাঠান
      </button>
    </form>
  );
}
