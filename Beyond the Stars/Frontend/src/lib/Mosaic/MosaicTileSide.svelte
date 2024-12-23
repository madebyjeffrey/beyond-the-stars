<script lang="ts">
	const { path }: { path: string } = $props();

	const sourceFile = (input: string, size: number) => `/mosaic/${input}@${size}.avif`;
	const media = (size: number) => `(max-width: ${size === 1 ? 1000 : size === 2 ? 2000 : 3000}px)`;
</script>

<picture class="rounded-2xl">
	{#each [1, 2, 4] as size}
		<source type="image/avif" srcset={sourceFile(path, size)} media={media(size)} />
	{/each}
	<img src={sourceFile(path, 4)} class="h-full rounded-2xl" alt="space scene in mosaic" />
</picture>
