"use client";

import { forwardRef } from "react";
import { CITIES, PAYMENTS, type Details, type Errors, type FieldKey } from "./fields";

interface Props {
  values: Details;
  errors: Errors;
  onChange: <K extends keyof Details>(key: K, value: Details[K]) => void;
  onBlurField: (key: FieldKey) => void;
  onSubmit: () => void;
  footer: React.ReactNode;
}

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-sale">
          {error}
        </p>
      )}
    </div>
  );
}

const errProps = (id: string, error?: string, hint?: boolean) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  className: `field ${error ? "border-sale" : ""}`,
});

/** Details step: ≤8 fields, labels above, inline validation on blur. */
export const CheckoutForm = forwardRef<HTMLFormElement, Props>(function CheckoutForm(
  { values, errors, onChange, onBlurField, onSubmit, footer },
  ref,
) {
  return (
    <form
      ref={ref}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-8"
    >
      <fieldset className="space-y-4">
        <legend className="mb-4 text-lg font-semibold">Delivery details</legend>
        <Field id="co-name" label="Full name" error={errors.name}>
          <input
            id="co-name"
            name="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            required
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            onBlur={() => onBlurField("name")}
            {...errProps("co-name", errors.name)}
          />
        </Field>
        <Field id="co-phone" label="Mobile number" error={errors.phone} hint="We'll call or WhatsApp this number to confirm.">
          <input
            id="co-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            required
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            onBlur={() => onBlurField("phone")}
            {...errProps("co-phone", errors.phone, true)}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="co-city" label="Governorate">
            <select
              id="co-city"
              name="city"
              autoComplete="address-level2"
              value={values.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="field"
            >
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field id="co-area" label="Area / district" error={errors.area}>
            <input
              id="co-area"
              name="area"
              type="text"
              autoComplete="address-level3"
              enterKeyHint="next"
              required
              value={values.area}
              onChange={(e) => onChange("area", e.target.value)}
              onBlur={() => onBlurField("area")}
              {...errProps("co-area", errors.area)}
            />
          </Field>
        </div>
        <Field id="co-street" label="Street & building" error={errors.street}>
          <input
            id="co-street"
            name="street"
            type="text"
            autoComplete="address-line1"
            enterKeyHint="next"
            required
            value={values.street}
            onChange={(e) => onChange("street", e.target.value)}
            onBlur={() => onBlurField("street")}
            {...errProps("co-street", errors.street)}
          />
        </Field>
        <Field id="co-apt" label="Apartment / floor" optional>
          <input
            id="co-apt"
            name="apartment"
            type="text"
            autoComplete="address-line2"
            enterKeyHint="next"
            value={values.apartment}
            onChange={(e) => onChange("apartment", e.target.value)}
            className="field"
          />
        </Field>
        <Field id="co-notes" label="Delivery notes" optional hint="Landmark, best time to call, gate code…">
          <textarea
            id="co-notes"
            name="notes"
            rows={3}
            enterKeyHint="done"
            value={values.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            aria-describedby="co-notes-hint"
            className="field resize-y"
          />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-lg font-semibold">Payment</legend>
        <div className="grid gap-3">
          {PAYMENTS.map((p) => (

              <label
                key={p.id}
                className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-4 has-[input:checked]:border-accent has-[input:checked]:ring-2 has-[input:checked]:ring-accent has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-accent"
              >
                <input
                  type="radio"
                  name="payment"
                  value={p.id}
                  checked={values.payment === p.id}
                  onChange={() => onChange("payment", p.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
                />
                <span>
                  <span className="block font-medium">{p.label}</span>
                  <span className="block text-sm text-muted">{p.note}</span>
                </span>
              </label>
          ))}
        </div>
      </fieldset>

      {footer}
    </form>
  );
});
