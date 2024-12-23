<script lang="ts">
	import { imageSources } from './MosaicConfig';
	import MosaicTile from './MosaicTile.svelte';
	import { ImageQueue } from './ImageQueue';
	import { untrack } from 'svelte';
	import {
		size,
		type SizeInformation,
		smallestDimension,
		smallestSize
	} from '../Utilities/resize.svelte';
	import { largestSize } from '../Utilities/resize.svelte.js';

	const imageSource = new ImageQueue();
	imageSource.addImages(...imageSources);

	let containerSize: SizeInformation = $state({ inlineSize: 0, blockSize: 0 });

	const tilesAcross: { maxSize: number; across: number }[] = [
		{
			maxSize: 400,
			across: 2
		},
		{
			maxSize: 1200,
			across: 3
		},
		{
			maxSize: 4000,
			across: 4
		}
	];

	const tileCount = (size: number) => tilesAcross.find((t) => t.maxSize >= size)?.across ?? 2;

	const { tilesWide, tilesHigh, tileDimension } = $derived.by(() => {
		const smallest = smallestSize(containerSize);

		const tilesAcrossSmallest = tileCount(smallest);
		const min_size = (smallest - gapSize * (tilesAcrossSmallest - 1)) / tilesAcrossSmallest;
		const max_across = Math.floor(largestSize(containerSize) / (min_size + gapSize));

		if (smallestDimension(containerSize) === 'inlineSize') {
			return { tilesWide: tilesAcrossSmallest, tilesHigh: max_across, tileDimension: min_size };
		} else {
			return { tilesWide: max_across, tilesHigh: tilesAcrossSmallest, tileDimension: min_size };
		}
	});

	// this might vary but is constant for now
	const gapSize = $state(24);

	const styles = $derived.by(() => {
		const vars = [
			`--tile-dimension: ${tileDimension}px`,
			`--tiles-wide: ${tilesWide}`,
			`--tiles-high: ${tilesHigh}`,
			`--tile-gap: ${gapSize}px`
		];

		return vars.join(';');
	});

	let tileSets: { front: string; back: string; flipped: boolean }[] = $derived.by(() => {
		return new Array(tilesWide * tilesHigh).fill(null).map(() => ({
			front: imageSource.getImage(),
			back: imageSource.getImage(),
			flipped: false
		}));
	});
	let flipped = $state(-1);
	let updatedTiles: typeof tileSets = $state([]);

	$effect(() => {
		updatedTiles = tileSets;
	});

	$effect(() => {
		const lastFlippedIndex = flipped;
		const tiles = untrack(() => updatedTiles);

		if (tiles?.length > 0 && lastFlippedIndex !== -1) {
			const flipStatus = untrack(() => tiles[lastFlippedIndex].flipped);

			updatedTiles[lastFlippedIndex].flipped = !flipStatus;
		}
	});

	setInterval(() => {
		if (tileSets.length !== 0) {
			flipped = Math.floor(Math.random() * tileSets.length);
		}
	}, 3000);

	const containerResize = (size: CustomEvent<SizeInformation>) => {
		containerSize = size.detail;
	};
</script>

<div class="h-dvh w-dvw p-8" use:size onsize={containerResize}>
	{#if updatedTiles.length !== 0}
		<div class="tile-grid perspective-distant" style={styles}>
			{#each updatedTiles as tile}
				<MosaicTile {...tile} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.tile-grid {
		display: grid;
		width: min-content;
		grid-template-columns: repeat(var(--tiles-wide), var(--tile-dimension));
		grid-auto-rows: var(--tile-dimension);
		grid-gap: var(--tile-gap);
		margin-left: auto;
		margin-right: auto;
	}
</style>
