export function createBassSynthVoice(Tone) {
  const autoWah = new Tone.AutoWah({
    baseFrequency: 90,
    octaves: 8,
    sensitivity: 0.1,
    Q: 6,
    gain: 3,
    follower: {
      attack: 0.1,
      release: 0.2
    },
    wet: 0.3
  });

  return new Tone.MonoSynth({
    volume: -5,
    oscillator: {
      type: 'fmsquare5',
      modulationType: 'triangle',
      modulationIndex: 2,
      harmonicity: 0.501
    },
    filter: {
      Q: 1,
      type: 'lowpass',
      rolloff: -24
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.4,
      release: 2
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.8,
      release: 1.5,
      baseFrequency: 50,
      octaves: 4.4
    }
  }).chain(autoWah, Tone.Destination);
}

export function createPluckedStringSynth(Tone) {
  const chorus = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7,
    type: 'sine',
    spread: 180,
    wet: 0.3
  });

  const delay = new Tone.PingPongDelay({
    delayTime: '12n',
    maxDelayTime: 1,
    wet: 0.1
  });

  return new Tone.MonoSynth({
    volume: -3,
    oscillator: {
      type: 'sawtooth4'
    },
    filter: {
      Q: 3,
      type: 'highpass',
      rolloff: -12
    },
    envelope: {
      attack: 0.01,
      decay: 0.3,
      sustain: 0.3,
      release: 0.9
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
      baseFrequency: 800,
      octaves: -1.2
    }
  }).chain(chorus, Tone.Destination);
}

export function createDrums(Tone) {
  const autoWah = new Tone.AutoWah({
    baseFrequency: 90,
    octaves: 8,
    sensitivity: 0.1,
    Q: 6,
    gain: 3,
    follower: {
      attack: 0.1,
      release: 0.2
    },
    wet: 0.3
  }).toDestination();

  return new Tone.Sampler({
    A1: 'Kit8/snare.mp3',
    A2: 'Kit8/kick.mp3',
    A3: 'Kit8/hihat.mp3',
    A4: 'Kit8/tom1.mp3',
    B1: 'Techno/snare.mp3',
    B2: 'Techno/kick.mp3',
    B3: 'Techno/hihat.mp3',
    B4: 'Techno/tom1.mp3',
    B5: 'Techno/tom2.mp3',
    B6: 'Techno/tom3.mp3',
  },
    {
      volume: -5,
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/drum-samples/'
    }
  ).chain(autoWah);
}

export function getDrumNote(voice) {
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
    case 'snare2':
      drumNote = 'B1';
      break;
    case 'kick2':
      drumNote = 'B2';
      break;
    case 'hihat2':
      drumNote = 'B3';
      break;
    case 'tom2':
      drumNote = 'B4';
      break;
    case 'tom3':
      drumNote = 'B5';
      break;
    case 'tom4':
      drumNote = 'B6';
      break;
    default:
      drumNote = 'A1';
      break;
  }
  return drumNote;
}