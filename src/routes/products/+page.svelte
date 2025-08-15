<!-- src/routes/products/+page.svelte -->
<script lang="ts">
    import { catalog } from '$lib/stores/catalog';
    import type { Product, SizeType } from '$lib/types';
    let item: Partial<Product> = { type:'A4', game:'Misc', price:12, active:true };
    const add = () => {
      if (!item.id || !item.name || !item.type || !item.price) return;
      catalog.update(list => [{ ...(item as Product) }, ...list]);
      item = { type:'A4', game:'Misc', price:12, active:true };
    };
  </script>
  
  <h2>Product Management</h2>
  <form class="card" on:submit|preventDefault={add}>
    <input placeholder="id" bind:value={item.id} />
    <input placeholder="name" bind:value={item.name} />
    <select bind:value={item.type}>
      <option>A3</option><option>A4</option><option>A5</option><option>Mini</option>
      <option>Sticker</option><option>Keychain</option><option>Stand</option>
    </select>
    <select bind:value={item.game}>
      <option>Blue Archive</option><option>Zenless Zone Zero</option>
      <option>Genshin Impact</option><option>Honkai: Star Rail</option><option>Misc</option>
    </select>
    <input type="number" step="0.01" placeholder="price" bind:value={item.price} />
    <input placeholder="img (optional)" bind:value={item.img} />
    <label><input type="checkbox" bind:checked={item.active} /> active</label>
    <button class="btn">Add</button>
  </form>
  
  <style>
    .card { display:grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
            gap:10px; padding:12px; background:var(--surface); border-radius:16px; box-shadow:var(--shadow-elev1); }
    input, select { height:44px; border-radius:12px; border:1px solid var(--line); padding:0 12px; }
    .btn { height:44px; border-radius:12px; border:none; background:var(--accent); color:white; }
  </style>
  