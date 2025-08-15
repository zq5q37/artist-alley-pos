// src/lib/stores/cart.ts
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { CartLine, Product } from '$lib/types';
import { computeTotals } from '$lib/discounts';

type CartIndex = Record<string, CartLine>; // productId -> line

function createCart() {
  const key = 'pos-cart-v1';
  const start: CartIndex = browser ? JSON.parse(localStorage.getItem(key) || '{}') : {};

  const { subscribe, update, set } = writable<CartIndex>(start);

  function persist(idx: CartIndex) {
    if (browser) localStorage.setItem(key, JSON.stringify(idx));
  }

  return {
    subscribe,
    add(product: Product, qty = 1) {
      update((idx) => {
        const existing = idx[product.id];
        const nextQty = (existing?.qty ?? 0) + qty;
        const next = { ...idx, [product.id]: { product, qty: nextQty } };
        persist(next); return next;
      });
    },
    setQty(product: Product, qty: number) {
      update((idx) => {
        const next = { ...idx };
        if (qty <= 0) delete next[product.id];
        else next[product.id] = { product, qty };
        persist(next); return next;
      });
    },
    remove(productId: string) {
      update((idx) => {
        const next = { ...idx }; delete next[productId];
        persist(next); return next;
      });
    },
    clear() { set({}); if (browser) localStorage.removeItem(key); }
  };
}

export const cart = createCart();

export const cartArray = derived(cart, ($cart) => Object.values($cart));
export const totalsAndBreakdown = derived(cartArray, ($lines) => computeTotals($lines));
