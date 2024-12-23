// Resize Observer Action
// Use 'use:' with it

import type { Action } from 'svelte/action';

export interface SizeInformation {
	inlineSize: number;
	blockSize: number;
}

export const largestSize = (size: SizeInformation) => Math.max(size.inlineSize, size.blockSize);
export const smallestSize = (size: SizeInformation) => Math.min(size.inlineSize, size.blockSize);
export const smallestDimension = (size: SizeInformation) =>
	size.inlineSize > size.blockSize ? 'blockSize' : 'inlineSize';
// noinspection JSUnusedGlobalSymbols
export const largestDimension = (size: SizeInformation) =>
	size.inlineSize > size.blockSize ? 'inlineSize' : 'blockSize';

export const size: Action<
	HTMLDivElement,
	undefined,
	{
		onsize: (e: CustomEvent<SizeInformation>) => void;
	}
> = (node) => {
	const resizeObserver = new ResizeObserver((entries) => {
		requestAnimationFrame(() => {
			if (entries.length === 1 && entries[0].contentBoxSize.length === 1) {
				node.dispatchEvent(new CustomEvent('size', { detail: entries[0].contentBoxSize[0] }));
			}
		});
	});

	$effect(() => {
		resizeObserver.observe(node);

		return () => {
			resizeObserver.disconnect();
		};
	});
};
