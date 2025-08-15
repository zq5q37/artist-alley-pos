<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// src/routes/+layout.ts
export const prerender = false; // POS is interactive / localStorage
import "../app.css";
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
