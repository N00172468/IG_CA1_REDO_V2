//Initialise variables
var minRadius = 15;
var maxRadius = 30;
let radius = minRadius + maxRadius;
let molecules = [];
var numOfMolecules = 400;
var numRows = 3; // Default for GUI
var numCols = 3; // Default for GUI
let rowWidth;
let rowHeight;
let moleculeKey = [];
let checkIntersection;
let molFill = false;

//P5 Setup
function setup() {
  //Setup canvas
 createCanvas(windowWidth, windowHeight);
//   createCanvas(600, 600);
  background(0);

  //Generate Molecules
  for (let i = 0; i < numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }

  //*Add GUI*

//   noLoop();
}

//P5 Draw
function draw() {
  //Reset canvas
  background(0);

  //Maths
  colWidth = width / numCols;
  rowHeight = height / numRows;
  //Draw background grid - drawGrid()
  drawGrid();

  //Split each molecule into its cell - splitIntoGrids()
  splitIntoGrids();

  //Check intersections based on cell - checkIntersections()
checkIntersections();

  //Render every molecule and update - renderGrid()
  renderGrid();

  //Framerate display
  fill(47, 226, 255);
  textSize(11);
  text("FPS: " + frameRate().toFixed(0), 5, 14);
}

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
  //Shitty?
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
          if (p5.Vector.sub(molecules[i].position, molecules[j].position).mag() < radius) {
            checkIntersection++;
          molecules[i].molFill = true; // When intersect, fill in Object i
          molecules[j].molFill = true; // When intersect, fill in Object j
        }
      }
    }
  }