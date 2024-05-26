import React, { useState, useEffect } from 'react';
import './App.css';
import { CreateMaze } from './MazeAlogrithm/Mazegen';
import { BiTreeGen } from './MazeAlogrithm/binaryTree';
import { PrimGen } from './MazeAlogrithm/Prim';
import { KruskalGen } from './MazeAlogrithm/Kruskal';
import { MazeW, MazeH, speed, setSpeed, grid, addGrid, setMazeWidth, setMazeHeight } from './MazeAlogrithm/Block';
import { BFS } from './SearchAlogrithm/BFS';
import { DFS } from './SearchAlogrithm/DFS';
import { Dijkstra } from './SearchAlogrithm/Dijkstra';
import { AStar } from './SearchAlogrithm/AStar';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaFlagCheckered } from "react-icons/fa";
import { GiStarFlag } from "react-icons/gi";
import { PiMouseLeftClickFill } from "react-icons/pi";
import { PiMouseRightClickFill } from "react-icons/pi";
import { FaLinkedin, FaGithub } from 'react-icons/fa';


function App() {
  const [blocks, setBlocks] = useState([]);
  const [started, setStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState('Normal'); 
  const [currentSize, setCurrentSize] = useState('Large');
  const [mazeGenerated, setMazeGenerated] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    addGrid();
    resetBlocks();
    setBlocks([...transformGridTo2D(grid)]);
    setStarted(false);
    setMazeGenerated(false);
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
        setMazeGenerated(true); 
        break;
      case 'binaryTree':
        await BiTreeGen(setBlocks);
        setMazeGenerated(true); 
        break;
      case 'prim':
        await PrimGen(setBlocks);
        setMazeGenerated(true); 
        break;
      case 'kruskal':
        await KruskalGen(setBlocks);
        setMazeGenerated(true); 
        break;
      case 'BreadthFirstSearch':
        if (mazeGenerated) {
          grid.forEach(block => block.visited = true);
          await BFS(setBlocks);
        } else {
          alert('Please generate a maze first!');
        }
        break;
      case 'DepthFirstSearch':
        if (mazeGenerated) {
          grid.forEach(block => block.visited = true);
          await DFS(setBlocks);
        } else {
          alert('Please generate a maze first!');
        }
        break;
      case 'Dijkstra':
        if (mazeGenerated) {
          await Dijkstra(setBlocks);
        } else {
          alert('Please generate a maze first!');
        }
        break;
      case 'A*':
        if (mazeGenerated) {
          grid.forEach(block => block.visited = true);
          await AStar(setBlocks);
        } else {
          alert('Please generate a maze first!');
        }
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
    grid.forEach(block => {
      block.visited = true;
    });
    setBlocks([...transformGridTo2D(grid)]);
  };

  // Handle setting the size of the maze
  const setSmallGrid = async () => {
    setMazeHeight(10);
    setMazeWidth(10);
    setCurrentSize('Small');
    initializeGrid();
  };

  const setMediumGrid = async () => {
    setMazeHeight(15);
    setMazeWidth(20);
    setCurrentSize('Medium');
    initializeGrid();
  };

  const setLargeGrid = async () => {
    setMazeHeight(15);
    setMazeWidth(35);
    setCurrentSize('Large');
    initializeGrid();
  };

  //handle the animation of the maze
  const setAnimationSlow = async() => {
    setSpeed(100);
    setCurrentSpeed('Slow');
  };

  const setAnimationNormal = async() => {
    setSpeed(50);
    setCurrentSpeed('Normal');
  };

  const setAnimationFast = async() => {
    setSpeed(15);
    setCurrentSpeed('Fast');
  };
    

  return (
    <div className="App">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">Select Maze Algorithm <IoMdArrowDropdown />

          
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content"> 
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'backtracking' } })} disabled={started} >Recursive Backtracking </button> 
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'binaryTree' } })} disabled={started} >Binary Tree</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'prim' } })} disabled={started} >Prim</button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'kruskal' } })} disabled={started} >Kruskal</button>
          </div>
        </div>



        <div className="dropdown">
          <button className="dropbtn">Select Search <IoMdArrowDropdown />
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'BreadthFirstSearch' } })} disabled={started} > BreadthFirstSearch </button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'DepthFirstSearch' } })} disabled={started} > DepthFirstSearch </button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'Dijkstra' } })} disabled={started} > Dijkstra </button>
            <button className="content" onClick={() => handleSelectionChange({ target: { value: 'A*' } })} disabled={started} > A* </button>
          </div>
        </div>


        <div className="dropdown">
          <button className="dropbtn">Size <IoMdArrowDropdown />
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button className={`TheSize ${currentSize === 'Small' ? 'selected' : ''}`} onClick={setSmallGrid} disabled={started}> Small Grid</button>
            <button className={`TheSize ${currentSize === 'Medium' ? 'selected' : ''}`} onClick={setMediumGrid} disabled={started}> Medium Grid</button>
            <button className={`TheSize ${currentSize === 'Large' ? 'selected' : ''}`} onClick={setLargeGrid} disabled={started}> Large Grid</button>
          </div>
        </div>


        <div className="dropdown">
          <button className="dropbtn">Speed <IoMdArrowDropdown />
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button className={`TheSize ${currentSpeed === 'Slow' ? 'selected' : ''}`} onClick={setAnimationSlow} disabled={started}> Slow</button>
            <button className={`TheSize ${currentSpeed === 'Normal' ? 'selected' : ''}`} onClick={setAnimationNormal} disabled={started}> Normal</button>
            <button className={`TheSize ${currentSpeed === 'Fast' ? 'selected' : ''}`} onClick={setAnimationFast} disabled={started}> Fast</button>
          </div>
        </div>

        <button class="button button1" onClick={resetMaze} disabled={started}>
          Reset Maze
        </button>

        <button class="button button1" onClick={resetSearch} disabled={started}>
          Reset Search
        </button>

      </div>

      <div className = "label-container">
        <div className='label'>
          Start:<FaFlagCheckered /> <div className="legend-box visited"></div>
          Goal: <GiStarFlag /> <div className="legend-box visited"></div>
          Place Start: <PiMouseLeftClickFill /> <div className="legend-box visited"></div>
          Place Goal: <PiMouseRightClickFill /> <div className="legend-box visited"></div>
          Traversal: <div className="legend-box traversal"></div>
          Path: <div className="legend-box path"></div>
          Unvisited: <div className="legend-box unvisited"></div>
          Current: <div className="legend-box current"></div>
          Wall: <div className="legend-box wall"></div>
        </div>
      </div>

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

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Sylas Tran</p>
          <a href="https://www.linkedin.com/in/hcht1811/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Hieu181101" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </footer>


    </div>
  );
}

export default App;
