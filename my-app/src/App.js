import React, { useState } from 'react';
import './App.css';
import { CreateMaze } from './Mazegen';
import { BiTreeGen } from './binaryTree';
import { PrimGen } from './Prim';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [startedBacktracking, setStartedBacktracking] = useState(false);
  const [startedBinaryTree, setStartedBinaryTree] = useState(false);
  const [startedPrim, setStartedPrim] = useState(false);

  const handleStartBacktracking = async () => {
    setStartedBacktracking(true);
    await CreateMaze(setBlocks); 
    setStartedBacktracking(false);
  };

  const handleStartBinaryTree = async () => {
    setStartedBinaryTree(true);
    await BiTreeGen(setBlocks);
    setStartedBinaryTree(false);
  };

  const handleStartPrim = async () => {
    setStartedPrim(true);
    await PrimGen(setBlocks);
    setStartedPrim(false);
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
          disabled={startedBacktracking || startedBinaryTree || startedPrim}
        >
          {startedBacktracking ? 'Generating...' : 'Recrusive Backtracking'}
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
          disabled={startedBacktracking || startedBinaryTree || startedPrim}
        >
          {startedBinaryTree ? 'Generating...' : 'Binary Tree'}
        </button>
        
        <button 
          onClick={handleStartPrim}  
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: '#FF5733',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '10px',
          }}
          disabled={startedBacktracking || startedBinaryTree || startedPrim}
        >
          {startedPrim ? 'Generating...' : 'Prim'}
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
