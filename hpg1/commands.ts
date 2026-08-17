
import type { InitOptions } from "./types";
// Base comamnds
// IN (initialize), 
// SP (select pen), 
// PU/PD (pen up/down), 
// PA/PR (absolute/relative plot) ?, 
// SC (scaling points) ?,

export class HGPL {
    private commands: string[] = [];
    private unitsPerMM: number;
    
    // #1 plotter unit == 0.025 mm 1 / .025 = 40;
    constructor(options: InitOptions = {}) {
        this.unitsPerMM = options.unitsPerMM ?? 40;
        this.init(options);
  }
  private init(options: InitOptions) {
    this.commands.push('IN');

    if (options.scaleWindow) {
        const { x1, x2, y1, y2 } = options.scaleWindow
        this.commands.push(`SC${x1},${x2},${y1},${y2}`);
    }
    this.commands.push(`SP${options.defaultPen ?? 1}`)
  }
  private toPlotterUnits(x: number, y: number): [number, number] {
    return [Math.round(x * this.unitsPerMM), Math.round(y * this.unitsPerMM)];
  }

  moveTo(x: number, y: number ) {
    const [px, py] = this.toPlotterUnits(x, y);
    this.commands.push(`PU${px},${py}`);
  }
  lineTo(x: number, y: number) {
    const [px, py] = this.toPlotterUnits(x, y);
    this.commands.push(`PD${px},${py}`);
  }
  penUP() {
    this.commands.push('PU')
  }
  selectPen(p: number) { 
    this.commands.push(`SP${p}`)
  }
  serialize(): string {
    return this.commands.join(';') + ';';
  }
}