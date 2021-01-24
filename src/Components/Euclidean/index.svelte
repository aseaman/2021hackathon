<script>
  import generateEuclideanRhythm from '../../euclidean_rhythm';
  import { createDrums, createBassSynthVoice, createPluckedStringSynth, getDrumNote } from '../../voices';
  import Circle from '@Components/Circle';
  
  export let ind;
  export let tick = 0;
  export let Tone; // importing dynamically because of an issue in Chrome, see https://github.com/Tonejs/Tone.js/issues/443

  // tick starts at App initialization
  // localTick starts when Euclidean component mounts
  // they're the same if Euclidean is mounted on page load
  // taking advantage of Svelte here: offset doesn't get reassigned with new values unless decorated with "$:"
  const offset = tick;
  $: localTick = tick - offset;

  let sequence = null;
  let pattern = [];
  let isPlaying = false;
  let onsets = 3;
  let steps = 7;
  let rotate = 0;
  let voice = 'bass';

  const bassSynth = createBassSynthVoice(Tone);
  const stringSynth = createPluckedStringSynth(Tone);
  const drums = createDrums(Tone);

  function generatePattern() {
    pattern = generateEuclideanRhythm(onsets, steps, rotate);
  }

  function handlePlayPattern() {
    if (pattern.length === 0) {
      return;
    }

    generatePattern();

    if (isPlaying) {
      if (sequence && !sequence.disposed) {
        sequence.stop();
      }
    } else {
      circlepat = pattern;
      active = 0;
      let notes = [];
      if (voice === 'bass') {
        notes = pattern.map((e) => e ? 'E2' : 'E6');
      } else if (voice === 'string') {
        notes = pattern.map((e) => e ? 'C#3' : 'E6');
      } else {
        const drumNote = getDrumNote(voice);
        notes = pattern.map((e) => e ? drumNote : 'E6');
      }
      if (sequence && !sequence.disposed) {
        sequence.dispose();
      }
      sequence = new Tone.Sequence((time, note) => {
        if( note !== "E6" ) {
          if (voice === 'bass') {
            bassSynth.triggerAttackRelease(note, "8n", time);
          } else if (voice === 'string') { 
            stringSynth.triggerAttackRelease(note, "8n", time);
          } else {
            drums.triggerAttackRelease(note, "8n", time);
          }
        }
        Tone.Draw.schedule(function() {
          active = (active + 1) % circlepat.length
        }, time);
      }, notes).start(0);

      if (Tone.Transport.state !== 'started') {
        Tone.Transport.start();
      }
      sequence.start();
    }
    isPlaying = !isPlaying;
  }

  generatePattern(); 
  let circlepat = pattern;
  let active = 0;

</script>

<style src="./style.scss"></style>

<div class="container">
  <div class="container__circle">
    <Circle pattern={circlepat} {active} {ind} />
  </div>
  <div class="container__euclid-controls">
    <div class="form__row">
      <div class="form__group">
        <input id={`onsets${ind}`} class="form__field" placeholder="Onsets" bind:value={onsets} />
        <label for={`onsets${ind}`} class="form__label">Onsets</label>
      </div>
      <div class="form__group">
        <input id={`steps${ind}`} class="form__field" placeholder="Steps" bind:value={steps} />
        <label for={`steps${ind}`} class="form__label">Steps</label>
      </div>
      <div class="form__group">
        <input id={`rotate${ind}`} class="form__field" placeholder="Rotate" bind:value={rotate} />
        <label for={`rotate${ind}`} class="form__label">Rotate</label>
      </div>
    </div>
    <div class="form__row">
      <label for="voice" class="form__select-label">Voice</label>
      <div id="voice" class="form__select">
        <select bind:value={voice}>
          <option value="bass">Bass Synth</option>
          <option value="string">String Synth</option>
          <option value="kick">Kick</option>
          <option value="kick2">Kick 2</option>
          <option value="snare">Snare</option>
          <option value="snare2">Snare 2</option>
          <option value="hihat">Hihat</option>
          <option value="hihat2">Hihat 2</option>
          <option value="tom">Tom</option>
          <option value="tom2">Tom 2</option>
          <option value="tom3">Tom 3</option>
          <option value="tom4">Tom 4</option>
        </select>
      </div>
      <button class="play-pause" on:click={handlePlayPattern}>
        {#if isPlaying}
        <svg xmlns="http://www.w3.org/2000/svg" width="16pt" height="16pt" viewBox="0 0 16 16">
          <path d="M5 5h2v6H5zm4 0h2v6H9zm0 0"/>
        </svg>
        {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16pt" height="16pt" viewBox="0 0 16 16">
          <path d="M5 4l6 4-6 4zm0 0"/>
        </svg>
        {/if}
      </button>
    </div>
  </div>
</div>
