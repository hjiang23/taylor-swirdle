import {useState, useEffect} from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import ResultsTable from './components/ResultsTable';
import data from './data.json';
import makeGuess from './handleGuess';

const map = new Map();
data.forEach((element, index) => {
  map.set(element.track_name, index);
})

function App() {

  const ans = 112;
  const [table, setTable] = useState<any>([]);
  const [clear, setClear] = useState("");
  const [guessNum, setGuessNum] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleGuess = (guess: string) => {
    setTable([...table, makeGuess(guess, ans, map)]);
    if (map.get(guess) === ans) {
      setWon(true);
      setGameOver(true);
    }
    else if (guessNum + 1 > 7) {
      setGameOver(true);
    }
    else {
      setGuessNum(guessNum + 1);
    }
    
  }

  useEffect(() => {
    console.log(table);
  },[table])

  return (
    <div className="App">
      <Dropdown won = {won} gameOver = {gameOver} guessNum = {guessNum} clear = {clear} setClear = {setClear} table = {table} handleGuess = {handleGuess}></Dropdown>
      <ResultsTable table = {table}></ResultsTable>
    </div>
  );
}

export default App;
