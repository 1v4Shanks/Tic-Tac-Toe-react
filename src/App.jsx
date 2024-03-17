import React from "react";
import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="main">
      <Game />
    </div>
  );
}

function Game() {
 
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove]; 
  const xIsNext = currentMove % 2 === 0;

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function handlePlay(nextSquares) {
    const nextHistroy = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistroy);
    setCurrentMove(nextHistroy.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = "Go to Move #" + index;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={index}>
        <button className="move-btn" onClick={()=> jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="box">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          onReset={handleReset}
        />
      </div> 
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay, onReset }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + squares[winner[0]];
  } else {
    status = "Current Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className={winner ? "status-winner" : "status"}>{status}</div>

      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isWinningSquare={winner && winner.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isWinningSquare={winner && winner.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isWinningSquare={winner && winner.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isWinningSquare={winner && winner.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isWinningSquare={winner && winner.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isWinningSquare={winner && winner.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isWinningSquare={winner && winner.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isWinningSquare={winner && winner.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isWinningSquare={winner && winner.includes(8)}
        />
      </div>
      <div className="btn-row">
        <button className="btn" onClick={onReset}>
          RESET
        </button>
      </div>
    </>
  );
}

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={isWinningSquare ? "square-red" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
