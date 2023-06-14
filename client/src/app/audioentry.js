import { useState, useRef } from "react"
import Playback from "./playback"
import Transcription from "./transcription"

function AudioEntry({id, name}){

  const [load, setLoad] = useState(false)

  function toggleDiv(){
    setLoad(!load)
  }

  return(
      <li 
        className={!load ?
          "transition-all relative flex w-96 h-10 bg-white text-black m-2 p-2 rounded break-normal" :
          "transition-all relative flex w-96 h-96 bg-white text-black m-2 p-2 rounded break-normal" 
        }
      >
        <p 
          onClick={toggleDiv}
          className="absolute left-1"
        >
          {name}
        </p>
        <a
          className="absolute right-1"
        >
          {load ? <Playback id={id}/> : ""}
        </a>
        {load ? <Transcription id={id}/>: ""}
      </li>
  )
}

export default AudioEntry