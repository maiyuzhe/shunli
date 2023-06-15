import { useEffect, useState } from "react"
import Loader from "./loader"

function Transcription({audioRef, id}){

    const [text, setText] = useState("")
    const [loading, setLoad] = useState(true)

    function transcribe(){
        setLoad(false)
        setText("Did you know that patience is a virtue?")
        const audio_id = id
        fetch(`http://localhost:5000/transcriptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            audio_id: audio_id
          })
        })
        .then(res=> res.json())
        .then(data => {
          setText(data.transcription)
          setLoad(true)
        })
        .catch(error => console.log(error))
    }



    return (
        <div className={"absolute top-10"}>
        <p
          className="text-xs"
        >
          {text}
        </p>
        <div className="flex">
          {!loading? <Loader/> : <button onClick={transcribe}>TRANSCRIBE</button>}
        </div>
      </div>
    )
}

export default Transcription