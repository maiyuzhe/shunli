import { useEffect, useState } from "react"
import Loader from "./loader"
import TranscriptWord from "./transcriptword"
import DefinitionPopUp from "./definition"

function Transcription({audioRef, id}){

    const [text, setText] = useState("")
    const [loading, setLoad] = useState(true)
    const [defArray, setArray] = useState([])

    function updateArray(word){
      setArray([...defArray, word])
    }

    function filterArray(word){
      const newArray = defArray.filter(w => w !== word)
      setArray(newArray)
    }

    useEffect(() => {
      fetch(`http://localhost:5000/transcriptions/${id}`)
      .then(res => res.json())
      .then(data => setText(data))
    },[])

    function transcribe(){
        setLoad(false)
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
        <div
          className={loading ? "w-[33rem] py-1 pl-2 animate-fade-down h-full flex flex-wrap text-lg" : "hidden"}
        >
          {text.split("").map((word, index) => {
            return <TranscriptWord word={word} key={index} index={index} defArray={defArray} updateArray={updateArray} filterArray={filterArray}/>
          })}
        </div>
        <div className="flex justify-center items-center w-[33rem]">
          {!loading? <Loader/> : <button onClick={transcribe}
          className="antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 mb-2 hover:scale-105 hover:duration-150"
          >
            {text!="Press Transcribe!" ? "RESUBMIT TRANSCRIPTION": "TRANSCRIBE"}
          </button>}
        </div>
        <DefinitionPopUp word={defArray}/>
      </div>
    )
}

export default Transcription