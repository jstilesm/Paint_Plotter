# Paint_Plotter

Canvas to Plotter Web Application

## Overview

A web app that lets a user draw an image on an HTML canvas and converts the drawing into HP-GL commands for output to a physical pen plotter.

## Steps

- [ ] Build out JS to plotter interpreter — given JS/canvas drawing data, return HP-GL code for the plotter
- [ ] Build out web page with canvas screen where user can draw an image
- [ ] Connect both interfaces together

---

## Day 1

Built the basic class structure for the HP-GL interpreter, with foundational pen and motion commands.

### Done

- Created `Point` and `InitOptions` types
- Created basic commands: `penUP`, `penDOWN`, `drawLine`, `drawPoint`, `arc`, `polyLine`
- Added absolute (`moveTo`/`lineTo`/`set`) and relative (`move`) positioning
- Added unit conversion between mm and plotter units (`toPlotterUnits`, 1 unit = 0.025mm)
- Added command serialization (`serialize`) to produce a semicolon-delimited HP-GL string

### Known issues / notes for tomorrow

- `moveTo` doesn't update `currentPosition` — desyncs with `move`'s relative tracking
- `set` and `move` skip `toPlotterUnits`, so they emit raw mm instead of plotter units (inconsistent with `moveTo`/`lineTo`)
- No explicit `PA`/`PR` mode switching before `moveTo` vs `move` — plotter mode is global state and could desync if calls are interleaved
- `arc` currently draws in one continuous `polyLine` from its own start point, with no `moveTo` to reposition the pen first — need to confirm chained arcs/shapes don't leave stray lines from the previous pen position
- Next: canvas drawing capture — evaluate path-simplification (Ramer–Douglas–Peucker) + curve fitting (Bezier fit or Catmull-Rom) + adaptive flattening to convert freehand mouse input into clean HP-GL point lists