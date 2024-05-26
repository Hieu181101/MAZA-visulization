import { MazeW, MazeH, grid, speed, addGrid, Block} from '../MazeAlogrithm/Block';

export const DFS = async (setBlocks) => {


    let startNode = grid.find(block => block.isStart);
    let endNode = grid.find(block => block.isGoal);

    if(!startNode || !endNode) {
        console.error('Start or end node not set');
        return;
    }

    grid.forEach(block => {
        block.Colorvisited = true; 
    });


    let stack = [startNode];
    let visited = new Set();
    let parentMap = new Map();

    visited.add(startNode);

    const animateMaze = async () => {
        while (stack.length > 0){
            let current = stack.pop();
            current.traversal = true;
            setBlocks([...transformGridTo2D(grid)]);

            if (current === endNode){
                console.log('Path found!');
                reconstructPath(endNode, parentMap);
                break;
            }

            let neighbors = getValidNeighbors(current);

            let next = neighbors[Math.floor(Math.random() * neighbors.length)];

            for (let neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                    parentMap.set(neighbor, current);
                }
            }
            current.traversal = true;
            setBlocks([...transformGridTo2D(grid)]);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    };






    const getValidNeighbors = (block) => {
        const ValidNeighbors = [];
        const directions = ['N', 'E', 'S', 'W'];
        const Moverow = [-1, 0, 1, 0];
        const Movecol = [0, 1, 0, -1];


        directions.forEach((dir, index) => {
            if (!block.wall[index]) {
                const newRow = block.row + Moverow[index];   //get the neighbor row and column
                const newCol = block.column + Movecol[index]; 
                if (newRow >= 0 && newRow < MazeH && newCol >= 0 && newCol < MazeW) { //chck if the new row and column are within the grid
                    ValidNeighbors.push(grid[newRow * MazeW + newCol]);
                }
            }
        });

        return ValidNeighbors;


    };

    const reconstructPath = async (endNode, parentMap) => {
        let current = endNode;
        const pathBlocks = [];
      
        // Collect all blocks in the path using the parent map
        while (current) {
          pathBlocks.push(current);
          current = parentMap.get(current);
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

    await animateMaze();
}