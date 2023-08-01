import {useState, useEffect, useRef} from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import ResultsTable from './components/ResultsTable';
import Rules from './components/Rules';
import Share from './components/Share';
import data from './data.json';
import makeGuess from './handleGuess';

const map = new Map();
data.forEach((element, index) => {
  map.set(element.track_name, index);
})

function App() {

  // console.log(data);
  const ans = useRef(0);
  const colors: string[] = ["#3a3a3c", "#b59f3b", "#538d4e"];
  
  useEffect(() => {
    fetch('https://taylor-swirdle.s3.us-east-2.amazonaws.com/ans.json')
    .then((res) => res.json())
    .then((data) => {
      //  console.log(data);
       ans.current = data.ans;
    })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  const [table, setTable] = useState<any>([]);
  const [input, setInput] = useState("");
  const [guessNum, setGuessNum] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleGuess = (guess: string) => {
    setTable([...table, makeGuess(guess, ans.current, map)]);
    if (map.get(guess) === ans) {
      setWon(true);
      setGameOver(true);
    }
    else if (guessNum + 1 > 6) {
      setGameOver(true);
    }
    else {
      setGuessNum(guessNum + 1);
    }
    
  }

  useEffect(() => {
    localStorage.setItem("table", JSON.stringify(table));
  },[table])

  return (
    <div className = "w-auto bg-[#121213] text-white h-screen overflow-auto">
      <div className="w-[350px] sm:w-[800px] text-center flex-col items-center mx-auto font-sans">
        <header className = "pt-16 pb-6">
          <div>
            <h1 className = "text-4xl font-bold pb-2">TAYLOR SWIRDLE</h1>
            <h2 className = "text-lg">Guess the Taylor Swift song!</h2>
          </div>
        </header>
        <div className = "mx-auto">
          <div className = "mb-5 flex justify-center gap-2 w-3/5 mx-auto text-xs">
            <Rules></Rules>
            <Share></Share>
          </div>
          <Dropdown won = {won} gameOver = {gameOver} guessNum = {guessNum} input = {input} setInput = {setInput} table = {table} handleGuess = {handleGuess}></Dropdown>
          <ResultsTable table = {table} colors = {colors}></ResultsTable>
        </div>
        <p className = "p-8">
          Inspired by <a target= "_blank" rel="noreferrer" className = "underline" href="https://www.nytimes.com/games/wordle/index.html">Wordle</a> and <a target= "_blank" rel="noreferrer" className = "underline" href="https://poeltl.dunk.town/">Poeltl</a>
        </p>
      </div>
    </div>
  );
}

export default App;
