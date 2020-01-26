//Initialise variables
var minRadius = 5;
var maxRadius = 20;
let radius = minRadius + maxRadius;
let molecules = [];
var numOfMolecules = 400;
var numRows = 8; // Default for GUI
var numCols = 16; // Default for GUI
let rowWidth;
let rowHeight;
let moleculeKey = [];
let checkIntersection;

let guiVars = {
    numOfMolecules: 300,
    numRows: 4,
    numCols: 8,
    radiusBaseline:5,
    showGrid:true,
    render:true,
    step:true,
    checkEdges:true,
    showTrails:false
};

//P5 Setup
function setup() {
  //Setup canvas
 createCanvas(windowWidth, windowHeight);
//   createCanvas(600, 600);
  background(0);

  //Generate Molecules
//   for (let i = 0; i < numOfMolecules; i++) {
//     molecules.push(new Molecule(i));
//   }
generateMolecules();


  //*Add GUI*
  addGui();

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
//   renderGrid();

  //Framerate display
  fill(47, 226, 255);
  textSize(11);
  text("FPS: " + frameRate().toFixed(0), 5, 14);

  if(guiVars.render)renderGrid();
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

  function addGui(){
    let gui = new dat.GUI();
    gui.domElement.id = 'gui';
    gui.add(guiVars, 'numOfMolecules', 0, 1000).onChange(() => generateMolecules()).step(1);//-Regenerates the molecules when changed
    gui.add(guiVars, 'radiusBaseline', 0, 100).step(1);
    gui.add(guiVars, 'numRows', 1, 30).step(1);
    gui.add(guiVars, 'numCols', 1, 30).step(1);
    gui.add(guiVars, 'showGrid');
    gui.add(guiVars, 'render');
    gui.add(guiVars, 'step');
    gui.add(guiVars, 'checkEdges');
    gui.add(guiVars, 'showTrails');
}

function generateMolecules(){
    molecules = [];
    for (let i = 0; i < guiVars.numOfMolecules; i++) {
            molecules.push(new Molecule(i));
        }
}