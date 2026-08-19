import HGPL from "./hpg1/commands";

const BOUNDS = [10300, 7650]
const center = [Math.floor(BOUNDS[0]/2), Math.floor(BOUNDS[1]/ 2)]
const radius = BOUNDS[1]/ 4
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

// --- ORIGINAL CALL (the one you're debugging) ---
HPGL.arc(150,100, 50, 0, 2 * Math.PI, 1)
const HPstring = HPGL.serialize();
console.log(HPstring)