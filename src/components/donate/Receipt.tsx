"use client";

import { madrasa } from "@/data/site";
import { formatTaka, toBn } from "@/lib/bn";
import { methodLabels, type DonationRequest, type PaymentResult, type PaymentSession } from "@/lib/payment";

export function Receipt({
  result,
  session,
  request,
  fundName,
  onRetry,
  onNew,
}: {
  result: PaymentResult;
  session: PaymentSession;
  request: DonationRequest;
  fundName: string;
  onRetry: () => void;
  onNew: () => void;
}) {
  if (result.status === "failed") {
    return (
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">✕</div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">পেমেন্ট সম্পন্ন হয়নি</h2>
        <p className="mt-2 text-gray-600">{result.reason}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onRetry} className="rounded-full bg-brand-600 px-6 py-2.5 font-semibold text-white">
            আবার চেষ্টা করুন
          </button>
          <button onClick={onNew} className="rounded-full border border-gray-300 px-6 py-2.5 text-gray-700">
            শুরুতে ফিরুন
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(result.paidAt);
  const rows: [string, string][] = [
    ["দাতা", request.donor.anonymous ? "গোপন দাতা" : request.donor.name],
    ["মোবাইল", request.donor.phone],
    ["খাত", fundName],
    ["পরিমাণ", formatTaka(request.amount)],
    ["মাধ্যম", methodLabels[session.method]],
    ["ট্রানজেকশন আইডি", result.transactionId],
    ["তারিখ", toBn(date.toLocaleDateString("en-GB")) + " " + toBn(date.toLocaleTimeString("en-GB"))],
  ];

  return (
    <div className="text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-100 text-3xl text-brand-600">✓</div>
      <h2 className="mt-4 font-serif text-2xl text-brand-700">জাযাকাল্লাহু খাইরান!</h2>
      <p className="mt-1 text-gray-600">আপনার দান সফলভাবে গ্রহণ করা হয়েছে। আল্লাহ কবুল করুন।</p>

      <div className="mx-auto mt-6 max-w-md rounded-xl border border-dashed border-brand-200 p-5 text-left print:border-solid">
        <p className="text-center font-semibold text-brand-700">{madrasa.name}</p>
        <p className="text-center text-xs text-gray-500">দানের রশিদ</p>
        <dl className="mt-4 space-y-2 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-gray-100 pb-1.5">
              <dt className="text-gray-500">{k}</dt>
              <dd className="text-right font-medium text-gray-900">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-center text-xs text-amber-700">স্যান্ডবক্স রশিদ — কোনো আসল লেনদেন হয়নি</p>
      </div>

      <div className="mt-6 flex justify-center gap-3 print:hidden">
        <button onClick={() => window.print()} className="rounded-full border border-gray-300 px-6 py-2.5 text-gray-700">
          রশিদ প্রিন্ট করুন
        </button>
        <button onClick={onNew} className="rounded-full bg-brand-600 px-6 py-2.5 font-semibold text-white">
          আবার দান করুন
        </button>
      </div>
    </div>
  );
}
