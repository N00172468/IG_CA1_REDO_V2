function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  colWidth = width / numCols;
  rowHeight = height / numRows;

  generateMolecules();
  displayGui();

  // noLoop();
}

function draw() {
  background(0);
  
  // console.time("Time Taken");
  if (guiObj.render) renderGrid();
  if (guiObj.intersect)checkIntersections();
  if (guiObj.grid) drawGrid();
  splitIntoGrids();
  if (guiObj.bruteChecks)bruteChecks();
  // console.timeEnd("Time Taken");

  fill(47, 226, 255);
  textSize(11);
  text("FPS: " + frameRate().toFixed(0), 5, 14);
}


