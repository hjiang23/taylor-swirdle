import {useState} from 'react';

function Share(props: any) {
    const [showCopied, setShowCopied] = useState(false);
    const [blyat, setBlyat] = useState(false);
    const handleClick = () => {
      setShowCopied(true);
      navigator.clipboard.writeText(getResults(props.table, props.won, props.guessNum, props.day));
      setTimeout(()=>{setBlyat(true)}, 100);
      setTimeout(()=>{setBlyat(false)}, 1000);
      setTimeout(()=>{setShowCopied(false)}, 1500);
    }
    return (
        <>
        <button className = {`p-2 border-2 ${!props.gameOver ? 'bg-[#121213] text-[#3a3a3c] border-[#3a3a3c]' : 'bg-[#3a3a3c]'}`} disabled = {!props.gameOver} onClick={() => handleClick()}><strong>SHARE</strong></button>
        {showCopied ? (
        <>
          <div
            className={`${blyat? 'opacity-100' : 'opacity-0'} transition-opacity justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#121213] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 bg-white">
                  <p className="text-black text-xs">Copied results!</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
        </>
    );
}

const getResults = (table: any, won: boolean, guessNum: boolean, day: number) => {
  let res = "";
  res += `Taylor Swirdle ${day} - ${won ? guessNum : 'X'}/6\n\n`;
  table.forEach((row: any, i: number, arr: any) => {
    res += row.album.correctness === 2 ? '🟩': row.album.correctness === 1 ? '🟨': '⬛';
    res += row.first_letter.correctness === 2 ? '🟩': row.first_letter.correctness === 1 ? '🟨': '⬛';
    res += row.length.correctness === 2 ? '🟩': row.length.correctness === 1 ? '🟨': '⬛';
    res += row.track_number.correctness === 2 ? '🟩': row.track_number.correctness === 1 ? '🟨': '⬛';
    res += row.duration.correctness === 2 ? '🟩': row.duration.correctness === 1 ? '🟨': '⬛';
    if (i !== arr.length - 1) {
      res += '\n';
    }
  })
  return res;
}

export default Share;