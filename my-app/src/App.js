import React, { useState } from 'react';
import './App.css';
import { CreateMaze } from './Mazegen';
import { BiTreeGen } from './binaryTree';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [startedBacktracking, setStartedBacktracking] = useState(false);
  const [startedBinaryTree, setStartedBinaryTree] = useState(false);

  const handleStartBacktracking = async () => {
    setStartedBacktracking(true);
    CreateMaze(setBlocks); // Assuming this is the backtracking algorithm
    setStartedBacktracking(false);
  };

  const handleStartBinaryTree = async () => {
    setStartedBinaryTree(true);
    await BiTreeGen(setBlocks);
    setStartedBinaryTree(false);
  };

  return (
    <div className="App">
      <div className="Button-container">
        <button 
          onClick={handleStartBacktracking}  
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: '#5564eb',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '10px',
          }}
          disabled={startedBacktracking || startedBinaryTree}
        >
          {startedBacktracking ? 'Generating...' : 'Start Backtracking Maze'}
        </button>
        
        <button 
          onClick={handleStartBinaryTree}  
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: '#34a853',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '10px',
          }}
          disabled={startedBacktracking || startedBinaryTree}
        >
          {startedBinaryTree ? 'Generating...' : 'Start Binary Tree Maze'}
        </button>
      </div>

      <h1>Maze Generator</h1>
      
      <div className="maze-container">
        {Array.isArray(blocks) && blocks.map((row, i) => (
          <div key={i} className="row">
            {row.map((block, j) => (
              <div key={j} className="block" style={block.show()}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
