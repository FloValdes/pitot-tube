const g = d3.select('#svg-canvas')
            .append('g')
            .attr('transform', 'translate(250, 400)')

// Create pipe
g.append('rect')
  .attr('width', 800)
  .attr('height', 300)
  .attr('fill', 'silver')
  .attr('x', -400)
  .attr('y', -150)

// fluid inside pipe
g.append('rect')
  .attr('width', 800)
  .attr('height', 200)
  .attr('fill', 'lightblue')
  .attr('x', -400)
  .attr('y', -125)

// static pressure tube
g.append('rect')
  .attr('width', 50)
  .attr('height', 200)
  .attr('x', -100)
  .attr('y', -280)
  .attr('fill', 'silver')

g.append('rect')
  .attr('width', 30)
  .attr('height', 125)
  .attr('x', -90)
  .attr('y', -320)
  .attr('fill', 'white')

g.append('rect')
  .attr('width', 30)
  .attr('height', 125)
  .attr('x', -90)
  .attr('y', -200)
  .attr('fill', 'lightblue')


// dynamic pressure tube

// pipe
g.append('rect')
  .attr('width', 50)
  .attr('height', 400)
  .attr('x', 200)
  .attr('y', -405)
  .attr('fill', 'silver')

g.append('rect')
  .attr('width', 175)
  .attr('height', 50)
  .attr('x', 75)
  .attr('y', -50)
  .attr('fill', 'silver')

// pipe's white background 
g.append('rect')
  .attr('width', 30)
  .attr('height', 370)
  .attr('x', 210)
  .attr('y', -410)
  .attr('fill', 'white')

// vertical fluid
g.append('rect')
  .attr('width', 30)
  .attr('height', 175)
  .attr('x', 210)
  .attr('y', -200)
  .attr('fill', 'lightblue')

// horizontal fluid
g.append('rect')
  .attr('width', 170)
  .attr('height', 30)
  .attr('x', 70)
  .attr('y', -40)
  .attr('fill', 'lightblue')

// dynamic pressure fluid
g.append('rect')
  .attr('transform', 'rotate(270)')
  .attr('width', 29)
  .attr('height', 30)
  .attr('x', 199)
  .attr('y', 210)
  .attr('fill', 'lightblue')
  .attr('id', 'dynamicPressure')

// arrow
g.append('rect')
  .attr('width', 100)
  .attr('height', 10)
  .attr('x', -100)
  .attr('y', -30)
  .attr('fill', 'black')

g.append('rect')
  .attr('width', 35)
  .attr('height', 10)
  .attr('x', -50)
  .attr('y', -27)
  .attr('fill', 'black')
  .attr('transform', 'rotate(30)')

g.append('rect')
  .attr('width', 35)
  .attr('height', 10)
  .attr('x', -25)
  .attr('y', -27)
  .attr('fill', 'black')
  .attr('transform', 'rotate(-30)')

scale = d3.scalePow()
          .exponent(2)
          .domain([0, 350]) // velocity (m/s)
          .range([0, 200]) // pixeles of length

const slider = document.getElementById("myRange");
const output = document.getElementById("value");

slider.oninput = function() {
  output.innerHTML = `Valor actual: ${this.value} m/s`;
  d3.select('#dynamicPressure').attr('width', Math.round(scale(this.value,2)))
}




