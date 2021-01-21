<script>
  export let rhythm = [0,1,0,0,1];
  export let active = 0;

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
    sizes: {active: 25, default: 20},
    // colors: ["#051e3e", "#451e3e", "#851e3e"]
    colors: ["#081c15", "#74c69d", "#2d6a4f", "#d8f3dc"] // silent step, onset, active silent step, active onset 
  };

  function blink(active) {
    const arc = 360 / rhythm.length;
    rhythm.map((step, index) => {
      leds[index] = {};
      leds[index].fill = index === active ? leds.colors[step+2] : leds.colors[step];
      leds[index].size = index === active ? leds.sizes.active : leds.sizes.default;
      leds[index].coords = poltocar(arc * (index+1));
    });
  };
 
  $: blink(active);

</script>
<style src="./style.scss">

</style>
<svg width={svgSize} height={svgSize}>
  {#each rhythm as step, i}
    <circle fill={leds[i].fill} cx={leds[i].coords.x} cy={leds[i].coords.y} r={leds[i].size} />
  {/each}
</svg>
