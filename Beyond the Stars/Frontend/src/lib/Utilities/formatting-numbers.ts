export const integerLeadingZero = (minDigits: number = 2) =>
	Intl.NumberFormat('en-US', { minimumIntegerDigits: minDigits }).format;
