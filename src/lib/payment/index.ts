import { sandboxProvider } from "./sandbox";
import type { PaymentProvider } from "./types";

export * from "./types";

/**
 * সক্রিয় পেমেন্ট প্রোভাইডার।
 *
 * আসল গেটওয়ে যুক্ত করার সময়:
 *  1. src/app/api/payment/init/route.ts ও callback route তৈরি করুন
 *     (সার্ভারে গেটওয়ের secret key রাখুন, ক্লায়েন্টে কখনো নয়)।
 *  2. এখানে একটি নতুন provider বানান যা ওই route গুলোতে fetch করে
 *     এবং redirectUrl এ ইউজারকে পাঠায়।
 *  3. নিচের লাইনটি পরিবর্তন করুন।
 */
export const paymentProvider: PaymentProvider = sandboxProvider;

export const isSandbox = paymentProvider.id === "sandbox";
