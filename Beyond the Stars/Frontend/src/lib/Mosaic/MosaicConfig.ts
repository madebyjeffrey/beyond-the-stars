import { integerLeadingZero } from '../Utilities/formatting-numbers';

const leadingZero = integerLeadingZero(2);

export const imageSources = Array(22)
	.fill(0)
	.map((_, i) => `mosaic${leadingZero(i + 1)}`);
