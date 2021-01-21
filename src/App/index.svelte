<script>
  import Layout from '@Components/Layout';
  import Circle from '@Components/Circle';
//  import Euclidean from '@Components/Euclidean';

  const rhythm = [1,0,0,1,0,2];


  // testing 
  setInterval(() => {
    const activeIndex = rhythm.indexOf(2)
    let nextActiveIndex = rhythm.indexOf(1, activeIndex);
    nextActiveIndex = nextActiveIndex == -1 ? rhythm.indexOf(1) : nextActiveIndex;
    rhythm[activeIndex] = 1;
    rhythm[nextActiveIndex] = 2;
  }, 1000);

</script>

<style src="./style.scss">

</style>

<Layout>
  <div class="container">
    <div class="container__top">
      <Circle {rhythm} />
    </div>
    <div class="container__middle">
      <!-- <Euclidean /> !-->
    </div>
  </div>
</Layout>
