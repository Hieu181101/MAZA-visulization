import { MazeW, MazeH, grid, addGrid, Block } from './Block.js';

export const BiTreeGen = async (setBlocks) => {
  // Ensure all blocks are reset to their initial state
  grid.forEach(block => {
    block.visited = false;
    block.inPath = false;
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
          current.inPath = true;
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
          current.inPath = false;
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
