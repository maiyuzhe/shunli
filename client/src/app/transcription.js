import { useEffect, useState } from "react"

function Transcription({audioRef, id}){

    const [text, setText] = useState("loading...")

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
      </div>
    )
}

export default Transcription