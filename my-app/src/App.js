import React, { useState, useEffect } from 'react';
import './App.css';
import { CreateMaze } from './MazeAlogrithm/Mazegen';
import { BiTreeGen } from './MazeAlogrithm/binaryTree';
import { PrimGen } from './MazeAlogrithm/Prim';
import { KruskalGen } from './MazeAlogrithm/Kruskal';
import { MazeW, MazeH, grid, addGrid, Block  } from './MazeAlogrithm/Block';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [started, setStarted] = useState(false);
  const [settingStart, setSettingStart] = useState(true);

  useEffect(() => {
    addGrid();
    setBlocks([...transformGridTo2D(grid)]);
  }, []);

  const handleStartBacktracking = async () => {
    setStarted(true);
    await CreateMaze(setBlocks); 
    setStarted(false);
  };

  const handleStartBinaryTree = async () => {
    setStarted(true);
    await BiTreeGen(setBlocks);
    setStarted(false);
  };

  const handleStartPrim = async () => {
    setStarted(true);
    await PrimGen(setBlocks);
    setStarted(false);
  };

  const handleStartKruskal = async () => {
    setStarted(true);
    await KruskalGen(setBlocks);
    setStarted(false);
  };

  const handleSelectionChange = async (event) => {
    const algorithm = event.target.value;
    switch (algorithm) {
      case 'backtracking':
        await handleStartBacktracking();
        break;
      case 'binaryTree':
        await handleStartBinaryTree();
        break;
      case 'prim':
        await handleStartPrim();
        break;
      case 'kruskal':
        await handleStartKruskal();
        break;
      default:
        break;
    }
  };

  const handleBlockClick = (row, col) => {
    grid.forEach(block => {
      if (block.row === row && block.column === col) {
        if (settingStart) {
          block.isStart = true;
          block.isGoal = false;
        } else {
          block.isStart = false;
          block.isGoal = true;
        }
      } else {
        if (settingStart) {
          block.isStart = false;
        } else {
          block.isGoal = false;
        }
      }
    });
    setBlocks([...transformGridTo2D(grid)]);
    setSettingStart(!settingStart);
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

  return (
    <div className="App">
      <div className="Dropdown-container">
        <select 
          onChange={handleSelectionChange} 
          disabled={started}
        >
          <option value="">Select Algorithm</option>
          <option value="backtracking">Recursive Backtracking</option>
          <option value="binaryTree">Binary Tree</option>
          <option value="prim">Prim</option>
          <option value="kruskal">Kruskal</option>
        </select>
      </div>

      <h1>Maze Generator</h1>
      
      <div className="maze-container">
        {Array.isArray(blocks) && blocks.map((row, i) => (
          <div key={i} className="row">
            {row.map((block, j) => (
              <div 
                key={j} 
                className={`block ${block.isStart ? 'start' : ''} ${block.isGoal ? 'goal' : ''}`} 
                style={block.show()} 
                onClick={() => handleBlockClick(block.row, block.column)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
