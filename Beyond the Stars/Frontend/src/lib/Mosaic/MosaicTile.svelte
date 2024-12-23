<script lang="ts">
	import MosaicTileSide from './MosaicTileSide.svelte';

	interface props {
		front: string;
		back: string;
		flipped: boolean;
	}

	const { front, back, flipped }: props = $props();
</script>

<div class="flipper" class:flipped>
	<div class="front">
		<MosaicTileSide path={front}></MosaicTileSide>
	</div>
	<div class="back">
		<MosaicTileSide path={back}></MosaicTileSide>
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
		grid-template-columns: 100%;
		grid-template-rows: 100%;
		grid-template-areas: 'cell';
		aspect-ratio: 1;
		height: 100%;
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
