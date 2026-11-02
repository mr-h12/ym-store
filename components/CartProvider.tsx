"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Product, Size } from "@/lib/types";
import { getProductById } from "@/data/products";
import { storeConfig } from "@/lib/store-config";

export interface ResolvedLine extends CartLine {
  product: Product;
  lineTotal: number;
}

interface CartState {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  /** How much more to spend for free delivery (0 when reached). */
  toFreeShipping: number;
  add: (productId: string, size: Size, colour: string, qty?: number) => void;
  setQty: (productId: string, size: Size, colour: string, qty: number) => void;
  remove: (productId: string, size: Size, colour: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Last line added — the drawer uses it for an "Added" confirmation. */
  lastAdded: CartLine | null;
}

const CartContext = createContext<CartState | null>(null);

/** Units available for a product/size (0 if unknown or sold out). */
const stockFor = (productId: string, size: Size) => getProductById(productId)?.stock[size] ?? 0;

/** Drop anything malformed, unknown or sold out from a saved cart; clamp qty to stock. */
function sanitize(data: unknown): CartLine[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap((l) => {
    if (!l || typeof l !== "object") return [];
    const { productId, size, colour, qty } = l as Record<string, unknown>;
    if (typeof productId !== "string" || typeof size !== "string" || typeof colour !== "string") return [];
    if (typeof qty !== "number" || !Number.isFinite(qty)) return [];
    const max = stockFor(productId, size as Size);
    const n = Math.min(Math.floor(qty), max);
    return n > 0 ? [{ productId, size: size as Size, colour, qty: n }] : [];
  });
}
const KEY = "ym-cart-v1";
const same = (a: CartLine, id: string, size: Size, colour: string) =>
  a.productId === id && a.size === size && a.colour === colour;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartLine | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setRaw(sanitize(JSON.parse(saved)));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {}
  }, [raw, hydrated]);

  const add = useCallback((productId: string, size: Size, colour: string, qty = 1) => {
    setRaw((prev) => {
      const hit = prev.find((l) => same(l, productId, size, colour));
      const max = stockFor(productId, size);
      if (hit) return prev.map((l) => (l === hit ? { ...l, qty: Math.min(l.qty + qty, max) } : l));
      return max > 0 ? [...prev, { productId, size, colour, qty: Math.min(qty, max) }] : prev;
    });
    setLastAdded({ productId, size, colour, qty });
    setOpen(true);
  }, []);

  const setQty = useCallback((productId: string, size: Size, colour: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => !same(l, productId, size, colour))
        : prev.map((l) => (same(l, productId, size, colour) ? { ...l, qty: Math.min(qty, stockFor(productId, size)) } : l)),
    );
  }, []);

  const remove = useCallback((productId: string, size: Size, colour: string) => {
    setRaw((prev) => prev.filter((l) => !same(l, productId, size, colour)));
  }, []);

  const value = useMemo<CartState>(() => {
    const lines = raw.flatMap((l) => {
      const product = getProductById(l.productId);
      return product ? [{ ...l, product, lineTotal: product.price * l.qty }] : [];
    });
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const free = subtotal >= storeConfig.freeShippingThreshold;
    const shipping = subtotal === 0 || free ? 0 : storeConfig.shippingFee;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      toFreeShipping: free ? 0 : storeConfig.freeShippingThreshold - subtotal,
      add,
      setQty,
      remove,
      clear: () => setRaw([]),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      lastAdded,
    };
  }, [raw, isOpen, lastAdded, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
