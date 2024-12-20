<script lang="ts">
	import { imageSources, logoSource1, logoSource2, type MosaicTileType } from './MosaicConfig';
	import MosaicTile from './MosaicTile.svelte';
	import { ImageQueue } from './ImageQueue';

	const imageSource = new ImageQueue();
	imageSource.addImages(...imageSources);

	const tileSets: { front: MosaicTileType; back: MosaicTileType; flipped: boolean }[] = $state([]);

	for (let i = 0; i < 12; i++) {
		let front = imageSource.getImage();
		let back = i === 5 ? logoSource1 : i === 6 ? logoSource2 : imageSource.getImage();

		tileSets.push({ front, back, flipped: false });
	}

	setTimeout(() => {
		tileSets[5].flipped = true;
		tileSets[6].flipped = true;
	}, 1000);

	setInterval(() => {
		const i = Math.floor(Math.random() * 12);

		if (i === 5 || i === 6) {
			return;
		}

		tileSets[i].flipped = !tileSets[i].flipped;
	}, 3000);
</script>

<div class="grid grid-cols-4 gap-0 grid-rows-3 m-16 perspective-distant">
	{#each tileSets as tile}
		<MosaicTile {...tile} />
	{/each}
</div>
