import { MazeW, MazeH, grid, addGrid, Block } from './Block.js';

export const PrimGen = async (setBlocks) => {
  // Ensure all blocks are reset to their initial state
  grid.forEach(block => {
    block.visited = false;
    block.index = false; 
    block.inFronter = false;
    block.wall = [true, true, true, true];
  });

  addGrid();

  let fronter = [];
  let inMaze = [];
  let currentIndex = Math.floor(Math.random() * MazeW * MazeH);
  let current = grid[currentIndex];

  current.visited = true;
  current.index = true; // Set the current block
  inMaze.push(current);

  const addFronter = (block) => {
    block.neighbors.forEach(neighbor => {
      if (!neighbor.visited && !fronter.includes(neighbor)) {
        fronter.push(neighbor);
        neighbor.inFronter = true;
      }
    });
  };

  addFronter(current);

  const animateMaze = async () => {
    while (fronter.length > 0) {
      let nextIndex = Math.floor(Math.random() * fronter.length);
      let next = fronter[nextIndex];
      const visitedNeighbors = next.neighbors.filter(n => n.visited);
      let neighbor = visitedNeighbors[Math.floor(Math.random() * visitedNeighbors.length)];


      //set the indicator for the current block
      current.index = false; 
      next.index = true; 
      current = next; 

      let x = next.row - neighbor.row;
      if (x === 1) { // moving top
        next.wall[0] = false;
        neighbor.wall[2] = false;
      } else if (x === -1) { // moving bottom
        next.wall[2] = false;
        neighbor.wall[0] = false;
      }
      let y = next.column - neighbor.column;
      if (y === 1) { // moving left
        next.wall[3] = false;
        neighbor.wall[1] = false;
      } else if (y === -1) { // moving right
        next.wall[1] = false;
        neighbor.wall[3] = false;
      }

      next.visited = true;
      next.inFronter = false;
      inMaze.push(next);
      fronter = fronter.filter(block => block !== next); // Remove next from fronter

      addFronter(next);
      setBlocks([...transformGridTo2D()]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    current.index = false;
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
