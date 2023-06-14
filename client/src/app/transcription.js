import { useEffect, useState } from "react"

function Transcription({audioRef, id}){

    const [text, setText] = useState("loading...")
    console.log(id)

    function transcribe(id){
        fetch(`http://localhost:5000/transcriptions/${id}`, {
          method: "POST"
        })
        .then(res=> res.json())
        .then(data => setText(data))
        .catch(error => console.log(error))
    }

    useEffect(()=> {
        fetch(`http://localhost:5000/transcriptions/${id}`)
        .then(res => res.json())
        .then(data => setText(data))
        .catch(error => setText("API offline"))
    })

    return (
        <div className={"absolute top-10"}>
        <p
          className="text-xs"
        >
          {text}
        </p>
        <button onClick={transcribe}>TRANSCRIBE</button>
      </div>
    )
}

export default Transcription