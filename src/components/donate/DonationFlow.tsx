"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { donationFunds, presetAmounts } from "@/data/site";
import { formatTaka, fromBn, toBn } from "@/lib/bn";
import {
  isSandbox,
  methodLabels,
  paymentProvider,
  type DonationRequest,
  type PaymentMethod,
  type PaymentResult,
  type PaymentSession,
} from "@/lib/payment";
import { GatewayPanel } from "./GatewayPanel";
import { Receipt } from "./Receipt";

type Step = "details" | "method" | "gateway" | "result";

const stepNames: { id: Step; label: string }[] = [
  { id: "details", label: "দানের তথ্য" },
  { id: "method", label: "পেমেন্ট মাধ্যম" },
  { id: "gateway", label: "পরিশোধ" },
  { id: "result", label: "রশিদ" },
];

const methods: { id: PaymentMethod; color: string; letter: string }[] = [
  { id: "bkash", color: "#e2136e", letter: "b" },
  { id: "nagad", color: "#f6921e", letter: "ন" },
  { id: "rocket", color: "#8c3494", letter: "R" },
  { id: "card", color: "#1a1f71", letter: "💳" },
];

const input =
  "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function DonationFlow() {
  const params = useSearchParams();
  const initialFund = donationFunds.some((f) => f.id === params.get("fund"))
    ? (params.get("fund") as string)
    : "general";

  const [step, setStep] = useState<Step>("details");
  const [fundId, setFundId] = useState(initialFund);
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [donor, setDonor] = useState({ name: "", phone: "", email: "", anonymous: false });
  const [note, setNote] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("bkash");
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = customAmount ? Number(fromBn(customAmount)) : amount;
  const fund = donationFunds.find((f) => f.id === fundId)!;

  const request: DonationRequest = {
    amount: finalAmount,
    fundId,
    method,
    donor: { ...donor, email: donor.email || undefined },
    note: note || undefined,
  };

  function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    if (!finalAmount || finalAmount < 10) {
      setError("সর্বনিম্ন ১০ টাকা দান করা যাবে।");
      return;
    }
    if (!/^01[3-9]\d{8}$/.test(fromBn(donor.phone).replace(/[\s-]/g, ""))) {
      setError("সঠিক মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)।");
      return;
    }
    setError("");
    setStep("method");
  }

  async function startPayment() {
    setLoading(true);
    try {
      setSession(await paymentProvider.createSession(request));
      setStep("gateway");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep("details");
    setSession(null);
    setResult(null);
  }

  const stepIndex = stepNames.findIndex((s) => s.id === step);

  // ধাপ পরিবর্তনে ফর্মের শুরুতে স্ক্রল
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  return (
    <div ref={topRef} className="scroll-mt-40 rounded-2xl border border-brand-100 bg-white shadow-sm">
      {isSandbox && (
        <div className="rounded-t-2xl bg-amber-100 px-5 py-2 text-center text-sm text-amber-800">
          ⚠ স্যান্ডবক্স মোড — এটি ডেমো, কোনো আসল টাকা কাটা হবে না
        </div>
      )}

      {/* ধাপ নির্দেশক */}
      <ol className="flex border-b border-brand-100 text-xs sm:text-sm">
        {stepNames.map((s, i) => (
          <li
            key={s.id}
            className={`flex flex-1 items-center justify-center gap-1.5 px-2 py-3 ${
              i <= stepIndex ? "font-semibold text-brand-700" : "text-gray-400"
            }`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full text-xs ${
                i <= stepIndex ? "bg-brand-600 text-white" : "bg-gray-200"
              }`}
            >
              {toBn(i + 1)}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </li>
        ))}
      </ol>

      <div className="p-5 sm:p-8">
        {step === "details" && (
          <form onSubmit={submitDetails} className="space-y-6">
            <fieldset>
              <legend className="font-semibold text-gray-900">দানের খাত নির্বাচন করুন</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {donationFunds.map((f) => (
                  <label
                    key={f.id}
                    className={`cursor-pointer rounded-xl border p-3 transition ${
                      fundId === f.id ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fund"
                      value={f.id}
                      checked={fundId === f.id}
                      onChange={() => setFundId(f.id)}
                      className="sr-only"
                    />
                    <span className="block font-medium text-gray-900">{f.name}</span>
                    <span className="block text-xs text-gray-500">{f.description}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-semibold text-gray-900">টাকার পরিমাণ</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {presetAmounts.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount("");
                    }}
                    className={`rounded-full border px-4 py-2 font-medium transition ${
                      !customAmount && amount === a
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-brand-500"
                    }`}
                  >
                    {formatTaka(a)}
                  </button>
                ))}
              </div>
              <label className="mt-3 block">
                <span className="text-sm text-gray-600">অথবা নিজে লিখুন (টাকা)</span>
                <input
                  inputMode="numeric"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value.replace(/[^0-9০-৯]/g, ""))}
                  placeholder="যেমন ৩০০০"
                  className={input}
                />
              </label>
            </fieldset>

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-semibold text-gray-900">দাতার তথ্য</legend>
              <label className="block">
                <span className="text-sm text-gray-600">নাম *</span>
                <input
                  required
                  value={donor.name}
                  onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                  className={input}
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">মোবাইল নম্বর *</span>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={donor.phone}
                  onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className={input}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-gray-600">ইমেইল (ঐচ্ছিক)</span>
                <input
                  type="email"
                  value={donor.email}
                  onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                  className={input}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-gray-600">মন্তব্য / নিয়ত (ঐচ্ছিক)</span>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="যেমন: মরহুম বাবা-মায়ের ঈসালে সওয়াবের নিয়তে"
                  className={input}
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={donor.anonymous}
                  onChange={(e) => setDonor({ ...donor, anonymous: e.target.checked })}
                  className="size-4 accent-brand-600"
                />
                আমার নাম প্রকাশ করবেন না (গোপন দান)
              </label>
            </fieldset>

            {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 py-3 text-lg font-semibold text-white hover:bg-brand-700"
            >
              {finalAmount ? `${formatTaka(finalAmount)} দান করতে এগিয়ে যান` : "এগিয়ে যান"}
            </button>
          </form>
        )}

        {step === "method" && (
          <div className="space-y-6">
            <div className="rounded-xl bg-brand-50 p-4 text-sm">
              <p>
                খাত: <strong>{fund.name}</strong>
              </p>
              <p>
                পরিমাণ: <strong>{formatTaka(finalAmount)}</strong>
              </p>
              <p>
                দাতা: <strong>{donor.anonymous ? "গোপন দাতা" : donor.name}</strong>
              </p>
            </div>
            <fieldset>
              <legend className="font-semibold text-gray-900">পেমেন্ট মাধ্যম নির্বাচন করুন</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {methods.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
                      method === m.id ? "ring-2" : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={method === m.id ? { borderColor: m.color, ["--tw-ring-color" as string]: m.color } : undefined}
                  >
                    <span
                      className="flex size-11 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{ background: m.color }}
                    >
                      {m.letter}
                    </span>
                    <span className="text-sm font-medium">{methodLabels[m.id]}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700"
              >
                ← পেছনে
              </button>
              <button
                type="button"
                onClick={startPayment}
                disabled={loading}
                className="flex-1 rounded-full bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {loading ? "প্রস্তুত হচ্ছে..." : `${methodLabels[method]} দিয়ে পরিশোধ করুন`}
              </button>
            </div>
          </div>
        )}

        {step === "gateway" && session && (
          <GatewayPanel
            session={session}
            color={methods.find((m) => m.id === method)!.color}
            onCancel={() => setStep("method")}
            onDone={(r) => {
              setResult(r);
              setStep("result");
            }}
          />
        )}

        {step === "result" && result && session && (
          <Receipt result={result} session={session} request={request} fundName={fund.name} onRetry={() => setStep("gateway")} onNew={reset} />
        )}
      </div>
    </div>
  );
}
