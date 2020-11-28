const scale = d3.scalePow()
          .exponent(2)
          .domain([0, 350]) // velocity (m/s)
          .range([0, 200]) // pixeles of length

const speedScale = d3.scaleLinear()
              .domain([1, 350])
              .range([15000, 1050])

let SPEED = speedScale(50);
let FLUIDSPEED = 50;
let GAS = "aire";
let X_DYNAMIC = 228;

const gasColor = {
  "aire": {color: "lightblue", particles: "blue", rho: 1.205},
  "co2": {color: "#4a4a4a", particles: "#242424", rho: 1.842},
  "benceno": {color: "#abe0a4", particles: "#71d964", rho: 3.486},
  "metano": {color: "#fcdcfc", particles: "#ffb8ff", rho: 0.668},
  "ozono": {color: "#7474c4", particles: "#4848c7", rho: 2.14},
  "dicloro": {color: "#d9e092", particles: "#cfe02b", rho: 2.9941},
  "vapor": {color: "#dbdbdb", particles: "#a1a1a1", rho: 0.804},
}

// create different g for different z of elements
const g0 = d3.select('#svg-canvas')
                  .append('g')
                  .attr('transform', 'translate(250, 500)');

const g1 = d3.select('#svg-canvas')
            .append('g')
            .attr('transform', 'translate(250, 500)');

const g2 = d3.select('#svg-canvas')
            .append('g')
            .attr('transform', 'translate(250, 500)');

function updateFluid(previousHeight) {
  g1.selectAll('circle')
    .remove()
    
  if (previousHeight) {
    d3.select("#svg-canvas")
      .select("#static-pressure-fluid")
      .attr("height", 150*(gasColor["aire"].rho / gasColor[GAS].rho));

    d3.select("#svg-canvas")
      .select("#dynamic-tube-static-pressure")
      .attr("height", 150*(gasColor["aire"].rho / gasColor[GAS].rho));

    d3.select('#dynamic-tube-dynamic-pressure')
      .attr('x', X_DYNAMIC - (previousHeight - 150*(gasColor["aire"].rho / gasColor[GAS].rho)));

    X_DYNAMIC = X_DYNAMIC - (previousHeight - 150*(gasColor["aire"].rho / gasColor[GAS].rho));

  }
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
  .attr('class', 'liquid')

const scaleCounter = d3.scaleLinear()
                .domain([0, 350])
                .range([500, 100])

var counter = 500;
var createFluidDrop = function(){
    g1.append('circle')
      .attr('r', 5)
      .attr('cx', -255)
      .attr('cy', Math.floor(Math.random() * (100 - -120) + -120))
      .attr('fill', gasColor[GAS].particles)
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
  .attr('height', 400)
  .attr('x', -100)
  .attr('y', -480)
  .attr('fill', 'silver')

g2.append('rect')
  .attr('width', 30)
  .attr('height', 424)
  .attr('x', -90)
  .attr('y', -520)
  .attr('fill', 'white')

g2.append('rect')
  .attr('width', 30)
  .attr('height', 150)
  .attr('transform', 'rotate(180)')
  .attr('x', 60)
  .attr('y', 80)
  .attr('fill', 'lightblue')
  .attr('class', 'liquid')
  .attr('id', 'static-pressure-fluid')

// dynamic pressure tube

// pipe
g2.append('rect')
  .attr('width', 50)
  .attr('height', 500)
  .attr('x', 200)
  .attr('y', -505)
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
  .attr('height', 470)
  .attr('x', 210)
  .attr('y', -510)
  .attr('fill', 'white')

// vertical fluid
g2.append('rect')
  .attr('width', 30)
  .attr('height', 55)
  .attr('x', 210)
  .attr('y', -80)
  .attr('fill', 'lightblue')
  .attr('class', 'liquid')

g2.append('rect')
  .attr('width', 30)
  .attr('height', 150)
  .attr('x', -240)
  .attr('y', 79)
  .attr('fill', 'lightblue')
  .attr('class', 'liquid')
  .attr('transform', 'rotate(180)')
  .attr('id', 'dynamic-tube-static-pressure')

// horizontal fluid
g2.append('rect')
  .attr('width', 170)
  .attr('height', 30)
  .attr('x', 70)
  .attr('y', -40)
  .attr('fill', 'lightblue')
  .attr('class', 'liquid')

// dynamic pressure fluid
g2.append('rect')
  .attr('transform', 'rotate(270)')
  .attr('width', 29)
  .attr('height', 30)
  .attr('x', 228)
  .attr('y', 210)
  .attr('fill', 'lightblue')
  .attr('class', 'liquid')
  .attr('id', 'dynamic-tube-dynamic-pressure')

// pressure points
g2.append('circle')
  .attr('cx', -75)
  .attr('cy', -25)
  .attr('r', 10)
  .attr('fill', 'red')
  
g2.append('text')
  .text('1')
  .attr('font-size', '16px')
  .attr('font-family', 'sans-serif')
  .attr('x', -80)
  .attr('y', -20)
  .attr('fill', 'white')
  .attr('font-weight', 'bold');

g2.append('circle')
  .attr('cx', 65)
  .attr('cy', -25)
  .attr('r', 10)
  .attr('fill', 'red')
  
g2.append('text')
  .text('2')
  .attr('font-size', '16px')
  .attr('font-family', 'sans-serif')
  .attr('x', 60)
  .attr('y', -20)
  .attr('fill', 'white')
  .attr('font-weight', 'bold');



const slider = document.getElementById("myRange");
const output = document.getElementById("value");

slider.oninput = function() {
  output.innerHTML = `Valor actual: ${this.value}`;
  d3.select('#dynamic-tube-dynamic-pressure').attr('width', Math.round(scale(this.value)));
  SPEED = speedScale(Math.round(this.value));
  if (Math.round(this.value) === 0) {
    SPEED = null;
  }
  FLUIDSPEED = this.value;
  updateFluid();
}

// Agregar distintos gases
const gasSelect = document.getElementById("gas-selector");

gasSelect.onchange = function() {
  // Change color
  d3.select("#svg-canvas")
    .selectAll(".liquid")
    .attr("fill", gasColor[this.value].color);

  // Change rho
  document.getElementById("rho-value").innerHTML = gasColor[this.value].rho;

  // get previous height
  const previousHeight = 150*gasColor["aire"].rho / gasColor[GAS].rho;
  GAS = this.value;
  updateFluid(previousHeight);
}




