import { MazeW, MazeH, grid, speed, addGrid, Block} from '../MazeAlogrithm/Block';

const manhattanDistance = (node, goal) => {
    return Math.abs(node.row - goal.row) + Math.abs(node.column - goal.column);
};

export const AStar = async (setBlocks) => {

    let startNode = grid.find(block => block.isStart);
    let endNode = grid.find(block => block.isGoal);

    if (!startNode || !endNode) {
        console.error('Start or end node not set');
        return;
    }

    grid.forEach(block => {
        block.Colorvisited = true; 
    });

    startNode.g = 0;
    startNode.f = manhattanDistance(startNode, endNode);

    let openSet = [startNode];
    let closedSet = new Set();

    const animateMaze = async () => {
        while (openSet.length > 0) {
            // Sort the open set using min-heap
            openSet.sort((a, b) => a.f - b.f);
            let current = openSet.shift();


            if (current === endNode) {
                current.traversal = true;
                console.log('Path found!');
                reconstructPath(endNode);
                break;
            }

            current.visited = true;
            current.traversal = true;
            setBlocks([...transformGridTo2D(grid)]);

 
            closedSet.add(current);

            let neighbors = getValidNeighbors(current); 
            for (let neighbor of neighbors) {
                // put current to closedSet so that it not be visited again prevent loop 
                if (closedSet.has(neighbor)) continue;

                let tempG = current.g + 1; // Calculate the g value for the neighbor

                // If the new path to neighbor is shorter OR the neighbor is not in openSet
                if (tempG < neighbor.g || !openSet.includes(neighbor)) {
                    neighbor.previous = current;
                    neighbor.g = tempG;
                    neighbor.f = neighbor.g + manhattanDistance(neighbor, endNode);

                    // If neighbor is not in openSet, add it
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }

            current.traversal = true;
            setBlocks([...transformGridTo2D(grid)]);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    };


    const getValidNeighbors = (block) => {
        const validNeighbors = [];
        const directions = ['N', 'E', 'S', 'W'];
        const moveRow = [-1, 0, 1, 0];
        const moveCol = [0, 1, 0, -1];

        directions.forEach((dir, index) => {
            if (!block.wall[index]) {
                const newRow = block.row + moveRow[index]; 
                const newCol = block.column + moveCol[index];
                if (newRow >= 0 && newRow < MazeH && newCol >= 0 && newCol < MazeW) { 
                    validNeighbors.push(grid[newRow * MazeW + newCol]);
                }
            }
        });

        return validNeighbors;
    };

    const reconstructPath = async (endNode) => {
        let current = endNode;
        const pathBlocks = [];
      
        // Collect all blocks in the path
        while (current) {
          pathBlocks.push(current);
          current = current.previous;
        }
      
        // Apply the path class to each block with a delay
        for (let i = pathBlocks.length - 1; i >= 0; i--) {
          pathBlocks[i].path = true;
          setBlocks([...transformGridTo2D(grid)]);
          await new Promise(resolve => setTimeout(resolve, 100)); // Adjust the delay as needed
        }
      };
      

    const transformGridTo2D = (grid) => {
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

    // Initialize all blocks' g, f, and previous properties
    grid.forEach(block => {
        block.g = Infinity;
        block.f = Infinity;
        block.previous = null;
    });

    await animateMaze();
};
