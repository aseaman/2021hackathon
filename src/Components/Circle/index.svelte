<script>
  export let rhythm = [0,1,0,0,2];
  const graphSize = 600;
  const svgSize = graphSize + 0.1 * graphSize; // making sure nothing gets clipped

  var round = (number) => {
    return parseFloat((Math.floor(number * 100) / 100).toFixed(2));
  }

  var poltocar = (angle) => {
    var radius = 0.5;
    var half = graphSize / 2;
    var x = round(
      half + half * radius * Math.cos((Math.PI * angle) / 180)
    );
    var y = round(
      half + half * radius * Math.sin((Math.PI * angle) / 180)
    );
    return { x, y };
  }

  let leds = {
    size: graphSize / 25,
    colors: ["#051e3e", "#451e3e", "#851e3e"]
  };

  function blink(rhythm) {
    const arc = 360 / rhythm.length;
    // const onsets = rhythm.reduce(step => step > 0);
    rhythm.map((step, index) => {
      leds[index] = {};
      leds[index].fill = leds.colors[step];
        //step == 2 ? "red" : step == 1 ? "blue" : "gray";
      leds[index].coords = poltocar(arc * (index+1));
    });
  };

  $: blink(rhythm);

</script>
<style src="./style.scss">

</style>
<svg width={svgSize} height={svgSize}>
  {#each rhythm as step, i}
    <circle fill={leds[i].fill} cx={leds[i].coords.x} cy={leds[i].coords.y} r={leds.size} />
  {/each}
</svg>
