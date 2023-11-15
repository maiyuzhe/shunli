import { useEffect, useState } from "react"
import Loader from "./loader"
import TranscriptWord from "./transcriptword"
import DefinitionPopUp from "./definition"
import GenericButton from "../buttons/genericButton"

function Transcription({audioRef, id}){

    const [text, setText] = useState("Temp")
    const [loading, setLoad] = useState(true)
    const [defArray, setArray] = useState([])
    const [transcriptionId, setId] = useState()

    function updateArray(word){
      setArray([...defArray, word])
    }

    function filterArray(word){
      const newArray = defArray.filter(w => w !== word)
      setArray(newArray)
    }

    useEffect(() => {
      fetch(`http://localhost:5000/transcriptions/upload/${id}`)
      .then(res => res.json())
      .then(data => {
        if(data["error"]) setText("無反饋 testing");
        else{
          setText(data.transcription);
          setId(data.id)
        }
      })
      .catch(error => console.log(error))
    },[])

    function transcribe(){
        setLoad(false)
        
        fetch(`http://localhost:5000/transcriptions/${transcriptionId}`, {
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
          className={`w-[33rem] py-1 pl-2 animate-fade-down h-full flex flex-wrap text-lg" ${loading ? "" : "hidden"}`}
        >
          {text?.split("").map((word, index) => {
            if(word.charCodeAt(0) > 127)
              return <TranscriptWord word={word} key={index} index={index} 
              defArray={defArray} updateArray={updateArray} filterArray={filterArray}/>;
            if(word == " ")
              return <p>&nbsp;</p>
            else
              return <p>{word}</p>;
          })}
        </div>
        <div className="flex justify-center items-center w-[33rem]">
          {!loading ? 
          <Loader/> 
          : 
          <GenericButton propFunc={transcribe} 
          buttonLabel={text=="無反饋 testing" ? "Transcribe" : "Resubmit Transcription"}/>}
        </div>
        
        <DefinitionPopUp word={defArray}/>
      </div>
    )
}

export default Transcription