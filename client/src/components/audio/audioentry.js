import { useState, useRef, useEffect } from "react"
import Playback from "./playback"
import Transcription from "./transcription"

function AudioEntry({id, name}){

  const [load, setLoad] = useState(false)
  const [deleted, setDelete] = useState(false)

  function toggleDiv(){
    setLoad(!load)
  }


  function deleteAudio(){
    fetch(`http://localhost:5000/audio_stream/${id}`, {
      method: "DELETE"
    })
    fetch(`http://localhost:5000/transcriptions/${id}`, {
      method: "DELETE"
    })
    setDelete(true)
  }

  return(
    <div className={deleted ? "hidden" : "animate-fade-in overflow-y-scroll"}>
      <div 
        className={!load ?
          "transition-all duration-300 relative flex w-80 h-9 bg-white text-black m-2 p-2 rounded break-normal hover:scale-105" :
          "transition-all duration-300 delay-300 relative flex w-[36rem] h-96 bg-white text-black m-2 p-2 rounded break-normal overflow-y-scroll" 
        }
      >
        <p 
          onClick={toggleDiv}
          className="truncate pr-8 cursor-pointer font-bold"
        >
          {load ? "-" : "+"} {name.split(".")[0]}
        </p>
        <a
          className="absolute right-1"
        >
          {load ? 
            <div>
              <button onClick={deleteAudio}
              className="antialiased animate-fade absolute right-10 w-32 transition ease-in-out font-gothic border-black border rounded-md hover:bg-red-500 hover:scale-105 hover:duration-150"
              >
                Delete Audio
              </button>
              <Playback id={id}/> 
            </div>
          : 
          ""
          }
        </a>
        {load ? 
          <div className="flex flex-col absolute animate-fade">
            <Transcription id={id}/>
          </div>
          : ""}
      </div>
    </div>
  )
}

export default AudioEntry