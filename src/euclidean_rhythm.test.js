const {
	generateEuclideanRhythm,
	recursiveGenerator,
} = require("./euclidean_rhythm");

test("simple test 4 pulses, 12 steps", () => {
	const result = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0];
	expect(generateEuclideanRhythm(4, 12)).toEqual(result);
	expect(recursiveGenerator(4, 12)).toEqual(result);
});

test("5 pulses, 12 steps", () => {
	const result = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0];
	expect(generateEuclideanRhythm(5, 12)).toEqual(result);
	expect(recursiveGenerator(5, 12)).toEqual(result);
});

test("7 pulses, 16 steps", () => {
	const result = [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
	expect(generateEuclideanRhythm(7, 16)).toEqual(result);
	expect(recursiveGenerator(7, 16)).toEqual(result);
});
