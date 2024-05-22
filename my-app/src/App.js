import React, { useState, useEffect } from 'react';
import './App.css';
import { CreateMaze } from './MazeAlogrithm/Mazegen';
import { BiTreeGen } from './MazeAlogrithm/binaryTree';
import { PrimGen } from './MazeAlogrithm/Prim';
import { KruskalGen } from './MazeAlogrithm/Kruskal';
import { MazeW, MazeH, grid, addGrid, setMazeWidth, setMazeHeight } from './MazeAlogrithm/Block';
import { BFS } from './SearchAlogrithm/BFS';
import { DFS } from './SearchAlogrithm/DFS';
import { Dijkstra } from './SearchAlogrithm/Dijkstra';
import { AStar } from './SearchAlogrithm/AStar';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [started, setStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

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

  const handleStartAlgorithm = async (algorithm) => {
    setStarted(true);
    resetBlocks();
    switch (algorithm) {
      case 'backtracking':
        await CreateMaze(setBlocks);
        break;
      case 'binaryTree':
        await BiTreeGen(setBlocks);
        break;
      case 'prim':
        await PrimGen(setBlocks);
        break;
      case 'kruskal':
        await KruskalGen(setBlocks);
        break;
      case 'breadthFirstSearch':
        await BFS(setBlocks);
        break;
      case 'depthFirstSearch':
        await DFS(setBlocks);
        break;
      case 'dijkstra':
        await Dijkstra(setBlocks);
        break;
      case 'aStar':
        await AStar(setBlocks);
        break;
      default:
        break;
    }
    setStarted(false);
  };

  const handleSelectionChange = async (event) => {
    const algorithm = event.target.value;
    setSelectedAlgorithm(algorithm);
    await handleStartAlgorithm(algorithm);
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

  // Handle setting the size of the maze
  const setSmallGrid = async () => {
    setMazeHeight(10);
    setMazeWidth(10);
    initializeGrid();
    if (selectedAlgorithm) await handleStartAlgorithm(selectedAlgorithm);
  };

  const setMediumGrid = async () => {
    setMazeHeight(17);
    setMazeWidth(20);
    initializeGrid();
    if (selectedAlgorithm) await handleStartAlgorithm(selectedAlgorithm);
  };

  const setLargeGrid = async () => {
    setMazeHeight(17);
    setMazeWidth(35);
    initializeGrid();
    if (selectedAlgorithm) await handleStartAlgorithm(selectedAlgorithm);
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">Select Maze Algorithm
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'backtracking' } })}>Recursive Backtracking</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'binaryTree' } })}>Binary Tree</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'prim' } })}>Prim</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'kruskal' } })}>Kruskal</button>
          </div>
        </div>
        <button onClick={resetMaze} disabled={started}>
          Reset Maze
        </button>


        <div className="dropdown">
          <button className="dropbtn">Select Search
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'breadthFirstSearch' } })}>breadthFirstSearch</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'depthFirstSearch' } })}>depthFirstSearch</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'dijkstra' } })}>dijkstra</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'aStar' } })}>aStar</button>
          </div>
        </div>
        <button onClick={resetSearch} disabled={started}>
          Reset Search
        </button>
      </div>



      <div className="size-buttons">
        <button onClick={setSmallGrid} disabled={started}>
          Small Grid
        </button>
        <button onClick={setMediumGrid} disabled={started}>
          Medium Grid
        </button>
        <button onClick={setLargeGrid} disabled={started}>
          Large Grid
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
