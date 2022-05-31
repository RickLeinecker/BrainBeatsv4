import { WebglPlot, ColorRGBA, WebglLine } from "./webglplot.esm.js";

class Visualizer {
  constructor(canvasID, numOfLines) {
    this.canvas = document.getElementById(canvasID);
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
    this.numX = Math.round(this.canvas.width);
    this.wglp = new WebglPlot(this.canvas);
    this.numLines = numOfLines;
    this.scaleY = 1;
    this.fpsCounter = 0;
    this.fpsDivder = 5;
    this.trackDataHolder = [];

    this.init = () => {
      this.wglp.removeAllLines();
      for (let i = 0; i < this.numLines; i++) {
        const color = new ColorRGBA(
          Math.random(),
          Math.random(),
          Math.random(),
          1
        );
        const line = new WebglLine(color, this.numX);
        line.arrangeX();
        this.wglp.addLine(line);
        this.trackDataHolder.push([]);
      }

      console.log("init");
      //console.log(this.trackDataHolder);
    };

    this.newFrame = () => {
      //console.log("newFrame");
      if (this.fpsCounter === 0) {
        this.plot();
        this.wglp.gScaleY = this.scaleY;
        this.wglp.update();
      }

      this.fpsCounter++;
      if (this.fpsCounter >= this.fpsDivder) {
        this.fpsCounter = 0;
      }

      requestAnimationFrame(this.newFrame);
    };

    this.updateTrackData = (id, data) => {
      this.trackDataHolder[id] = data;
    };

    requestAnimationFrame(this.newFrame);
    this.plot = () => {
      this.wglp.linesData.forEach((line, i) => {
        if (i == 0) {
          line.shiftAdd([this.trackDataHolder[i]]);
        }
      });
      //const line = this.wglp.linesData[0];
      //line.shiftAdd([Math.random()]);
    };

    this.init();
  }
}

export default Visualizer;
