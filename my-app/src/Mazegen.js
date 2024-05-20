import React, { useState, useEffect } from 'react';
import { MazeW, MazeH, grid, addGrid, block } from './Block.js';





//backtracing algorithm to break the wall and create a path
export function MazeGenerator(callback) {
  let stack = [];
  let current = grid[0]; //always start at 0,0 in the grid 

  current.visited = true;
  current.inPath = true;

  function step() {
    let neighbors = current.neighbors.filter(neighbor => !neighbor.visited);

    if (neighbors.length) {
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Remove walls between current and next
      let x = current.row - next.row;
      if (x === 1) { //moving top
        current.wall[0] = false;
        next.wall[2] = false;
      } else if (x === -1) { //moving bottom
        current.wall[2] = false;
        next.wall[0] = false;
      }
      let y = current.column - next.column;
      if (y === 1) {  //moving left
        current.wall[3] = false;
        next.wall[1] = false;
      } else if (y === -1) { //moving right
        current.wall[1] = false;
        next.wall[3] = false;
      }

      stack.push(current);
      current = next;
      current.visited = true;
      current.inPath = true; 
    } else {
      current.inPath = false;
      current = stack.pop();
    }

    const grid2D = [];
    for (let i = 0; i < MazeH; i++) {
      const row = [];
      for (let j = 0; j < MazeW; j++) {
        row.push(grid[i * MazeW + j]);
      }
      grid2D.push(row);
    }

    callback([...grid2D]);
    
    
    if (current){
      setTimeout(step, 50);
    }


  }
  step();
}

// Create the maze visualization
export const CreateMaze = (setBlocks) => {
  // Ensure all blocks are reset to their initial state
  grid.forEach(block => {
    block.visited = false;
    block.inPath = false;
    block.wall = [true, true, true, true];
  });

  addGrid();
  MazeGenerator(setBlocks); // Generate the maze with animation
}