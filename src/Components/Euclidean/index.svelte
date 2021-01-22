<script>
  export let tick = 0;
  import * as Tone from "tone";
  import generateEuclideanRhythm from '../../euclidean_rhythm';
  import Circle from '@Components/Circle';

  // tick starts at App initialization
  // localTick starts when Euclidean component mounts
  // they're the same if Euclidean is mounted on page load
  // taking advantage of Svelte here: offset doesn't get reassigned with new values unless decorated with "$:"
  const offset = tick;
  $: localTick = tick - offset;

  let pattern = [];
  let isPlaying = false;
  let onsets = 3;
  let steps = 7;

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
      circlepat = pattern;
      active = 0;
      const notes = pattern.map((e, index) => e ? 'B1' : null);
      const sequence = new Tone.Sequence((time, note) => {
        console.log('in seq', note, time);
        active = (active + 1) % circlepat.length
        synth.triggerAttackRelease(note, "8n", time);
      }, notes).start(0);
      Tone.Transport.start();
    }
    isPlaying = !isPlaying;
  }

  handleGeneratePattern(); 
  let circlepat = pattern;
  let active = 0;
</script>

<div class="container">
  <div class="container__top">
    <Circle pattern={circlepat} {active} />
  </div>
  <div class="container__middle">
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
  </div>
</div>
