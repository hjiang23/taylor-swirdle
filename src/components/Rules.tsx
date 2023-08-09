import {useState} from 'react';

function Rules(props: any) {
    const [showModal, setShowModal] = useState(false);
    const handleClick = (e: any, bool: boolean) => {
        if (e.target === e.currentTarget) {
            setShowModal(bool);
        }
    }
    return (
        <>
        <button className = "p-2 border-2 bg-[#3a3a3c]" onClick={() => setShowModal(true)}>HOW TO PLAY</button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={(e) => handleClick(e, false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#121213] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    How To Play
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent leading-tight h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    <ul className="list-disc text-left text-base leading-loose">
                        <li>You have six guesses to guess the Taylor Swift track of the day!</li>
                        <li><span className = "bg-[#538d4e]">Green</span> in any column indicates a match!</li>
                        <li>Album: <span className = "bg-[#b59f3b]">Yellow</span> means the mystery track is on the album either before or after this album (Album sorting disregards Taylor's Version release date)</li>
                        <li>First Letter: <span className = "bg-[#b59f3b]">Yellow</span> means the mystery track starts with a letter within two of this letter, and left/right arrows indicate earlier/later in the alphabet</li>
                        <li>Title Length: <span className = "bg-[#b59f3b]">Yellow</span> means the number of characters in the mystery track title is within two of this track, and up/down arrows indicate more/less characters</li>
                        <li>Track Number: <span className = "bg-[#b59f3b]">Yellow</span> means the track number of the mystery track is within two of this track's, and up/down arrows indicate higher/lower track number</li>
                        <li>Duration: <span className = "bg-[#b59f3b]">Yellow</span> means the duration of the mystery track is within 10 seconds of this track's, and up/down arrows indicate longer/shorter duration</li>
                        <li><em>Hint: You can search tracks by album (They're sorted by track number!)</em></li>
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