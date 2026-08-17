import HGPL from "./hpg1/commands";

const BOUNDS = [10300, 7650]
const draw = new HGPL({unitsPerMM: 40})

// draw.selectPen(0)
// draw.moveTo(0,0);
// draw.lineTo(50,0);
// draw.lineTo(50,50);
// draw.lineTo(0, 50);
// draw.lineTo(0,0);

// draw.drawLine(0, 0, 50, 50);
// draw.penUP();
// draw.polyLine([{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}]);
draw.arc(60, 60, 5, 0, 2 * Math.PI, 1);
draw.arc(60, 60, 10, 0, 2 * Math.PI, 1);
draw.arc(60, 60, 15, 0, 2 * Math.PI, 1);
draw.arc(60, 60, 20, 0, 2 * Math.PI, 1);
draw.arc(60, 60, 25, 0, 2 * Math.PI, 1);
const HPstring = draw.serialize();
console.log(HPstring)
