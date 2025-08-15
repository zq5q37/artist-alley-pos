// src/lib/stores/catalog.ts
import { writable, derived } from 'svelte/store';
import type { Product, SizeType } from '$lib/types';

const seed: Product[] = [
//   { id:'kaede-a3', name:'Kaede', type:'A3', price:20, game:'Blue Archive', img:'/images/kaede.jpg', active:true },
//   { id:'kaede-a4', name:'Kaede', type:'A4', price:12, game:'Blue Archive', img:'/images/kaede.jpg', active:true },
  { id:'zzz-key-anz', name:'Anby', type:'Keychain', price:8, game:'Zenless Zone Zero', img:'/images/anby.png', active:true },
//   { id:'genshin-sticker-1', name:'Paimon Pack', type:'Sticker', price:2, game:'Genshin Impact', img:'/images/paimon.png', active:true },
//   { id:'hsr-key-1', name:'March 7th', type:'Keychain', price:8, game:'Honkai: Star Rail', img:'/images/march.png', active:true },
//   { id:'misc-stand-1', name:'Acrylic Stand — Cat', type:'Stand', price:20, game:'Misc', img:'/images/stand-cat.png', active:true },
//   { id:'mini-random', name:'Mini Print — Random', type:'Mini', price:4, game:'Misc', img:'/images/mini.png', active:true },
];

export const catalog = writable<Product[]>(seed);

// filters
export const typeFilter = writable<SizeType | 'All'>('All');
export const gameFilter = writable<'All' | Product['game']>('All');

export const filteredCatalog = derived(
  [catalog, typeFilter, gameFilter],
  ([$catalog, $type, $game]) =>
    $catalog.filter(p =>
      (p.active ?? true) &&
      ($type === 'All' || p.type === $type) &&
      ($game === 'All' || p.game === $game)
    )
);
