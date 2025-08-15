<!-- src/lib/components/ItemCatalog.svelte -->
<script lang="ts">
    import { filteredCatalog, typeFilter, gameFilter } from '$lib/stores/catalog';
    import ProductCard from './ProductCard.svelte';
    import type { SizeType } from '$lib/types';
  
    const types: (SizeType | 'All')[] = ['All','A3','A4','A5','Mini','Sticker','Keychain','Stand'];
    const games = ['All','Blue Archive','Zenless Zone Zero','Genshin Impact','Honkai: Star Rail','Misc'] as const;
  </script>
  
  <div class="toolbar">
    <select bind:value={$typeFilter} aria-label="Filter by type">
      {#each types as t}<option value={t}>{t}</option>{/each}
    </select>
    <select bind:value={$gameFilter} aria-label="Filter by game">
      {#each games as g}<option value={g}>{g}</option>{/each}
    </select>
  </div>
  
  <div class="grid">
    {#each $filteredCatalog as p}
      <!-- <ProductCard {product}={p} /> -->
      <ProductCard product={p} />

    {/each}
  </div>
  
  <style>
    .toolbar { display:flex; gap:12px; padding:8px 4px; position:sticky; top:0; background:var(--app-bg); z-index:5; }
    select { font-size:16px; padding:10px 12px; border-radius:12px; border:1px solid var(--line); background:var(--surface); }
    .grid {
      display:grid;
      grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
      gap:14px;
      width:100%;
    }
    /* HARD STOP: no horizontal scrolling ever */
    :global(html), :global(body), :global(#svelte) { overflow-x:hidden; }
  </style>
  