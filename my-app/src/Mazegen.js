// Maze size
export let MazeW = 10;
export let MazeH = 10;
export let grid = [];

// Create a block class that would represent a block in the maze
class block {
  constructor(x, y) {
    this.row = x;
    this.column = y;
    this.wall = [true, true, true, true];
    this.visited = false;
    this.neighbors = [];
  }

  findNeighbors() {
    if (this.row > 0) this.neighbors.push(grid[(this.row - 1) * MazeW + this.column]); // left neighbor
    if (this.column > 0) this.neighbors.push(grid[this.row * MazeW + (this.column - 1)]); // top neighbor
    if (this.row < MazeH - 1) this.neighbors.push(grid[(this.row + 1) * MazeW + this.column]); // bottom neighbor
    if (this.column < MazeW - 1) this.neighbors.push(grid[this.row * MazeW + (this.column + 1)]); // right neighbor
  }

  show() {
    const style = {
      width: '35px',
      height: '35px',
      borderTop: this.wall[0] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderRight: this.wall[1] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderBottom: this.wall[2] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderLeft: this.wall[3] ? '3px solid rgb(0, 45, 114)' : 'none',
      backgroundColor: this.visited ? 'red' : 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    };
    return style;
  }
}



// Now we add the grid to the Maze
export function addGrid() {
  for (let i = 0; i < MazeH; i++) {
    for (let j = 0; j < MazeW; j++) {
      grid.push(new block(i, j));
    }
  }

  for (let i = 0; i < MazeH; i++) {
    for (let j = 0; j < MazeW; j++) {
      grid[i * MazeW + j].findNeighbors();
    }
  }
}

//backtracing algorithm to break the wall and create a path
export function MazeGenerator() {
  let stack = [];
  let current = grid[0];

  current.visited = true;

  while (current) {
    let neighbors = current.neighbors.filter(neighbor => !neighbor.visited);

    if (neighbors.length) {
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Remove walls between current and next
      let x = current.row - next.row;
      if (x === 1) {
        current.wall[0] = false;
        next.wall[2] = false;
      } else if (x === -1) {
        current.wall[2] = false;
        next.wall[0] = false;
      }
      let y = current.column - next.column;
      if (y === 1) {
        current.wall[3] = false;
        next.wall[1] = false;
      } else if (y === -1) {
        current.wall[1] = false;
        next.wall[3] = false;
      }

      stack.push(current);
      current = next;
      current.visited = true;
    } else {
      current = stack.pop();
    }
  }
}

// Create the maze visualization
export const CreateMaze = () => {
  addGrid();
  MazeGenerator(); // Generate the maze

  const maze = [];
  for (let i = 0; i < MazeH; i++) {
    const row = [];
    for (let j = 0; j < MazeW; j++) {
      row.push(
        <div key={`${i}-${j}`} className="block" style={grid[i * MazeW + j].show()}></div>
      );
    }
    maze.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }
  return maze;
}