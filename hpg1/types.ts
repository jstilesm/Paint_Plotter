export interface InitOptions {
    unitsPerMM?: number; // plotter units per MM
    scaleWindow?: { x1: number; x2: number; y1: number; y2: number } // bounds
    defaultPen?: number; // selected Pen
}
export interface Point {
    x: number;
    y: number;
}

