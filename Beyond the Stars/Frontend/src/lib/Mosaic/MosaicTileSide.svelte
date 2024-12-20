<script lang="ts">
	import type { MosaicTileType } from './MosaicConfig';

	const { path, type, classes }: MosaicTileType = $props();

	const sourceFile = (input: string, size: number) => `/mosaic/${input}@${size}.avif`;
	const media = (size: number) => `(max-width: ${size === 1 ? 1000 : size === 2 ? 2000 : 3000}px)`;
</script>

{#if type === 'image'}
	<picture class="aspect-square">
		{#each [1, 2, 4] as size}
			<source type="image/avif" srcset={sourceFile(path, size)} media={media(size)} />
		{/each}
		<img src={sourceFile(path, 4)} class="aspect-square h-full" alt="space scene in mosaic" />
	</picture>
{/if}
{#if type === 'svg'}
	<img src={path} alt="logo" class={classes} />
{/if}
