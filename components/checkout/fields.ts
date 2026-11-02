/** Egypt's governorates; the store ships to all of them. Alexandria first. */
export const CITIES = [
  "Alexandria", "Cairo", "Giza", "Beheira", "Kafr El Sheikh", "Gharbia", "Dakahlia", "Damietta", "Sharqia",
  "Qalyubia", "Monufia", "Port Said", "Ismailia", "Suez", "Faiyum", "Beni Suef", "Minya", "Asyut", "Sohag",
  "Qena", "Luxor", "Aswan", "Red Sea", "Matrouh", "New Valley", "North Sinai", "South Sinai",
] as const;

export const PAYMENTS = [
  { id: "cod", label: "Cash on delivery", note: "Pay in cash when your order arrives." },
  { id: "card", label: "Visa card", note: "We'll confirm how to pay by card on WhatsApp." },
] as const;

export type PaymentId = (typeof PAYMENTS)[number]["id"];

export interface Details {
  name: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  apartment: string;
  notes: string;
  payment: PaymentId;
}

export type FieldKey = "name" | "phone" | "area" | "street";
export type Errors = Partial<Record<FieldKey, string>>;

export const emptyDetails: Details = {
  name: "",
  phone: "",
  city: CITIES[0],
  area: "",
  street: "",
  apartment: "",
  notes: "",
  payment: "cod",
};

export function validateField(key: FieldKey, d: Details): string | undefined {
  const v = d[key].trim();
  switch (key) {
    case "name":
      if (!v) return "Enter your full name so the courier knows who to ask for.";
      if (v.length < 2) return "Name looks too short.";
      return;
    case "phone": {
      if (!v) return "Enter a mobile number — we call or WhatsApp to confirm your order.";
      if (/[^\d\s+()-]/.test(v)) return "Use digits only (spaces, + and - are fine).";
      const digits = v.replace(/\D/g, "").length;
      if (digits < 8 || digits > 15) return "Mobile number should have 8–15 digits.";
      return;
    }
    case "area":
      if (!v) return "Enter your area or district.";
      return;
    case "street":
      if (!v) return "Enter your street and building number.";
      return;
  }
}

export const REQUIRED: FieldKey[] = ["name", "phone", "area", "street"];

export function validateAll(d: Details): Errors {
  const e: Errors = {};
  for (const k of REQUIRED) {
    const msg = validateField(k, d);
    if (msg) e[k] = msg;
  }
  return e;
}

export const paymentLabel = (id: PaymentId) => PAYMENTS.find((p) => p.id === id)?.label ?? "";
