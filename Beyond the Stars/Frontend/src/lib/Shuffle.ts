// fisher-yates shuffle
export const shuffle = <T>(array: T[], options?: { inplace?: boolean }): T[] => {
	const shuffled = options?.inplace ? array : [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};
