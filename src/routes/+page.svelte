<!-- src/routes/+page.svelte -->
<script lang="ts">
    import ItemCatalog from '$lib/components/ItemCatalog.svelte';
    import ShoppingCart from '$lib/components/ShoppingCart.svelte';
    import BundleDiscounts from '$lib/components/BundleDiscounts.svelte';
  </script>
  
  <div class="wrap">
    <header class="appbar">
      <h1>Artist Alley POS</h1>
    </header>
  
    <main class="content">
      <section class="catalog">
        <ItemCatalog />
      </section>
      <aside class="cart">
        <ShoppingCart />
        <BundleDiscounts />
      </aside>
    </main>
  </div>
  
  <style>
    .wrap { max-width: 1400px; margin: 0 auto; padding: 12px; }
    .appbar {
      position: sticky; top: 0; z-index: 10;
      backdrop-filter: saturate(1.2) blur(6px);
      background: linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.6));
      border-bottom: 1px solid var(--line);
      margin-bottom: 12px; padding: 10px 6px;
    }
    .appbar h1 { font-size: 20px; margin: 0; color: var(--ink-strong); }
    .content {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 380px;
      gap: 14px;
      align-items: start;
    }
    .catalog { min-width: 0; } /* prevent grid overflow */
    .cart { position: sticky; top: 64px; display: grid; gap: 14px; }
    @media (max-width: 980px) {
      .content { grid-template-columns: 1fr; }
      .cart { position: static; }
    }
  </style>
  