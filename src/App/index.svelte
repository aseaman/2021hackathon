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
    }).then(() => {

      const mic = new Tone.UserMedia();
      mic.open().then(() => {
        // promise resolves when input is available
        console.log("mic open");
        // print the incoming mic levels in decibels
      }).catch(e => {
        // promise is rejected when the user doesn't have or allow mic access
        console.log("mic not open");
      });
      mic.toDestination();
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
  let p = [[1,0,0,1,0,1], [1,0,1,0,1,1,0,0], [1,0,0,0], [1,0,1,1,0,1,1,0,1,1], [0,0,1,0,0,1,0,1]] 
  let active = tick % p.length
</script>

<style src="./style.scss"></style>

  <Layout>
    <!--
      <Circle pattern={p[0]} {active} ind=0 />
      <Circle pattern={p[1]} {active} ind=1 />
      <Circle pattern={p[2]} {active} ind=2 />
      <Circle pattern={p[3]} {active} ind=3 />
      <Circle pattern={p[4]} {active} ind=4 />
    -->
    {#if Tone}
      <div class="left">
        <div class="container__add-remove">
          <button class="control-button" on:click={handleAddPattern}>Add</button>
          <button class="control-button" on:click={handleRemovePattern}>Remove</button>
        </div>
        {#each Array(currentPatterns) as _, i}
          <Euclidean {Tone} {tick} ind={i} />
        {/each}
      </div>
    {:else}
      <button class="init-button" on:click={handleInit}>Start</button>
    {/if}  
  </Layout>
