let minRadius = 10;
let maxRadius = 20;
let radius = minRadius + maxRadius;
let molecules = [];
let numRows = 8;
let numCols = 16;
let colWidth;
let rowHeight;
let moleculeKey = [];
let checkIntersection;

var guiObj = {
  numOfMolecules: 300,
  numCols: 8,
  numRows: 4,
  render: true,
  grid: true,
  intersect: true,
  bruteChecks: false
};

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

  checkIntersection = 0;
  checks = 0;

  if (guiObj.render) renderGrid();
  if (guiObj.grid) drawGrid();
  splitIntoGrids();
  if (guiObj.intersect)checkIntersections();
  if (guiObj.bruteChecks)bruteChecks();

  fill(47, 226, 255);
  textSize(11);
  text("FPS: " + frameRate().toFixed(0), 5, 14);
}
// console.timeEnd("Time Taken");

function renderGrid() {
  molecules.forEach(molecule => {
    molecule.render();
    molecule.step();
    molecule.checkEdges();
  });
}

function drawGrid() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      noFill();
      stroke(60, 60, 60);
      rect(x * colWidth, y * rowHeight, colWidth, rowHeight);
    }
  }
}

function splitIntoGrids() {
  create3Darray();

  molecules.forEach(molecule => {
    const currentRow = Math.floor(molecule.position.x / colWidth);
    const currentCol = Math.floor(molecule.position.y / rowHeight);
    moleculeKey[currentCol][currentRow].push(molecule.moleculeId);
  });
}

function create3Darray() {
  moleculeKey = [];

  for (i = 0; i < numRows; i++) {
    let tempArray = [];
    for (j = 0; j < numCols; j++) {
      tempArray.push([]);
    }
    moleculeKey.push(tempArray);
  }
  // console.log(moleculeKey);
}

function checkIntersections() {
  for (let i = 0; i < molecules.length; i++) {
    for (let j = i + 1; j < molecules.length; j++) {
      if (
        p5.Vector.sub(molecules[i].position, molecules[j].position).mag() <
        radius
      ) {
        checkIntersection++;
        molecules[i].molFill = true; // When intersect, fill in Object i
        molecules[j].molFill = true; // When intersect, fill in Object j
      }
    }
  }
  fill(47, 226, 255);
  textSize(11);
  text("Intersections: " + checkIntersection, 5, 25);
}

function displayGui() {
  let gui = new dat.GUI();
  gui.domElement.id = "gui";
  gui
    .add(guiObj, "numOfMolecules", 0, 1000)
    .onChange(() => generateMolecules())
    .step(1);
  gui.add(guiObj, "numCols", 1, 30).step(1);
  gui.add(guiObj, "numRows", 1, 30).step(1);
  gui.add(guiObj, "render");
  gui.add(guiObj, "grid");
  gui.add(guiObj, "intersect");
  gui.add(guiObj, "bruteChecks");
}

function generateMolecules() {
  molecules = [];
  for (let i = 0; i < guiObj.numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }
}

function bruteChecks() {
  for (let i = 0; i < molecules.length; i++) {
    for (let j = 0; j < molecules.length; j++) {
      if (p5.Vector.sub(molecules[i].position, molecules[j].position).mag() < radius) {
        checks++;
      }
    }
  }
  fill(47, 226, 255);
  textSize(11);
  text("Brute Checks: " + checks, 5, 36);
}