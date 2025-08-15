<!-- src/lib/components/ShoppingCart.svelte -->
<script lang="ts">
    import { cart, cartArray, totalsAndBreakdown } from '$lib/stores/cart';
  
    const setQty = (id: string, qty: number) => {
      const line = $cartArray.find(l => l.product.id === id);
      if (line) cart.setQty(line.product, qty);
    };
    const remove = (id: string) => cart.remove(id);
    const clear = () => cart.clear();

    const getLineData = (productId: string) => 
    $totalsAndBreakdown.perLine.get(productId);
    
  </script>
  
  <div class="cart">
    <div class="cart-header">
      <h2>Cart</h2>
      <button class="btn subtle" on:click={clear} aria-label="Clear cart">Clear</button>
    </div>
  
    {#if $cartArray.length === 0}
      <div class="empty">No items yet. Tap a product to add.</div>
    {:else}
      <ul class="lines">
        {#each $cartArray as { product, qty }}
          {#key product.id}
            <li class="line">
              <img class="thumb" src={product.img ?? '/images/placeholder.png'} alt={product.name} />
              <div class="info">
                <div class="top">
                  <div class="name">{product.name}</div>
                  <div class="tags">{product.type} • {product.game}</div>
                </div>
                <div class="qty-controls">
                  <button on:click={() => setQty(product.id, qty - 1)} aria-label="−">−</button>
                  <input type="number" min="0" inputmode="numeric" bind:value={qty}
                         on:change={(e)=> setQty(product.id, parseInt((e.target as HTMLInputElement).value || '0'))}/>
                  <button on:click={() => setQty(product.id, qty + 1)} aria-label="+">+</button>
                  <button class="remove" on:click={() => remove(product.id)} aria-label="Remove">X</button>
                </div>
                {#if $totalsAndBreakdown.perLine.has(product.id)}
    {@const bd = $totalsAndBreakdown.perLine.get(product.id)}
    {#if bd} <!-- narrow to non-undefined -->
      <div class="money">
        <div>${product.price} × {qty} = ${bd.subtotal.toFixed(2)}</div>
        {#if bd.discount > 0}
          <div class="discount">−${bd.discount.toFixed(2)}</div>
          {#each bd.notes as n}<div class="note">{n}</div>{/each}
        {/if}
        <div class="charged">Line total: ${bd.charged.toFixed(2)}</div>
      </div>
    {/if}
  {/if}
              
              </div>
            </li>
          {/key}
        {/each}
      </ul>
  
      <div class="summary">
        <div>Items: {$totalsAndBreakdown.totals.items}</div>
        <div>Subtotal: ${$totalsAndBreakdown.totals.subtotal.toFixed(2)}</div>
        <div class="disc">Discount: −${$totalsAndBreakdown.totals.discount.toFixed(2)}</div>
        <div class="total">Total: ${$totalsAndBreakdown.totals.total.toFixed(2)}</div>
      </div>
  
      <button class="btn checkout">Charge ${$totalsAndBreakdown.totals.total.toFixed(2)}</button>
    {/if}
  </div>
  
  <style>
    .cart { display:flex; flex-direction:column; gap:12px; padding:12px; background:var(--surface);
            border-radius:16px; box-shadow: var(--shadow-elev2); min-height: 260px; }
    .cart-header { display:flex; justify-content:space-between; align-items:center; }
    .empty { padding:24px; color:var(--ink-soft); text-align:center; }
    .lines { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
    .line { display:grid; grid-template-columns:72px 1fr; gap:12px; background:var(--surface-2);
            border-radius:12px; padding:10px; }
    .thumb { width:72px; height:72px; object-fit:cover; border-radius:10px; }
    .info { display:grid; gap:6px; }
    .top { display:flex; gap:8px; align-items:baseline; justify-content:space-between; }
    .name { font-weight:600; color:var(--ink-strong); }
    .tags { font-size:12px; color:var(--ink-soft); }
    .qty-controls { display:flex; align-items:center; gap:8px; }
    .qty-controls button { width:40px; height:40px; border-radius:10px; border:none; background:var(--btn-bg); box-shadow:var(--shadow-elev1); }
    .qty-controls input { width:70px; height:40px; border-radius:10px; border:1px solid var(--line); padding:0 10px; font-size:16px; }
    .remove { margin-left:auto; background:transparent; box-shadow:none; }
    .money { font-size:14px; display:grid; gap:2px; }
    .discount { color:var(--accent); font-weight:600; }
    .note { color:var(--ink-soft); font-size:12px; }
    .charged { font-weight:700; }
    .summary { margin-top:6px; padding-top:8px; border-top:1px dashed var(--line); display:grid; gap:2px; }
    .disc { color:var(--accent); }
    .total { font-size:20px; font-weight:800; }
    .btn.checkout { margin-top:4px; height:56px; border-radius:14px; background:var(--accent);
                    color:white; font-size:18px; border:none; box-shadow: var(--shadow-elev2); }
  </style>
  