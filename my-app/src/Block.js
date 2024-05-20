import React, { useState, useEffect } from 'react';

// Maze size
export let MazeW = 30;
export let MazeH = 10;
export let grid = [];



// Create a block class that would represent a block in the maze
export class block {
  constructor(x, y) {
    this.row = x;
    this.column = y;
    this.wall = [true, true, true, true];
    this.visited = false;
    this.inPath = false;

    this.neighbors = [];
  }

  findNeighbors() {
    if (this.row > 0) this.neighbors.push(grid[(this.row - 1) * MazeW + this.column]); // left neighbor
    if (this.column > 0) this.neighbors.push(grid[this.row * MazeW + (this.column - 1)]); // top neighbor
    if (this.row < MazeH - 1) this.neighbors.push(grid[(this.row + 1) * MazeW + this.column]); // bottom neighbor
    if (this.column < MazeW - 1) this.neighbors.push(grid[this.row * MazeW + (this.column + 1)]); // right neighbor
  }

  show() {
    const style = {
      width: '35px',
      height: '35px',
      borderTop: this.wall[0] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderRight: this.wall[1] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderBottom: this.wall[2] ? '3px solid rgb(0, 45, 114)' : 'none',
      borderLeft: this.wall[3] ? '3px solid rgb(0, 45, 114)' : 'none',
      backgroundColor: this.inPath ? '#5564eb' : (this.visited ? 'white' : 'white'),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      boxSizing: 'border-box'
    };
    return style;
  }


  removeWall(direction){
    switch(direction){
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
    }
  }

    

}



// Now we add the grid to the Maze
export function addGrid() {
  grid.length = 0;
  for (let i = 0; i < MazeH; i++) {
    for (let j = 0; j < MazeW; j++) {
      grid.push(new block(i, j));
    }
  }

  for (let i = 0; i < MazeH; i++) {
    for (let j = 0; j < MazeW; j++) {
      grid[i * MazeW + j].findNeighbors();
    }
  }
}