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
      if (saved) setRaw(JSON.parse(saved));
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
      if (hit) return prev.map((l) => (l === hit ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { productId, size, colour, qty }];
    });
    setLastAdded({ productId, size, colour, qty });
    setOpen(true);
  }, []);

  const setQty = useCallback((productId: string, size: Size, colour: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => !same(l, productId, size, colour))
        : prev.map((l) => (same(l, productId, size, colour) ? { ...l, qty } : l)),
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
