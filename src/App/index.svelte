<script>
  import Layout from '@Components/Layout';
  import Euclidean from '@Components/Euclidean';
  //temp
  import Circle from '@Components/Circle';

  let Tone;

  const MAX_PATTERNS = 5;
  let currentPatterns = 1;

  // master clock
  let tick = 0;
  setInterval(() => tick += 1, 500);

  function handleInit() {
    import('tone').then(module => {
      Tone = module
    });
  }

  function handleAddPattern() {
    if (currentPatterns === MAX_PATTERNS) {
      return;
    }
    currentPatterns += 1;
  }

  function handleRemovePattern() {
    if (currentPatterns === 1) {
      return;
    }
    currentPatterns -= 1;
  }
  // temp
  let p = [1,0,0,1,0,1];
  let active = tick % p.length
</script>

<style src="./style.scss"></style>

<Layout>
  {#if Tone}
    <div class="left">
      <button on:click={handleAddPattern}>Add</button>
      <button on:click={handleRemovePattern}>Remove</button>
      {#each Array(currentPatterns) as _, i}
        <Euclidean {Tone} {tick} ind={i} />
      {/each}
    </div>
    <div class="right"></div>
  {:else}
    <button class="init" on:click={handleInit}>Start</button>
  {/if}
  
  <!--
    <Circle pattern={p} {active} ind=0 />
    <Circle pattern={p} {active} ind=1 />
    <Circle pattern={p} {active} ind=2 />
    <Circle pattern={p} {active} ind=3 />
    <Circle pattern={p} {active} ind=4 />
  -->
</Layout>
