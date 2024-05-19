import React, { useState, useEffect } from 'react';
import { grid, MazeW, MazeH } from './Mazegen';

export function MazeGenerator() {
  const [current, setCurrent] = useState(null);
  const [stack, setStack] = useState([]);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Initialize current and blocks here
    const initialCurrent = grid[0];
    const initialBlocks = grid;
    setCurrent(initialCurrent);
    setBlocks(initialBlocks);
  }, []);

  useEffect(() => {
    if (current) {
      const newBlocks = [...blocks];
      const currentBlock = newBlocks[current.row * MazeW + current.column];
      currentBlock.visited = true;
      setStack(prevStack => [...prevStack, current]);
  
      let unvisited = [];
      for (let neighbor of currentBlock.neighbors) {
        if (!neighbor.visited) {
          unvisited.push(neighbor);
        }
      }
  
      if (unvisited.length > 0) {
        let random = Math.floor(Math.random() * unvisited.length);
        let next = unvisited[random];
  
        let x = currentBlock.row - next.row;
        if (x === 1) {
          currentBlock.wall[0] = false;
          next.wall[2] = false;
        } else if (x === -1) {
          currentBlock.wall[2] = false;
          next.wall[0] = false;
        }
        let y = currentBlock.column - next.column;
        if (y === 1) {
          currentBlock.wall[3] = false;
          next.wall[1] = false;
        } else if (y === -1) {
          currentBlock.wall[1] = false;
          next.wall[3] = false;
        }
  
        setCurrent(next);
      } else if (stack.length > 0) {
        setCurrent(stack.pop());
      }
  
      setBlocks(newBlocks);
    }
  }, [current, blocks, stack]);

  return (
    <div className="maze">
      {blocks.map((block, i) => (
        <div key={i} className="block" style={block.show()}></div>
      ))}
    </div>
  );
}

export default MazeGenerator;