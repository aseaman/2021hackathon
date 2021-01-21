<script>
  import Layout from '@Components/Layout';
  import Circle from '@Components/Circle';
  import Euclidean from '@Components/Euclidean';

  const rhythm = [1,0,0,1,0,1];
  let active = 0;

  // testing 
  setInterval(() => {
    active = (active + 1) % rhythm.length;
  }, 1000);

</script>

<style src="./style.scss">

</style>

<Layout>
  <div class="container">
    <div class="container__top">
      <Circle {rhythm} {active} />
    </div>
    <div class="container__middle">
      <Euclidean />
    </div>
  </div>
</Layout>
