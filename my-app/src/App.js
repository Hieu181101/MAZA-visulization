import logo from './logo.svg';
import './App.css';
import { CreateMaze } from './Mazegen';

function App() {
  const maze = CreateMaze();

  return (
    <div className="App">
      {maze}
    </div>
  );
}

export default App;