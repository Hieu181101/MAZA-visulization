import React, { useState, useEffect } from 'react';
import './App.css';
import { CreateMaze } from './MazeAlogrithm/Mazegen';
import { BiTreeGen } from './MazeAlogrithm/binaryTree';
import { PrimGen } from './MazeAlogrithm/Prim';
import { KruskalGen } from './MazeAlogrithm/Kruskal';
import { MazeW, MazeH, grid, addGrid } from './MazeAlogrithm/Block';
import { BFS } from './SearchAlogrithm/BFS';
import { DFS } from './SearchAlogrithm/DFS';
import { Dijkstra } from './SearchAlogrithm/Dijkstra';
import { AStar } from './SearchAlogrithm/AStar';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    addGrid();
    resetBlocks();
    setBlocks([...transformGridTo2D(grid)]);
    setStarted(false);
  };

  const resetBlocks = () => {
    grid.forEach(block => {
      block.visited = false;
      block.traversal = false;
      block.path = false;
      block.distance = Infinity;
      block.previous = null;
      block.g = Infinity; 
      block.f = Infinity; 
    });
  };

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

  // Handle the search algorithms
  const handleStartBFS = async () => {
    setStarted(true);
    resetBlocks();
    await BFS(setBlocks);
    setStarted(false);
  };

  const handleStartDFS = async () => {
    setStarted(true);
    resetBlocks();
    await DFS(setBlocks);
    setStarted(false);
  };

  const handleStartDijkstra = async () => {
    setStarted(true);
    resetBlocks();
    await Dijkstra(setBlocks);
    setStarted(false);
  };

  const handleStartAStar = async () => {
    setStarted(true);
    resetBlocks();
    await AStar(setBlocks);
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
      case 'breadthFirstSearch':
        await handleStartBFS();
        break;
      case 'depthFirstSearch':
        await handleStartDFS();
        break;
      case 'dijkstra':
        await handleStartDijkstra();
        break;
      case 'aStar':
        await handleStartAStar();
        break;
      default:
        break;
    }
  };

  const handleBlockClick = (event, row, col) => {
    event.preventDefault();
    grid.forEach(block => {
      if (block.row === row && block.column === col) {
        if (event.button === 0) { // Left click
          if (block.isStart) {
            block.isStart = false;
          } else {
            block.isStart = true;
            block.isGoal = false;
          }
        } else if (event.button === 2) { // Right click
          if (block.isGoal) {
            block.isGoal = false;
          } else {
            block.isGoal = true;
            block.isStart = false;
          }
        }
      } else {
        if (event.button === 0) {
          block.isStart = false;
        } else if (event.button === 2) {
          block.isGoal = false;
        }
      }
    });
    setBlocks([...transformGridTo2D(grid)]);
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

  const resetMaze = () => {
    initializeGrid();
  };

  const resetSearch = () => {
    resetBlocks();
    setBlocks([...transformGridTo2D(grid)]);
  };

  return (
    <div className="App">
      <div className="Dropdown-container">
        <select 
          onChange={handleSelectionChange} 
          disabled={started}
        >
          <option value="">Select Maze Algorithm</option>
          <option value="backtracking">Recursive Backtracking</option>
          <option value="binaryTree">Binary Tree</option>
          <option value="prim">Prim</option>
          <option value="kruskal">Kruskal</option>
        </select>
        <button 
          onClick={resetMaze} 
          disabled={started}
        >
          Reset Maze
        </button>
      </div>

      <div className="Dropdown-container">
        <select 
          onChange={handleSelectionChange} 
          disabled={started}
        >
          <option value="">Select Search Algorithm</option>
          <option value="breadthFirstSearch">Breadth-First Search</option>
          <option value="depthFirstSearch">Depth-First Search</option>
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="aStar">A* Algorithm</option>
        </select>
        <button 
          onClick={resetSearch} 
          disabled={started}
        >
          Reset Search
        </button>
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
                onMouseDown={(e) => handleBlockClick(e, block.row, block.column)}
                onContextMenu={(e) => e.preventDefault()}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
