//Mazie size
let MazeW = 10;
let MazeH = 10;
let grid = [];


//Create a block class that would resprent a block in the maze
class block {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wall = [true, true, true, true];
    this.visited = false;
    this.neightbors = [];
    }
}


//create a maze function that respresents the maze 
export const CreateMaze = () => {
    const maze = [];
    for (let i = 0; i < MazeH; i++) {
        const row = [];
        for(let j = 0; j < MazeW; j++) {
            row.push(<div className="block" />);
        }
        maze.push(<div className="row">{row}</div>);
    }
    return maze;
}

//Now we add the grid to the Maze
export function addGrid() {
    for (let i = 0; i < MazeH; i++) {
        for (let j = 0; j < MazeW; j++) {
            grid.push(new block(i, j));
        }
    }
}


CreateMaze();
addGrid();
