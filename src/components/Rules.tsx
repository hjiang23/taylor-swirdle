import {useState, useEffect} from 'react';

function Rules(props: any) {
    const [showModal, setShowModal] = useState(props.showHTP);
    const [fade, setFade] = useState(props.showHTP);
    const handleClick = (e: any, bool: boolean) => {
        if (e.target === e.currentTarget) {
          setTimeout(()=>setShowModal(bool),300); 
          setFade(bool);
        }
    }
    useEffect(() => {
      setShowModal(props.showHTP);
      setTimeout(()=>{setFade(props.showHTP)}, 100);
    },[props.showHTP])
    return (
        <>
        <button className = "p-2 border-2 bg-[#3a3a3c]" onClick={() => {setShowModal(true); setTimeout(()=>{setFade(true)}, 300)}}><strong>HOW TO PLAY</strong></button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none" onClick={(e) => handleClick(e, false)}
          >
            <div className={`relative w-auto my-6 mx-auto max-w-3xl ${fade? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              {/*content*/}
              <div className="max-h-[600px] overflow-y-scroll border-0 shadow-lg relative flex flex-col w-full bg-[#121213] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    How To Play
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {setTimeout(()=>setShowModal(false),300); setFade(false)}}
                  >
                    <span className="bg-transparent leading-tight h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative py-6 px-10 flex-auto text-left text-base leading-loose">
                    <ul className = "list-disc">
                      <li>You have six guesses to guess the Taylor Swift song of the day!</li>
                      <li><span className = "bg-[#538d4e]">Green</span> in any column indicates a match!</li>
                      <li><span className = "bg-[#b59f3b]">Yellow</span> means you are <em>close:</em></li>
                    </ul>
                    <ul className = "list-disc pl-5">
                      <li>Album: The mystery song is from an album before or after this one.</li>
                      <li>First Letter, Title Length, and Track Number: Within 2 letters / characters / numbers of the mystery song.</li>
                      <li>Duration: Within 10 seconds of the mystery song.</li>
                    </ul>
                    <ul className = "list-disc">
                      <li>The arrows indicate earlier/later (←/→) in the alphabet, or a lower/higher (↓/↑) number.</li>
                      <li>Album order: Debut, Fearless TV, Speak Now TV, Red TV, 1989, reputation, Lover, folklore, evermore, Midnights.</li>
                      <li>Title Length includes punctuation and spaces.</li>
                      <li><em><strong>HINT</strong>: You can search for songs by album (They're sorted by track number!).</em></li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    )
}

export default Rules;