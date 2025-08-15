<!-- src/lib/components/BundleDiscounts.svelte -->
<script lang="ts">
    // This component is a read-only “rules board” (editable in /settings)
  </script>
  
  <div class="card">
    <h3>Current Discounts</h3>
    <ul>
      <li>Prints (A3/A4/A5/Mini) & Stickers: <b>Buy-2-Get-1 free</b></li>
      <li>Keychains: <b>$15 per pair</b> ($8 single)</li>
      <li>Stands: <b>$36 per pair</b> ($20 single)</li>
    </ul>
  </div>
  
  <style>
    .card { padding:12px; background:var(--surface); border-radius:16px; box-shadow:var(--shadow-elev1); }
    ul { margin:0; padding-left:18px; }
  </style>
  