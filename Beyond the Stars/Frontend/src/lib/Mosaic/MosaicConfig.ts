import { integerLeadingZero } from '../Utilities/formatting-numbers';

export interface MosaicTileType {
	path: string;
	type: 'svg' | 'image';
	classes: string;
}

const leadingZero = integerLeadingZero(2);

export const imageSources: MosaicTileType[] = Array(22)
	.fill(0)
	.map((_, i) => ({ path: `mosaic${leadingZero(i + 1)}`, classes: '', type: 'image' }));

export const logoSource1: MosaicTileType = {
	path: '/mosaic/logo.svg',
	classes: 'object-cover object-left aspect-square',
	type: 'svg'
};
export const logoSource2: MosaicTileType = {
	path: '/mosaic/logo.svg',
	classes: 'object-cover object-right aspect-square',
	type: 'svg'
};
