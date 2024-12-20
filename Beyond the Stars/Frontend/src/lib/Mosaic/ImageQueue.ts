import type { MosaicTileType } from './MosaicConfig';
import { shuffle } from '../Shuffle';

export class ImageQueue {
	#images: MosaicTileType[] = [];
	#index: number = -1;

	#shuffle() {
		shuffle(this.#images, { inplace: true });
	}

	addImages(...images: MosaicTileType[]) {
		this.#images.push(...images);
	}

	getImage() {
		if (this.#index === -1 || this.#index === this.#images.length) {
			this.#shuffle();
			this.#index = 0;
		}

		return this.#images[this.#index++];
	}
}
