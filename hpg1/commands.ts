
import type { InitOptions, Point } from "./types";
// Base comamnds
// IN (initialize), 
// SP (select pen), 
// PU/PD (pen up/down), 
// PA/PR (absolute/relative plot) ?, 
// SC (scaling points) ?,

export default class HGPL {
    private commands: string[] = [];
    private currentPosition: { x: number; y: number } = { x: 0, y: 0 };
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

  // Information
  getPos() {
    return this.currentPosition;
  }

  // Commands

  penUP() {
    this.commands.push('PU')
  }
  penDOWN() {
    this.commands.push('PD')
  }
  selectPen(p: number) { 
    this.commands.push(`SP${p}`)
  }
  moveTo(x: number, y: number ) {
    const [px, py] = this.toPlotterUnits(x, y);
    this.commands.push(`PU${px},${py}`);
  }
  lineTo(x: number, y: number) {
    const [px, py] = this.toPlotterUnits(x, y);
    this.commands.push(`PD${px},${py}`);
  }
  set(x: number, y: number) {
    this.currentPosition = { x, y };
    this.commands.push(`PA${x},${y}`);
  }
  move(x: number, y: number) {
    this.commands.push(`PR${x},${y}`);
    this.currentPosition = { x: this.currentPosition.x + x, y: this.currentPosition.y + y };
  }
  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
  }
  drawPoint(x: number, y: number) {
    this.moveTo(x, y);
    this.penDOWN();
    this.penUP();
  }
  polyLine(points: Point[]) {
    const coords = points
    .map(p => this.toPlotterUnits(p.x, p.y)
    .join(',')).join(',');
    this.commands.push(`PD${coords}`);
  }
  arc(
    x: number, 
    y: number, 
    r: number, 
    rotation: number, 
    sweep: number = 0, 
    stepSize: number = 40
    ) {
        sweep = Math.min(sweep, 2 * Math.PI)
        const arcLength = Math.abs(sweep * r)
        const steps = Math.max(Math.round(arcLength / stepSize))
        const pts: Point[] = []
        for (let i = 0; i <= steps; i++) {
            const t = i / steps
            const angle = rotation + t * sweep
            pts.push({ x: x + Math.cos(angle) * r, y: y + Math.sin(angle) * r});
        }
        this.polyLine(pts)
  }

  // Serialize the commands to a string
  serialize(): string {
    return this.commands.join(';') + ';';
  }
}