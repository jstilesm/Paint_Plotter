import type { Segment } from "./types";

const BOUNDS = [10300, 7650]
export function commandsToSegments(hpgl: string) {
    const commands = hpgl.split(";")
    let pos = {x: 0, y: 0}
    let penDown = false;
    const segments: Segment[] = []
    for (const command of commands) {
        let initial = command.slice(0,2)
        let coords = command.slice(3).split(",")
        // console.log('command:', initial)
        // console.log('coordinates:', coords)
        if (initial === "PU") {
            penDown = false;
            continue;
        }
        if (initial === "PD") {
            penDown = true;
            continue;
        }
        const prev = {x: pos.x, y:pos.y}
        if (initial === "PA") {
            pos.x = Number(coords[0])
            pos.y = Number(coords[1])
            if (penDown) segments.push({ x1: prev.x, y1: prev.y, x2: pos.x, y2: pos.y });

        }
        if (initial === "PR") {
            pos.x = pos.x + Number(coords[0])
            pos.y = pos.y + Number(coords[1])
            if (penDown) segments.push({ x1: prev.x, y1: prev.y, x2: pos.x, y2: pos.y });
        }
    }
    return segments
}
// TO DO

// fs.writeFileSync(path.join(os.tmpdir(), 'plot.svg'), svgString)

// generate svg from line coordinates

// function dot() {}