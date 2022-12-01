import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Define 2d Array to use as the board
  const [boardGrid, setBoardGrid] = useState([
    [0,1,2,3],[4,5,0,1],[2,3,4,5]
  ]);

  return (
    // Displays the boardGrid array in a single column using mapping
    // Flexbox is then used in App.css to convert it into a 3x3 grid
    <div className="App">
      <div className="board">
        {boardGrid.map((row, rowIndex) => 
        (
        <div key={rowIndex} className="gridRow">
          {row.map((numb, colIndex) =>
          (
            <div className="card" key={colIndex} > {numb}</div>
          ))}
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
