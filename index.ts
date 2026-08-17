import { HGPL } from "./hpg1/commands.ts";


const BOUNDS = [10300, 7650]
const draw = new HGPL({unitsPerMM: 40})

draw.selectPen(0)
draw.moveTo(0,0);
draw.lineTo(50,0);
draw.lineTo(50,50);
draw.lineTo(0, 50);
draw.lineTo(0,0);
draw.penUP();

const HPstring = draw.serialize();
console.log(HPstring)
