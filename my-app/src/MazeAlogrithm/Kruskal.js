import { MazeW, MazeH, grid, addGrid, Block } from './Block.js';


export const KruskalGen = async (setBlocks) => {
    /*1. Throw all of the edges in the graph into a big burlap sack. (Or, you know, a set or something.)
    2. Pull out the edge with the lowest weight. If the edge connects two disjoint trees, join the trees. Otherwise, throw that edge away.
    3. Repeat until there are no more edges left.*/


    // Ensure all blocks are reset to their initial state
  grid.forEach(block => {
    block.visited = false;
    block.index = false; 
    block.wall = [true, true, true, true];
  });

  addGrid();

    let edges = [];
    let sets = new Map();
    grid.forEach(block => sets.set(block, new Set([block])));

    const addEdges = (block) => {
        block.neighbors.forEach(neighbor => {
            if (!edges.some(e => (e[0] === block && e[1] === neighbor) || (e[0] === neighbor && e[1] === block))) {
                edges.push([block, neighbor]);
            }
        });
    };

    grid.forEach(addEdges);

    const animateMaze = async () => {
        while (edges.length > 0){
            let edgeIndex = Math.floor(Math.random() * edges.length);
            let edge = edges[edgeIndex];


            let [block1, block2] = edge;
            let set1 = sets.get(block1);
            let set2 = sets.get(block2);

            if (set1 !== set2){
                block1.index = true;
                block2.index = true;
                block1.visited = true;
                block2.visited = true;

                let x = block1.row - block2.row;
                if (x === 1) { // moving top
                    block1.wall[0] = false;
                    block2.wall[2] = false;
                } else if (x === -1) { // moving bottom
                    block1.wall[2] = false;
                    block2.wall[0] = false;
                }
                let y = block1.column - block2.column;
                if (y === 1) { // moving left
                    block1.wall[3] = false;
                    block2.wall[1] = false;
                } else if (y === -1) { // moving right
                    block1.wall[1] = false;
                    block2.wall[3] = false;
                }

                // Merge sets
                set1.forEach(block => {
                    set2.add(block);
                    sets.set(block, set2);
                });


                setBlocks([...transformGridTo2D()]);
                await new Promise(resolve => setTimeout(resolve, 50))
                
            }
            block1.index = false;
            block2.index = false;
            edges = edges.filter(e => e !== edge);
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
























