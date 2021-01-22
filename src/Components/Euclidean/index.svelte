<script>
  export let tick = 0;
  export let Tone; // importing dynamically because of an issue in Chrome, see https://github.com/Tonejs/Tone.js/issues/443
  import generateEuclideanRhythm from '../../euclidean_rhythm';
  import Circle from '@Components/Circle';

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
  let voice = 'synth';

  const synth = new Tone.MembraneSynth().toDestination();
  const drumTest = new Tone.Sampler({
    A1: 'snare.mp3',
    A2: 'kick.mp3',
    A3: 'hihat.mp3',
    A4: 'tom1.mp3'
  },
    {
      volume: 5,
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/drum-samples/Kit8/'
    }
  ).toDestination();

  function generatePattern() {
    pattern = generateEuclideanRhythm(onsets, steps);
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
      if (voice === 'synth') {
        notes = pattern.map((e) => e ? 'B2' : 'E6');
      } else {
        let drumNote = '';
        switch (voice) {
          case 'snare':
            drumNote = 'A1';
            break;
          case 'kick':
            drumNote = 'A2';
            break;
          case 'hihat':
            drumNote = 'A3';
            break;
          case 'tom':
            drumNote = 'A4';
            break;
          default:
            drumNote = 'A1';
            break;
        }
        notes = pattern.map((e) => e ? drumNote : 'E6');
      }
      console.log(notes);
      if (sequence && !sequence.disposed) {
        sequence.dispose();
      }
      sequence = new Tone.Sequence((time, note) => {
        if( note !== "E6" ) {
          if (voice === 'synth') {
            synth.triggerAttackRelease(note, "8n", time);
          } else {
            drumTest.triggerAttackRelease(note, "8n", time);
          }
        }
        Tone.Draw.schedule(function() {
          active = (active + 1) % circlepat.length
        }, time);
      }, notes).start(0);

      if (Tone.Transport.state !== 'started') {
        console.log('starting transport');
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
  <div class="container__top">
    <Circle pattern={circlepat} {active} ind=0 />
  </div>
  <div class="container__middle">
    <div class="container__euclid-controls">
      <div class="form__row">
        <div class="form__group">
          <input id="onsets" class="form__field" placeholder="Onsets" bind:value={onsets} />
          <label for="onsets" class="form__label">Onsets</label>
        </div>
        <div class="form__group">
          <input id="steps" class="form__field" placeholder="Steps" bind:value={steps} />
          <label for="steps" class="form__label">Steps</label>
        </div>
      </div>
      <div class="form__row">
        <label for="voice" class="form__select-label">Voice</label>
        <div id="voice" class="form__select">
          <select bind:value={voice}>
            <option value="synth">Synth</option>
            <option value="kick">Kick</option>
            <option value="snare">Snare</option>
            <option value="hihat">Hihat</option>
            <option value="tom">Tom</option>
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
</div>
