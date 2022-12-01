import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Define 2d Array to use as the board
  const [boardGrid, setBoardGrid] = useState([
    [6,1,2,3],[4,5,6,1],[2,3,4,5]
  ]);

  // Copies the 2d array and fills it with false
  // Used to check if 2 cards match
  // These are then set to true if they match thus eliminating them from being used again
  const [flippedGrid, setFlippedGrid] = useState(
    new Array(boardGrid.length).fill("").map(()=>new Array(boardGrid[0].length).fill(false))
  );
  
  // Handles selected card
  // reveals card by creating a new flipped grid and setting the card index to true
  function handleCardSelect(rowIndex: number, colIndex: number): void {
    const newFlippedGrid=[...flippedGrid];
    newFlippedGrid[rowIndex][colIndex]=true;
    setFlippedGrid(newFlippedGrid);
  }
  console.log("flippedGrid",flippedGrid);
  
  return (
    // Displays the boardGrid array in a single column using mapping
    // Styled using flexbox to create a 3x3 interacatable gameboard grid
    // handleCardSelect is used to select and compare the chosen card to another
    <div className="App">
      <div className="board">
        {boardGrid.map((row, rowIndex) => 
        (
        <div key={rowIndex} className="gridRow">
          {row.map((numb, colIndex) =>
          (
            <div 
            onClick={() =>handleCardSelect(rowIndex,colIndex)}
            className="card"
            key={colIndex}
            >
            {flippedGrid[rowIndex][colIndex] ? numb:""}
            </div>
          ))}
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;

