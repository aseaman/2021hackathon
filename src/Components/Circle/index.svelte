<script>
  export let pattern;
  export let active = 0;
  export let ind = 0; // when several Circles are instantiated we keep track of their indices.

  const circleSize = 600 - ((parseInt(ind) +1) * 90);
  const padding = circleSize * 0.2; // making sure nothing gets clipped
  const svgSize = circleSize + padding;

  let leds = {};

  var round = (number) => {
    return parseFloat((Math.floor(number * 100) / 100).toFixed(2));
  }

  function poltocar(angle) {
    angle = angle - 90;
    var half = circleSize / 2;
    var x = round(
      // half + half * radius * Math.cos((Math.PI * angle) / 180)
      half + half * Math.cos((Math.PI * angle) / 180) + (padding / 2)
    );
    var y = round(
      half + half * Math.sin((Math.PI * angle) / 180) + (padding / 2)
    );
    return { x, y };
  }

  function blink(active) {
    const arc = 360 / pattern.length;
    pattern.map((step, index) => {
      leds[index] = {};
      //leds[index].class = index === active ? `circle-${ind} active` : `circle-${ind}`;
      leds[index].class = `circle-${ind} ${step === 1 ? "onset" : ""} ${index === active ? "active" : ""}`;
      leds[index].coords = poltocar(arc * (index+1));
    });
  };
 
  $: blink(active);

</script>

<style src="./style.scss"></style>

<svg width={svgSize} height={svgSize}>
  {#each pattern as step, i}
    <circle class={leds[i].class} cx={leds[i].coords.x} cy={leds[i].coords.y} />
  {/each}
</svg>
