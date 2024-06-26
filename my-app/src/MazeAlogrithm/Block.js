// Block.js
import { GiStarFlag } from "react-icons/gi";
import { FaFlagCheckered } from "react-icons/fa";

//default is large
export let MazeW = 35;
export let MazeH = 15;
export let grid = [];
export let speed = 50;

export const setMazeWidth = (width) => {
  MazeW = width;
};

export const setMazeHeight = (height) => {
  MazeH = height;
};

export const setSpeed  = (newspeed) => {
  speed = newspeed;
};

// Create a Block class that represents a block in the maze
export class Block {
  constructor(x, y) {
    this.row = x;
    this.column = y;
    this.wall = [true, true, true, true];
    this.visited = false;
    this.inFronter = false;
    this.index = false; // Index for the current block use for maze creation
    this.traversal = false; // Index for the current block use for traversal
    this.path = false; //final path for search algorthim 
    this.isStart = false; // Start point
    this.isGoal = false;  // Goal point
    this.distance = Infinity; // For Dijkstra's algorithm
    this.g = Infinity; // For A* algorithm
    this.f = Infinity; // For A* algorithm
    this.previous = null;
    this.neighbors = [];
    this.Colorvisited = false;
  }

  findNeighbors() {
    if (this.row > 0) this.neighbors.push(grid[(this.row - 1) * MazeW + this.column]); // top neighbor
    if (this.column > 0) this.neighbors.push(grid[this.row * MazeW + (this.column - 1)]); // left neighbor
    if (this.row < MazeH - 1) this.neighbors.push(grid[(this.row + 1) * MazeW + this.column]); // bottom neighbor
    if (this.column < MazeW - 1) this.neighbors.push(grid[this.row * MazeW + (this.column + 1)]); // right neighbor
  }

  show() {
    const style = {
      width: '30px',
      height: '30px',
      borderTop: this.wall[0] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderRight: this.wall[1] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderBottom: this.wall[2] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderLeft: this.wall[3] ? '3px solid rgb(0, 45, 114)' : 'none',
      backgroundColor: this.path ? 'purple' : this.traversal ? 'yellow' : this.index ? 'Blue' : (this.inFronter ? 'yellow' : (this.Colorvisited ? 'white' : 'grey')),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      boxSizing: 'border-box',
      cursor: 'pointer' 
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

// Initialize the grid and create the maze
export function addGrid() {
  const startBlock = grid.find(block => block.isStart);
  const goalBlock = grid.find(block => block.isGoal);
  
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

  if (startBlock) {
    grid[startBlock.row * MazeW + startBlock.column].isStart = true;
  }
  if (goalBlock) {
    grid[goalBlock.row * MazeW + goalBlock.column].isGoal = true;
  }
}
