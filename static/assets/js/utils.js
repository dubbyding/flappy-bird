/**
 * It returns a random number between the min and max values.
 * @param min - The minimum number that can be generated.
 * @param max - The maximum number that can be generated.
 * @returns A random number between the min and max values.
 */
const randomNumberGenerator = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

const spaceEventListener = (e) => {
	if (e.code == 'Space') spaceStatus = 1;
	upStatus = 0;
};

export { randomNumberGenerator, spaceEventListener };
