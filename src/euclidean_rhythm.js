export default function generateEuclideanRhythm(onsets, steps, rotate = 0) {
    const slope = onsets / steps;
    const euclidean = [];
    let previous = -1;

    for (let i = 0; i < steps; i++) {
        const current = Math.floor(i * slope);
        euclidean.push(current !== previous ? 1 : 0);
        previous = current;
    }
    
    if (rotate > 0) {
      for (let i = 0; i < rotate; i++) {
        const el = euclidean.pop();
        euclidean.splice(0, 0, el);
      }
    }

    return euclidean;
}

// function recursiveGenerator(pulses, steps) {
// 	const hits = Array(pulses).fill(1);
// 	const rests = Array(steps - pulses).fill(0);

// 	return recurse(hits, rests);
// }

// function recurse(hits, rests) {
// 	if (rests.length <= 1) {
// 		return hits
// 			.concat(rests)
// 			.flatMap((e) => e.split(""))
// 			.map((e) => parseInt(e, 10));
// 	}

// 	const newHits = [];
// 	while (hits.length && rests.length) {
// 		newHits.push(`${hits.pop()}${rests.pop()}`);
// 	}

// 	return recurse(newHits, hits.concat(rests));
// }

// exports.generateEuclideanRhythm = generateEuclideanRhythm;
// exports.recursiveGenerator = recursiveGenerator;
