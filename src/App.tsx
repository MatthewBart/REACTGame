import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// New type for handling current and previous clicked cards
type TLocation={
  row: number;
  col: number;
}
function App() {
  // Define 2d Array to use as the board
  const [boardGrid, setBoardGrid] = useState([
    [6,1,2,3],[4,5,6,1],[2,3,4,5]
  ]);
  
  // Define constant for last clicked card of type TLocation
  const [lastClicked, setLastClicked]=useState<TLocation | undefined>();

  // Copies the 2d array and fills it with false
  // Used for setting cards as flipped on the board
  const [flippedGrid, setFlippedGrid] = useState(
    new Array(boardGrid.length).fill("").map(()=>new Array(boardGrid[0].length).fill(false))
  );
  
  // Handles selected card and last selected card
  // Compares cards and checks if they match or not
  // Reveals card by creating a new flipped grid and setting the card index to true
  // If the cards do not match, flip them over again after a second
  // If it is a match leave them face up and check if all cards are matched
  function handleCardSelect(rowIndex: number, colIndex: number): void {
    const currentCard = boardGrid[rowIndex][colIndex];
    const newFlippedGrid =[...flippedGrid];
    newFlippedGrid[rowIndex][colIndex]=true;
    setFlippedGrid(newFlippedGrid);
    // if a card has been selected prior then compare them
    if(lastClicked){
      const previousCard = boardGrid[lastClicked.row][lastClicked.col];
      // second card selected
      // check match
      if(previousCard !==currentCard)
      {
        // wait 1.5 seconds and hide both flipped cards
          setTimeout(()=>{
            newFlippedGrid[rowIndex][colIndex]=false;
            newFlippedGrid[lastClicked.row][lastClicked.col]=false;
            setFlippedGrid([...newFlippedGrid]);
          },1500);
      }
      // check win conditions
      // check if all elements are true
      else{
        const win = flippedGrid.flat().every(element => element ===true);
        if(win){alert('Winner!');}
        
      }
    setLastClicked(undefined);
    }else{
      // first card selected
      setLastClicked({
        row: rowIndex,
        col: colIndex,
    })


    }
  }
  
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

