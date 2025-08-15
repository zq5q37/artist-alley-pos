// src/lib/discounts.ts
import type { CartLine, LineBreakdown, SizeType, Totals } from './types';

const B2G1_TYPES: SizeType[] = ['A3','A4','A5','Mini','Sticker'];
const PRICES = {
  A3: 20, A4: 12, A5: 8, Mini: 4, Sticker: 2,
  Keychain: 8, Stand: 20
} as const;

export function priceFor(type: SizeType) {
  return (PRICES as any)[type];
}

function b2g1Breakdown(qty: number, unit: number) {
  const free = Math.floor(qty / 3);
  const discount = free * unit;
  const charged = qty * unit - discount;
  const notes = free > 0 ? [`Buy-2-Get-1: −$${discount.toFixed(2)}`] : [];
  return { discount, charged, notes };
}

function pairPricing(qty: number, single: number, pair: number, label: string) {
  const pairs = Math.floor(qty / 2);
  const singles = qty % 2;
  const normal = qty * single;
  const charged = pairs * pair + singles * single;
  const discount = normal - charged;
  const notes = discount > 0 ? [`${label} pair pricing: −$${discount.toFixed(2)}`] : [];
  return { discount, charged, notes };
}

export function breakdownLine(line: CartLine): LineBreakdown {
  const { product, qty } = line;
  const unit = product.price;

  let discount = 0, charged = qty * unit;
  let notes: string[] = [];

  if (B2G1_TYPES.includes(product.type)) {
    const res = b2g1Breakdown(qty, unit);
    discount += res.discount; charged = res.charged; notes.push(...res.notes);
  } else if (product.type === 'Keychain') {
    const res = pairPricing(qty, 8, 15, 'Keychain');
    discount += res.discount; charged = res.charged; notes.push(...res.notes);
  } else if (product.type === 'Stand') {
    const res = pairPricing(qty, 20, 36, 'Stand');
    discount += res.discount; charged = res.charged; notes.push(...res.notes);
  }

  const subtotal = qty * unit;
  return { subtotal, discount, charged, notes };
}

export function computeTotals(lines: CartLine[]): { perLine: Map<string, LineBreakdown>, totals: Totals } {
  const perLine = new Map<string, LineBreakdown>();
  let items = 0, subtotal = 0, discount = 0, total = 0;

  for (const line of lines) {
    const bd = breakdownLine(line);
    perLine.set(line.product.id, bd);
    items += line.qty;
    subtotal += bd.subtotal;
    discount += bd.discount;
    total += bd.charged;
  }

  return { perLine, totals: { items, subtotal, discount, total } };
}
