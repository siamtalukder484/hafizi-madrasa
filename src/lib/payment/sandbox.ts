import type {
  DonationRequest,
  PaymentProvider,
  PaymentResult,
  PaymentSession,
} from "./types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * ডামি / স্যান্ডবক্স পেমেন্ট প্রোভাইডার।
 * কোনো আসল টাকা লেনদেন হয় না — শুধু UI ফ্লো পরীক্ষার জন্য।
 *
 * টেস্ট নিয়ম:
 *  - OTP: 123456, PIN: 12345 → সফল
 *  - কার্ড নম্বর 4242 4242 4242 4242 → সফল
 *  - অন্য যেকোনো OTP/PIN/কার্ড → ব্যর্থ
 */
export const sandboxProvider: PaymentProvider = {
  id: "sandbox",

  async createSession(req: DonationRequest): Promise<PaymentSession> {
    await wait(700);
    return {
      sessionId: "SBX-" + Date.now().toString(36).toUpperCase(),
      amount: req.amount,
      method: req.method,
    };
  },

  async confirm(session, input): Promise<PaymentResult> {
    await wait(1200);
    const ok =
      session.method === "card"
        ? input.account?.replace(/\s/g, "") === "4242424242424242"
        : input.otp === "123456" && input.pin === "12345";

    if (!ok) {
      return {
        status: "failed",
        reason:
          session.method === "card"
            ? "কার্ডটি গ্রহণ করা যায়নি। স্যান্ডবক্সে 4242 4242 4242 4242 ব্যবহার করুন।"
            : "ভুল OTP অথবা PIN। স্যান্ডবক্সে OTP 123456 ও PIN 12345 ব্যবহার করুন।",
      };
    }

    return {
      status: "success",
      transactionId:
        session.method.toUpperCase().slice(0, 3) +
        Math.random().toString(36).slice(2, 10).toUpperCase(),
      paidAt: new Date().toISOString(),
    };
  },
};
