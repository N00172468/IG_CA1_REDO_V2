let molecules = []; // Object Array
let minRadius = 10, maxRadius = 20, radius = minRadius + maxRadius; // Radius Variables
let numRows = 5, numCols = 10, colWidth, rowHeight; // Grid Variables
let moleculeKey = []; // 3D Array

// Variables for GUI:
var guiObj = {
  numOfMolecules: 100,
  render: true,
  grid: true,
  intersect: true,
  bruteChecks: false
};

// *** GUI *** //
function displayGui() {
    let gui = new dat.GUI();
    gui.domElement.id = "gui";
    gui
      .add(guiObj, "numOfMolecules", 0, 1000)
      .onChange(() => generateMolecules())
      .step(1);
    gui.add(guiObj, "render");
    gui.add(guiObj, "grid");
    gui.add(guiObj, "intersect");
    gui.add(guiObj, "bruteChecks");
  }

// *** RENDER OBJECTS *** // 
function renderGrid() {
  molecules.forEach(molecule => {
    molecule.render();
    molecule.step();
    molecule.checkEdges();
  });
}

// *** GENERATE OBJECT ARRAY *** //
function generateMolecules() {
    molecules = [];
    for (let i = 0; i < guiObj.numOfMolecules; i++) {
      molecules.push(new Molecule(i));
    }
  }

// *** INITIATE OBJECT INTERSECTION W/ STATS *** //
function checkIntersections() {
  checkIntersection = 0;

  for (let i = 0; i < molecules.length; i++) {
    for (let j = i + 1; j < molecules.length; j++) {
      if (
        p5.Vector.sub(
          molecules[i].position, 
          molecules[j].position
          ).mag() < radius
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

// *** DRAW GRID *** //
function drawGrid() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      noFill();
      stroke(60, 60, 60);
      rect(x * colWidth, y * rowHeight, colWidth, rowHeight);
    }
  }
}

// *** FIND OUT WHERE EACH OBJ ARE WITHIN EACH GRID CELL *** //
function splitIntoGrids() {
  create3Darray();

  molecules.forEach(molecule => {
    const currentRow = Math.floor(molecule.position.x / colWidth);
    const currentCol = Math.floor(molecule.position.y / rowHeight);
    moleculeKey[currentCol][currentRow].push(molecule.moleculeId);
  });
}

// *** CREATE 3D ARRAY *** //
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

// *** INITIATE BRUTE FORCE CHECKING (OFF BY DEFAULT) *** //
function bruteChecks() {
  checks = 0;

  for (let i = 0; i < molecules.length; i++) {
    for (let j = 0; j < molecules.length; j++) {
      if (
        p5.Vector.sub(
          molecules[i].position, 
          molecules[j].position
          ).mag() < radius
      ) {
        checks++;
      }
    }
  }
  fill(47, 226, 255);
  textSize(11);
  text("Brute Checks: " + checks, 5, 36);
}