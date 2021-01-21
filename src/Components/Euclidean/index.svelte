<script>
	import * as Tone from "tone";
	import generateEuclideanRhythm from '../../euclidean_rhythm';
	let pattern = [];
	let isPlaying = false;
	let onsets = '';
	let steps = '';
	
	const synth = new Tone.MembraneSynth().toDestination();
	
	function handleGeneratePattern() {
		pattern = generateEuclideanRhythm(onsets, steps);
	}
	
	function handlePlayPattern() {
		if (pattern.length === 0) {
			return;
		}
		
		if (isPlaying) {
			Tone.Transport.stop();
		} else {
			const notes = pattern.map((e, index) => e ? 'B1' : null);
			const sequence = new Tone.Sequence((time, note) => {
				console.log('in seq', note, time);
				synth.triggerAttackRelease(note, "8n", time);
			}, notes).start(0);
			Tone.Transport.start();
		}
		isPlaying = !isPlaying;
	}
</script>

<div>
	<label for="onsets">Onsets</label>
	<input id="onsets" type="number" min=1 bind:value={onsets} />
	<label for="steps">Steps</label>
	<input id="steps" type="number" min=1 bind:value={steps} />
	<button on:click={handleGeneratePattern}>Generate Pattern</button>
	<button on:click={handlePlayPattern}>Play/Pause Pattern</button>
	<p>
		Pattern:  {pattern}
	</p>
</div>