<script>
  import Layout from '@Components/Layout';
  import Euclidean from '@Components/Euclidean';

  let Tone;

  // master clock
  let tick = 0;
  setInterval(() => tick += 1, 500);

  function handleInit() {
    import('tone').then(module => {
      Tone = module
    });
  }
</script>

{#if Tone}
  <Layout>
    <Euclidean {Tone} {tick} />
  </Layout>
{:else}
  <button on:click={handleInit}>Click to init</button>
{/if}
