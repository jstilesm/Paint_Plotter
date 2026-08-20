import HGPL from "./hpg1/commands";
import { commandsToSegments } from "./hpg1/preview";

const BOUNDS = [10300, 7650]
const center = [Math.floor(BOUNDS[0]/2), Math.floor(BOUNDS[1]/ 2)]
const HPGL = new HGPL({unitsPerMM: 40})

// HPGL.selectPen(0)
// HPGL.moveTo(0,0);
// HPGL.lineTo(50,0);
// HPGL.lineTo(50,50);
// HPGL.lineTo(0, 50);
// HPGL.lineTo(0,0);

// HPGL.HPGLLine(0, 0, 50, 50);
// HPGL.penUP();
// HPGL.polyLine([{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}]);

HPGL.arc(200,190, 50, 0, 2 * Math.PI, 40)
const HPstring = HPGL.serialize();
const commandSeg = commandsToSegments(HPGL.serialize())
console.log(commandSeg)
// console.log(HPstring)