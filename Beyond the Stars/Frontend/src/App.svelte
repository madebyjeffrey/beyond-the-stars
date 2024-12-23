<script lang="ts">
	import { Router } from '@mateothegreat/svelte5-router';
	import type { Route } from '@mateothegreat/svelte5-router';

	const routes: Route[] = [
		{ path: '/', component: async () => import('./lib/Mosaic/Mosaic.svelte') }
	];
</script>

<Router basePath="/" {routes} />
