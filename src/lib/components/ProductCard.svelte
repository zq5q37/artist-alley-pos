<!-- src/lib/components/ProductCard.svelte -->
<script lang="ts">
    import type { Product } from '$lib/types';
    import { cart } from '$lib/stores/cart';
  
    export let product: Product;
  
    const inc = () => cart.add(product, 1);
    const dec = () => cart.add(product, -1);
  </script>
  
  <div class="card">
    <img class="thumb" loading="lazy" src={product.img ?? '/images/placeholder.png'} alt={product.name} />
    <div class="meta">
      <div class="name">{product.name}</div>
      <div class="tags">
        <span class="tag type">{product.type}</span>
        <span class="tag game">{product.game}</span>
      </div>
      <div class="price">${product.price}</div>
    </div>
    <div class="qty">
      <button class="btn minus" on:click|stopPropagation|preventDefault={dec} aria-label="decrease">−</button>
      <button class="btn plus"  on:click|stopPropagation|preventDefault={inc} aria-label="increase">＋</button>
    </div>
</div>
  
  <style>
    .card {
      display:grid; grid-template-columns: 84px 1fr auto; gap:12px;
      align-items:center; padding:12px; border-radius:16px;
      background: var(--surface);
      box-shadow: var(--shadow-elev1);
      transition: transform .06s ease; user-select:none;
    }
    .card:active { transform: scale(.98); }
    .thumb { width:84px; height:84px; object-fit:cover; border-radius:12px; }
    .meta { display:grid; gap:4px; }
    .name { font-weight:600; font-size:16px; line-height:1.1; color:var(--ink-strong); }
    .tags { font-size:12px; color:var(--ink-soft); display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
    .tag.type { background: var(--accent-weak); color: var(--accent-ink); padding:2px 8px; border-radius:999px; }
    .tag.game { background: var(--chip); color: var(--ink-soft); padding:2px 8px; border-radius:999px; }
    .dot { opacity:.5; }
    .price { font-weight:700; color:var(--ink-strong); }
    .qty { display:flex; gap:8px; }
    .btn { font-size:24px; width:44px; height:44px; border-radius:12px; border:none; background:var(--btn-bg);
           box-shadow: var(--shadow-elev1); touch-action:manipulation; }
    .btn:active { transform: scale(.96); }
    .plus { background: var(--accent); color:white; }
  </style>
  