import { MazeW, MazeH, grid, speed, addGrid, Block} from './Block.js';

// Backtracking algorithm to break the wall and create a path
export async function MazeGenerator(setBlocks) {
  let stack = [];
  let current = grid[0]; // Always start at 0,0 in the grid 

  current.visited = true;

  const step = async () => {
    let neighbors = current.neighbors.filter(neighbor => !neighbor.visited);

    if (neighbors.length) {
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];

      current.index = false; 
      next.index = true; 

      // Remove walls between current and next
      let x = current.row - next.row;
      if (x === 1) { // moving top
        current.wall[0] = false;
        next.wall[2] = false;
      } else if (x === -1) { // moving bottom
        current.wall[2] = false;
        next.wall[0] = false;
      }
      let y = current.column - next.column;
      if (y === 1) {  // moving left
        current.wall[3] = false;
        next.wall[1] = false;
      } else if (y === -1) { // moving right
        current.wall[1] = false;
        next.wall[3] = false;
      }

      stack.push(current);
      current = next;
      current.visited = true;
    } else {
      current.index = false;
      if (stack.length > 0) {
        current = stack.pop();
        current.index = true;
      } else {
        current = null;
      }
    }

    const grid2D = [];
    for (let i = 0; i < MazeH; i++) {
      const row = [];
      for (let j = 0; j < MazeW; j++) {
        row.push(grid[i * MazeW + j]);
      }
      grid2D.push(row);
    }

    setBlocks([...grid2D]);
    
    if (current) {
      await new Promise(resolve => setTimeout(resolve, speed));
      await step();
    }
  };

  await step();
}

// Create the maze visualization
export const CreateMaze = async (setBlocks) => {
  // Ensure all blocks are reset to their initial state
  grid.forEach(block => {
    block.visited = false;
    block.index = false;
    block.wall = [true, true, true, true];
  });

  addGrid();
  await MazeGenerator(setBlocks); // Generate the maze with animation
}
