const scale = d3.scalePow()
          .exponent(2)
          .domain([0, 350]) // velocity (m/s)
          .range([0, 200]) // pixeles of length

const speedScale = d3.scaleLinear()
              .domain([1, 350])
              .range([15000, 1050])

SPEED = speedScale(50);
FLUIDSPEED = 50;

const g0 = d3.select('#svg-canvas')
                  .append('g')
                  .attr('transform', 'translate(250, 400)');

const g1 = d3.select('#svg-canvas')
            .append('g')
            .attr('transform', 'translate(250, 400)');

const g2 = d3.select('#svg-canvas')
            .append('g')
            .attr('transform', 'translate(250, 400)');

function updateFluid() {
  g1.selectAll('circle')
    .remove()

    // .transition()
    // .duration(SPEED)
    // .ease(d3.easeLinear)
    // .attr('cx', 400)
}

// Create pipe
g0.append('rect')
  .attr('width', 800)
  .attr('height', 300)
  .attr('fill', 'silver')
  .attr('x', -400)
  .attr('y', -150)

// fluid inside pipe
g0.append('rect')
  .attr('width', 800)
  .attr('height', 250)
  .attr('fill', 'lightblue')
  .attr('x', -400)
  .attr('y', -125)

// function createFluidDrop() {
//   g1.append('circle')
//     .attr('r', 5)
//     .attr('cx', -255)
//     .attr('cy', Math.floor(Math.random() * (100 - -120) + -120))
//     .attr('fill', 'blue')
//     .transition()
//     .duration(SPEED)
//     .ease(d3.easeLinear)
//     .attr('cx', 400)
//     .remove()
// }

const scaleCounter = d3.scaleLinear()
                .domain([0, 350])
                .range([500, 100])

var counter = 500;
var createFluidDrop = function(){
    g1.append('circle')
      .attr('r', 5)
      .attr('cx', -255)
      .attr('cy', Math.floor(Math.random() * (100 - -120) + -120))
      .attr('fill', 'blue')
      .transition()
      .duration(SPEED)
      .ease(d3.easeLinear)
      .attr('cx', 400)
      .remove()

    counter = Math.floor(scaleCounter(FLUIDSPEED));
    // console.log(counter);
    timeout = setTimeout(createFluidDrop, counter);
}
var timeout = setTimeout(createFluidDrop, counter);

// static pressure tube
g2.append('rect')
  .attr('width', 50)
  .attr('height', 200)
  .attr('x', -100)
  .attr('y', -280)
  .attr('fill', 'silver')

g2.append('rect')
  .attr('width', 30)
  .attr('height', 125)
  .attr('x', -90)
  .attr('y', -320)
  .attr('fill', 'white')

g2.append('rect')
  .attr('width', 30)
  .attr('height', 125)
  .attr('x', -90)
  .attr('y', -200)
  .attr('fill', 'lightblue')


// dynamic pressure tube

// pipe
g2.append('rect')
  .attr('width', 50)
  .attr('height', 400)
  .attr('x', 200)
  .attr('y', -405)
  .attr('fill', 'silver')

g2.append('rect')
  .attr('width', 175)
  .attr('height', 50)
  .attr('x', 75)
  .attr('y', -50)
  .attr('fill', 'silver')

// pipe's white background 
g2.append('rect')
  .attr('width', 30)
  .attr('height', 370)
  .attr('x', 210)
  .attr('y', -410)
  .attr('fill', 'white')

// vertical fluid
g2.append('rect')
  .attr('width', 30)
  .attr('height', 175)
  .attr('x', 210)
  .attr('y', -200)
  .attr('fill', 'lightblue')

// horizontal fluid
g2.append('rect')
  .attr('width', 170)
  .attr('height', 30)
  .attr('x', 70)
  .attr('y', -40)
  .attr('fill', 'lightblue')

// dynamic pressure fluid
g2.append('rect')
  .attr('transform', 'rotate(270)')
  .attr('width', 29)
  .attr('height', 30)
  .attr('x', 199)
  .attr('y', 210)
  .attr('fill', 'lightblue')
  .attr('id', 'dynamicPressure')

// arrow
g2.append('rect')
  .attr('width', 100)
  .attr('height', 10)
  .attr('x', -100)
  .attr('y', -30)
  .attr('fill', 'black')

g2.append('rect')
  .attr('width', 35)
  .attr('height', 10)
  .attr('x', -50)
  .attr('y', -27)
  .attr('fill', 'black')
  .attr('transform', 'rotate(30)')

g2.append('rect')
  .attr('width', 35)
  .attr('height', 10)
  .attr('x', -25)
  .attr('y', -27)
  .attr('fill', 'black')
  .attr('transform', 'rotate(-30)')

const slider = document.getElementById("myRange");
const output = document.getElementById("value");

slider.oninput = function() {
  output.innerHTML = `Valor actual: ${this.value} m/s`;
  d3.select('#dynamicPressure').attr('width', Math.round(scale(this.value)));
  SPEED = speedScale(Math.round(this.value));
  FLUIDSPEED = this.value;
  updateFluid();
}




