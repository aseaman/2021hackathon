<script>
const graphSize = 500;
const svgSize = graphSize + 0.1 * graphSize; // making sure nothing gets clipped

let led = {
  size: graphSize / 100,
  fill: "orange",
  x: graphSize / 2,
  y: graphSize / 2
};

const euclid = {
  steps: 7,
  notes: 13
};

var round = (number) => {
  return parseFloat((Math.floor(number * 100) / 100).toFixed(2));
}

var poltocar = ( half, angle ) => {
  var radius = 10;
  var x = round(
      half + half * radius * Math.cos((Math.PI * angle) / 180)
      );
  var y = round(
      half + half * radius * Math.sin((Math.PI * angle) / 180)
      );
  return { x, y };
}

const intervalId = setInterval(() => {
  led.x = led.x + 5;
  led.x > graphSize && led.x = 0;
}, 500);


</script>
<style src="./style.scss">

</style>
<svg width={svgSize} height={svgSize}>
<circle fill={led.fill} cx={led.x} cy={led.y} r={led.size} />
</svg>
