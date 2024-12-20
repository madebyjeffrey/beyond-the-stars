<script lang="ts">
	import MosaicTileSide from './MosaicTileSide.svelte';
	import type { MosaicTileType } from './MosaicConfig';

	interface props {
		front: MosaicTileType;
		back: MosaicTileType;
		flipped: boolean;
	}

	const { front, back, flipped }: props = $props();
</script>

<div class="flipper aspect-square" class:flipped>
	<div class="front">
		<MosaicTileSide {...front}></MosaicTileSide>
	</div>
	<div class="back">
		<MosaicTileSide {...back}></MosaicTileSide>
	</div>
</div>

<style>
	.flipped {
		transform: rotateY(180deg);
	}

	.flipper {
		transition: 0.6s;
		transform-style: preserve-3d;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'cell';
	}

	.front,
	.back {
		backface-visibility: hidden;

		grid-area: cell;
	}

	.front {
		z-index: 2;
	}

	.back {
		transform: rotateY(180deg);
	}
</style>
