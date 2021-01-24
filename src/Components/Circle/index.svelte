<script>
  export let pattern;
  export let active = 0;
  export let ind = 0; // when several Circles are instantiated we keep track of their indices.
  ind = parseInt(ind) + 1;
  const circleSize = 600 - ((parseInt(ind) +1) * 90);
  const padding = 700 - circleSize;
  const svgSize = circleSize + padding;

  let leds = {};

  var round = (number) => {
    return parseFloat((Math.floor(number * 100) / 100).toFixed(2));
  }

  function poltocar(angle) {
    // angle = angle - 90;
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
	
	$: if (pattern && pattern.length) {
		const arc = 360 / pattern.length;
		pattern.forEach((step, index) => {
			leds[index] = {};
			leds[index].class = `circle-${ind} ${step === 1 ? "onset" : ""}`;
			leds[index].coords = poltocar(arc * (index+1));
		});
	}

  function blink(active) {
    // const arc = 360 / pattern.length;
    // pattern.map((step, index) => {
    //   leds[index] = {};
    //   //leds[index].class = index === active ? `circle-${ind} active` : `circle-${ind}`;
    //   leds[index].class = `circle-${ind} ${step === 1 ? "onset" : ""} ${index === active ? "active" : ""}`;
    //   leds[index].coords = poltocar(arc * (index+1));
		// });
		pattern.map((step, index) => {
			if (leds[index]) {
				leds[index].class = `circle-${ind} ${step === 1 ? "onset" : ""} ${index === active ? "active" : ""}`;
			}
		});
	};
	
  $: blink(active);

</script>

<style src="./style.scss"></style>

<svg viewBox={`0 0 ${svgSize} ${svgSize}`} >
  <circle cx={svgSize/2} cy={svgSize/2} r={25 + circleSize/2} stroke="#654c0f" stroke-width="6px" fill="white" fill-opacity="0.03"></circle>
  {#each pattern as step, i}
    <circle class={leds[i].class} cx={leds[i].coords.x} cy={leds[i].coords.y} />
  {/each}
</svg>
