// src/lib/types.ts
export type SizeType = 'A3' | 'A4' | 'A5' | 'Mini' | 'Sticker' | 'Keychain' | 'Stand';
export type GameTag =
  | 'Blue Archive' | 'Zenless Zone Zero' | 'Genshin Impact' | 'Honkai: Star Rail' | 'Misc';

export interface Product {
  id: string;
  name: string;
  type: SizeType;      // e.g. 'A4', 'Keychain'
  game: GameTag;       // series tag
  price: number;       // unit price (single)
  img?: string;        // optional local path
  active?: boolean;    // hide/show in catalog
}

export interface CartLine {
  product: Product;
  qty: number;
}

export interface LineBreakdown {
  subtotal: number;     // unit * qty
  discount: number;     // total discount for this line
  charged: number;      // subtotal - discount
  notes: string[];      // e.g. ["B2G1: -$8", "Pair: -$1"]
}

export interface Totals {
  items: number;
  subtotal: number;
  discount: number;
  total: number;
}
