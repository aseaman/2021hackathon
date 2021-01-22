<script>
  import Layout from '@Components/Layout';
  import Euclidean from '@Components/Euclidean';

  // master clock
  let tick = 0;
  setInterval(() => tick += 1, 500);
</script>

<Layout>
  <Euclidean {tick} />
</Layout>
