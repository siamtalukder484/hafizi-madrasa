"use client";

import { useState } from "react";
import { formatTaka } from "@/lib/bn";
import { methodLabels, paymentProvider, type PaymentResult, type PaymentSession } from "@/lib/payment";

const input =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-center tracking-widest outline-none focus:border-gray-500";

/**
 * নকল পেমেন্ট গেটওয়ে স্ক্রিন। আসল গেটওয়েতে এই অংশ থাকবে না —
 * ইউজারকে session.redirectUrl এ পাঠানো হবে, তারপর callback পেজে ফলাফল আসবে।
 */
export function GatewayPanel({
  session,
  color,
  onCancel,
  onDone,
}: {
  session: PaymentSession;
  color: string;
  onCancel: () => void;
  onDone: (r: PaymentResult) => void;
}) {
  const isCard = session.method === "card";
  const [stage, setStage] = useState<"account" | "verify">(isCard ? "verify" : "account");
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [busy, setBusy] = useState(false);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    if (stage === "account") {
      setStage("verify");
      return;
    }
    setBusy(true);
    const result = await paymentProvider.confirm(session, isCard ? { account: card.number } : { account, otp, pin });
    setBusy(false);
    onDone(result);
  }

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-lg" style={{ borderColor: color }}>
      <div className="px-5 py-4 text-white" style={{ background: color }}>
        <p className="text-sm opacity-90">{methodLabels[session.method]} পেমেন্ট (স্যান্ডবক্স)</p>
        <p className="text-2xl font-bold">{formatTaka(session.amount)}</p>
        <p className="mt-1 text-xs opacity-80">ইনভয়েস: {session.sessionId}</p>
      </div>

      <form onSubmit={pay} className="space-y-4 bg-gray-50 p-5">
        {!isCard && stage === "account" && (
          <label className="block">
            <span className="text-sm text-gray-700">আপনার {methodLabels[session.method]} অ্যাকাউন্ট নম্বর</span>
            <input
              required
              autoFocus
              inputMode="numeric"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="01XXXXXXXXX"
              className={input}
            />
          </label>
        )}

        {!isCard && stage === "verify" && (
          <>
            <label className="block">
              <span className="text-sm text-gray-700">{account} নম্বরে পাঠানো ভেরিফিকেশন কোড (OTP)</span>
              <input required autoFocus inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} className={input} />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700">পিন নম্বর</span>
              <input required type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} className={input} />
            </label>
            <p className="rounded bg-amber-50 px-3 py-2 text-xs text-amber-800">
              টেস্ট: OTP <b>123456</b>, PIN <b>12345</b>
            </p>
          </>
        )}

        {isCard && (
          <>
            <label className="block">
              <span className="text-sm text-gray-700">কার্ড নম্বর</span>
              <input
                required
                autoFocus
                inputMode="numeric"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                placeholder="4242 4242 4242 4242"
                className={input}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm text-gray-700">মেয়াদ</span>
                <input required value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" className={input} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-700">CVC</span>
                <input required inputMode="numeric" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} placeholder="123" className={input} />
              </label>
            </div>
            <p className="rounded bg-amber-50 px-3 py-2 text-xs text-amber-800">
              টেস্ট কার্ড: <b>4242 4242 4242 4242</b>, যেকোনো মেয়াদ ও CVC
            </p>
          </>
        )}

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-gray-300 bg-white py-2.5 text-gray-700">
            বাতিল
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-lg py-2.5 font-semibold text-white disabled:opacity-60"
            style={{ background: color }}
          >
            {busy ? "প্রক্রিয়াধীন..." : stage === "account" ? "পরবর্তী" : "নিশ্চিত করুন"}
          </button>
        </div>
      </form>
    </div>
  );
}
