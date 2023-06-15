import { useState, useRef, useEffect } from "react"
import Playback from "./playback"
import Transcription from "./transcription"

function AudioEntry({id, name}){

  const [load, setLoad] = useState(false)
  const [startText, setText] = useState("")

  function toggleDiv(){
    setLoad(!load)
  }

  useEffect(()=> {
    fetch(`http://localhost:5000/transcriptions/${id}`)
    .then(res => res.json())
    .then(data => setText(data))
    .catch(error => setText("API offline"))
  }, [])

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
        {load ? <Transcription id={id} start={startText}/>: ""}
      </li>
  )
}

export default AudioEntry