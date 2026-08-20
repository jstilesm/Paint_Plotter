export interface InitOptions {
    unitsPerMM?: number; // plotter units per MM
    defaultPen?: number; // selected Pen
}
export interface Point {
    x: number;
    y: number;
}
export interface Segment {
    x1: number;
    y1: number;
    x2: number;
    y2: number
}

