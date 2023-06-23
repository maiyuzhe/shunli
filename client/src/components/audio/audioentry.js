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
    setDelete(true)
  }

  return(
    <div className={deleted ? "hidden" : "animate-fade-in overflow-y-scroll"}>
      <div 
        className={!load ?
          "transition-all duration-300 relative flex w-[36rem] h-10 bg-white text-black m-2 p-2 rounded break-normal" :
          "transition-all duration-300 relative flex w-[36rem] h-96 bg-white text-black m-2 p-2 rounded break-normal overflow-y-scroll" 
        }
      >
        <p 
          onClick={toggleDiv}
          className="truncate pr-8 cursor-pointer"
        >
          {name}
        </p>
        <a
          className="absolute right-1"
        >
          {load ? <Playback id={id}/> : ""}
        </a>
        {load ? 
          <div className="flex flex-col absolute top-10">
            <Transcription id={id}/>
            <button onClick={deleteAudio}
            className="antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 hover:bg-red-500 hover:scale-105 hover:duration-150"
            >
              Delete Audio
            </button>
          </div>
          : ""}
      </div>
    </div>
  )
}

export default AudioEntry