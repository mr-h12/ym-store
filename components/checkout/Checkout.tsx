"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import { CheckoutForm } from "./CheckoutForm";
import { ConfirmStep } from "./ConfirmStep";
import { deliveryRange } from "./delivery";
import { emptyDetails, paymentLabel, REQUIRED, validateAll, validateField, type Details, type Errors, type FieldKey } from "./fields";
import { OrderSummary, OrderSummaryToggle } from "./OrderSummary";
import { Stepper, type Step } from "./Stepper";
import { Success, type PlacedOrder } from "./Success";

const FIELD_ID: Record<FieldKey, string> = { name: "co-name", phone: "co-phone", area: "co-area", street: "co-street" };

/** Sticky on mobile (stays above the fold while the form is in view), inline on desktop. */
function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-line bg-bg/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      {children}
    </div>
  );
}

export function Checkout() {
  const cart = useCart();
  const { lines, subtotal, shipping, total, clear } = cart;
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Errors>({});
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [delivery, setDelivery] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Cart hydrates from localStorage after mount; date depends on the client clock.
  useEffect(() => {
    setMounted(true);
    setDelivery(deliveryRange());
  }, []);

  // Move focus + scroll on step changes.
  useEffect(() => {
    if (!mounted) return;
    if (focusTarget) {
      const el =
        focusTarget === "payment"
          ? document.querySelector<HTMLInputElement>('input[name="payment"]:checked')
          : document.getElementById(focusTarget);
      el?.focus();
      el?.scrollIntoView({ block: "center" });
      setFocusTarget(null);
      return;
    }
    window.scrollTo({ top: 0 });
    (step === "done" ? successRef.current : headingRef.current)?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const onChange = <K extends keyof Details>(key: K, value: Details[K]) => {
    const next = { ...details, [key]: value };
    setDetails(next);
    // Once a field shows an error, re-check it as the shopper fixes it.
    if (key in errors) {
      const k = key as FieldKey;
      setErrors((e) => ({ ...e, [k]: validateField(k, next) }));
    }
  };

  const onBlurField = (key: FieldKey) => {
    // Don't nag on an untouched empty field when tabbing through.
    if (!details[key].trim() && !(key in errors)) return;
    setErrors((e) => ({ ...e, [key]: validateField(key, details) }));
  };

  const review = () => {
    const e = validateAll(details);
    setErrors(e);
    const first = REQUIRED.find((k) => e[k]);
    if (first) {
      document.getElementById(FIELD_ID[first])?.focus();
      return;
    }
    setStep("confirm");
  };

  const edit = (fieldId: string) => {
    setFocusTarget(fieldId);
    setStep("details");
  };

  const place = () => {
    const number = `YM-${Math.floor(10000 + Math.random() * 90000)}`;
    const clean = Object.fromEntries(
      Object.entries(details).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v]),
    ) as typeof details;
    // No backend yet: the order is delivered to the store as a WhatsApp message
    // carrying the order number, so the store can match it when confirming.
    const whatsapp = whatsappOrderUrl(
      lines,
      { subtotal, shipping, total },
      { ...clean, payment: paymentLabel(clean.payment) },
      number,
    );
    window.open(whatsapp, "_blank", "noopener,noreferrer");
    setOrder({ number, details: clean, lines, subtotal, shipping, total, delivery, whatsapp });
    setStep("done");
    clear();
  };

  if (!mounted) {
    return <div className="mx-auto min-h-[60vh] max-w-6xl px-4 py-6 md:px-6" aria-busy="true" />;
  }

  if (step === "done" && order) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <Stepper step="done" onDetails={() => {}} />
        </div>
        <Success ref={successRef} order={order} />
      </div>
    );
  }

  const empty = lines.length === 0;
  const summaryProps = { lines, subtotal, shipping, total };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 md:px-6 md:pt-10">
      <Stepper step={step} onDetails={() => setStep("details")} />

      {empty ? (
        <div className="mx-auto mt-12 max-w-sm text-center">
          <h1 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">
            Your bag is empty
          </h1>
          <p className="mt-2 text-muted">Add something you like, then come back here to check out.</p>
          <Link href="/shop" className="btn btn-primary mt-6 w-full">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          <div className="min-w-0">
            <div className="mb-6 lg:hidden">
              <OrderSummaryToggle {...summaryProps} />
            </div>

            <h1 ref={headingRef} tabIndex={-1} className="mb-1 text-2xl font-bold tracking-tight outline-none">
              {step === "details" ? "Checkout" : "Review your order"}
            </h1>
            <p className="mb-6 text-sm text-muted">
              {step === "details"
                ? "No account needed. Pay when your order arrives."
                : "Check everything below, then place your order."}
            </p>

            {step === "details" ? (
              <CheckoutForm
                values={details}
                errors={errors}
                onChange={onChange}
                onBlurField={onBlurField}
                onSubmit={review}
                footer={
                  <ActionBar>
                    <button type="submit" className="btn btn-primary w-full">
                      Review order
                    </button>
                  </ActionBar>
                }
              />
            ) : (
              <ConfirmStep
                details={details}
                lines={lines}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                delivery={delivery}
                onEdit={edit}
                footer={
                  <ActionBar>
                    <button type="button" onClick={place} className="btn btn-primary w-full">
                      Place order{total > 0 && <> · <span className="price">{formatPrice(total)}</span></>}
                    </button>
                    <p className="mt-2 text-center text-xs text-muted">
                      Opens WhatsApp with your order — tap send so we receive it.
                    </p>
                  </ActionBar>
                }
              />
            )}
          </div>

          <aside className="hidden lg:block">
            <OrderSummary {...summaryProps} />
          </aside>
        </div>
      )}
    </div>
  );
}
