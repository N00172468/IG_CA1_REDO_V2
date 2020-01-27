function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  generateMolecules();
  displayGui();

  // noLoop();
}

// console.time("Time Taken");
function draw() {
  background(0);

  colWidth = width / numCols;
  rowHeight = height / numRows;

  if (guiObj.render) renderGrid();
  if (guiObj.intersect)checkIntersections();
  if (guiObj.grid) drawGrid();
  splitIntoGrids();
  if (guiObj.bruteChecks)bruteChecks();

  fill(47, 226, 255);
  textSize(11);
  text("FPS: " + frameRate().toFixed(0), 5, 14);
}
// console.timeEnd("Time Taken");


