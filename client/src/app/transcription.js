import { useEffect, useState } from "react"
import Loader from "./loader"

function Transcription({audioRef, id}){

    const [text, setText] = useState("")
    const [loading, setLoad] = useState(true)

    useEffect(() => {
      fetch(`http://localhost:5000/transcriptions/${id}`)
      .then(res => res.json())
      .then(data => setText(data))
    },[])

    function transcribe(){
        setLoad(false)
        setText("Did you know that patience is a virtue?")
        fetch(`http://localhost:5000/transcriptions/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            audio_id: id
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
          className="w-[33rem] py-1"
        >
          {text}
        </p>
        <div className="flex">
          {!loading? <Loader/> : <button onClick={transcribe}
          className="antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 mb-2 hover:scale-105 hover:duration-150"
          >
            TRANSCRIBE
          </button>}
        </div>
      </div>
    )
}

export default Transcription