import { MazeW, MazeH, grid} from './Block.js';

class Block {
  constructor(x, y) {
    this.row = x;
    this.column = y;
    this.wall = [true, true, true, true];
    this.visited = false;
    this.inFronter = false;
    this.index = false; // for current block
    this.neighbors = [];
  }

  findNeighbors() {
    if (this.row > 0) this.neighbors.push(grid[(this.row - 1) * MazeW + this.column]); // top neighbor
    if (this.column > 0) this.neighbors.push(grid[this.row * MazeW + (this.column - 1)]); // left neighbor
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
      backgroundColor: this.visited ? 'white' : 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      boxSizing: 'border-box'
    };
    return style;
  }

  removeWall(direction) {
    switch (direction) {
      case 'N':
        this.wall[0] = false;
        break;
      case 'E':
        this.wall[1] = false;
        break;
      case 'S':
        this.wall[2] = false;
        break;
      case 'W':
        this.wall[3] = false;
        break;
      default:
        break;
    }
  }
}

function addGrid() {
  grid.length = 0; // Reset the grid
  for (let i = 0; i < MazeH; i++) {
    for (let j = 0; j < MazeW; j++) {
      grid.push(new Block(i, j));
    }
  }

  for (let i = 0; i < MazeH; i++) {
    for (let j = 0; j < MazeW; j++) {
      grid[i * MazeW + j].findNeighbors();
    }
  }
}


export const BiTreeGen = async (setBlocks) => {
  // Ensure all blocks are reset to their initial state
  grid.forEach(block => {
    block.visited = false;
    block.index = false;
    block.inFronter = false;
    block.wall = [true, true, true, true];
  });

  addGrid();

  const animateMaze = async () => {
    for (let row = 0; row < MazeH; row++) {
      for (let col = 0; col < MazeW; col++) {
        let current = grid[row * MazeW + col];
        let neighbors = [];

        if (row > 0) neighbors.push({ direction: 'N', block: grid[(row - 1) * MazeW + col] }); // North
        if (col < MazeW - 1) neighbors.push({ direction: 'E', block: grid[row * MazeW + (col + 1)] }); // East

        if (neighbors.length > 0) {
          const { direction, block } = neighbors[Math.floor(Math.random() * neighbors.length)];
          current.removeWall(direction);
          setBlocks([...transformGridTo2D()]);

          switch (direction) {
            case 'N':
              block.removeWall('S');
              break;
            case 'E':
              block.removeWall('W');
              break;
          }

          block.visited = true;
          setBlocks([...transformGridTo2D()]);

          // Delay for animation
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
    setBlocks([...transformGridTo2D()]);
  };

  const transformGridTo2D = () => {
    const grid2D = [];
    for (let i = 0; i < MazeH; i++) {
      const row = [];
      for (let j = 0; j < MazeW; j++) {
        row.push(grid[i * MazeW + j]);
      }
      grid2D.push(row);
    }
    return grid2D;
  };

  await animateMaze();
};
