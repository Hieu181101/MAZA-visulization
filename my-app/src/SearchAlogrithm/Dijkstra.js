import { MazeW, MazeH, grid, speed, addGrid, Block} from '../MazeAlogrithm/Block';

export const Dijkstra = async (setBlocks) => {
    let startNode = grid.find(block => block.isStart);
    let endNode = grid.find(block => block.isGoal);

    if (!startNode || !endNode) {
        console.error('Start or end node not set');
        return;
      }

    startNode.distance = 0;
    let unvisited = [...grid];



    const animateMaze = async () => {
        while(unvisited.length > 0){
            unvisited.sort((a, b) => a.distance - b.distance); //sort the array using min-heap
            let current = unvisited.shift(); //pop the current node

            if (current.distance === Infinity) {
                break;
              }

              if (current === endNode){
                console.log('Path found!');
                reconstructPath(endNode);
                break;
            }
            
            current.visited = true;
            current.traversal = true;
            setBlocks([...transformGridTo2D(grid)]);



            let neighbors = getValidNeighbors(current);  //get the neighbors of the current node
            for (let neighbor of neighbors){
                if(!neighbor.visited){
                    let distance = current.distance + 1; //update the distance of the neighbor
                    if(distance < neighbor.distance){
                        neighbor.distance = distance;
                        neighbor.previous = current;
                        unvisited.push(neighbor);
                    }
                }
                
            }
            current.traversal = true;
            //current.visited = true;
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

    const reconstructPath = (endNode) => {
        let current = endNode;
        while (current) {
          current.path = true; // Mark the block as part of the path
          setBlocks([...transformGridTo2D(grid)]);
          current = current.previous;
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
};