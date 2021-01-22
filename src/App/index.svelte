<script>
  import Layout from '@Components/Layout';
  import Euclidean from '@Components/Euclidean';
  //temp
  import Circle from '@Components/Circle';

  let Tone;

  // master clock
  let tick = 0;
  setInterval(() => tick += 1, 500);

  function handleInit() {
    import('tone').then(module => {
      Tone = module
    });
  }
  // temp
  let p = [1,0,0,1,0,1];
  let active = tick % p.length
</script>

<style src="./style.scss"></style>

<Layout>
  <!--
    <Circle pattern={p} {active} ind=0 />
    <Circle pattern={p} {active} ind=1 />
    <Circle pattern={p} {active} ind=2 />
    <Circle pattern={p} {active} ind=3 />
    <Circle pattern={p} {active} ind=4 />
  -->
  {#if Tone}
    <Euclidean {Tone} {tick} />
  {:else}
    <button class="init" on:click={handleInit}>Start</button>
  {/if}
</Layout>
