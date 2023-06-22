import { useState, useRef, useEffect } from "react"
import Playback from "./playback"
import Transcription from "./transcription"

function AudioEntry({id, name}){

  const [load, setLoad] = useState(false)
  const [startText, setText] = useState("")
  const [deleted, setDelete] = useState(false)

  function toggleDiv(){
    setLoad(!load)
  }

  useEffect(()=> {
    fetch(`http://localhost:5000/transcriptions/${id}`)
    .then(res => res.json())
    .then(data => setText(data))
    .catch(error => setText("API offline"))
  }, [])

  function deleteAudio(){
    fetch(`http://localhost:5000/audio_stream/${id}`, {
      method: "DELETE"
    })
    setDelete(true)
  }

  return(
    <div className={deleted ? "hidden" : "animate-fade-in"}>
      <div 
        className={!load ?
          "transition-all duration-300 relative flex w-[36rem] h-10 bg-white text-black m-2 p-2 rounded break-normal" :
          "transition-all duration-300 relative flex w-[36rem] h-96 bg-white text-black m-2 p-2 rounded break-normal overflow-y-scroll overscroll-contain" 
        }
      >
        <p 
          onClick={toggleDiv}
          className="truncate pr-8"
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
            <Transcription id={id} start={startText}/>
            <button onClick={deleteAudio}>Delete Audio</button>
          </div>
          : ""}
      </div>
    </div>
  )
}

export default AudioEntry