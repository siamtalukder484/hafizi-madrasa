export type PaymentMethod = "bkash" | "nagad" | "rocket" | "card";

export type DonationRequest = {
  amount: number;
  fundId: string;
  method: PaymentMethod;
  donor: {
    name: string;
    phone: string;
    email?: string;
    anonymous: boolean;
  };
  note?: string;
};

export type PaymentSession = {
  sessionId: string;
  /** আসল গেটওয়েতে এখানে গেটওয়ের পেমেন্ট পেজের URL থাকবে */
  redirectUrl?: string;
  amount: number;
  method: PaymentMethod;
};

export type PaymentResult =
  | { status: "success"; transactionId: string; paidAt: string }
  | { status: "failed"; reason: string };

/**
 * যেকোনো পেমেন্ট গেটওয়ে (bKash, Nagad, SSLCommerz, aamarPay ইত্যাদি)
 * এই ইন্টারফেস মেনে যুক্ত করা যাবে।
 */
export interface PaymentProvider {
  readonly id: string;
  /** পেমেন্ট শুরু — আসল সিস্টেমে Next.js route handler (/api/payment/init) কল করবে */
  createSession(req: DonationRequest): Promise<PaymentSession>;
  /** পেমেন্ট নিশ্চিত — আসল সিস্টেমে গেটওয়ে callback/IPN যাচাই করবে */
  confirm(
    session: PaymentSession,
    input: { account?: string; otp?: string; pin?: string },
  ): Promise<PaymentResult>;
}

export const methodLabels: Record<PaymentMethod, string> = {
  bkash: "বিকাশ",
  nagad: "নগদ",
  rocket: "রকেট",
  card: "ভিসা / মাস্টারকার্ড",
};
