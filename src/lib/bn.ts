const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করে */
export function toBn(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
}

/** টাকার অংক বাংলায়, কমা সহ (যেমন ১০,০০০) */
export function formatTaka(amount: number): string {
  return "৳ " + toBn(amount.toLocaleString("en-IN"));
}

/** বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর (ইনপুট পার্স করার জন্য) */
export function fromBn(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d)));
}
