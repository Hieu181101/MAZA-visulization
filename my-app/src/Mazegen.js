//Mazie size
MazeW = 20;
MazeH = 20;


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


//create a maze that respresents the maze where all the blocks contain all walls 
const CreateMaze = () => {
    for (let i = 0; i < MazeH; i++) {
        let row = document.createElement('div');
        row.classList.add('row');  
        document.appendChild(row);
        for(let j = 0; j < MazeW; j++) {
            let collum = document.createElement('div');
            collum.classList.add('block');
            row.appendChild(block);
        }
    }
}