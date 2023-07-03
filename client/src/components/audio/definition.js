import { useState } from "react"
import ReactHTMLParser from 'html-react-parser'
import Loader from "./loader"

function DefinitionPopUp({word}){

  const [html, setHtml] = useState("<div></div>")
  const [addToVocab, setVocab] = useState(false)
  const [loading, setLoad] = useState(false)

  console.log(word)

  function grabDefinition(){
    setVocab(false)
    setLoad(true)
    fetch(`http://localhost:5000/definitions/${word.join("")}`)
    .then(res => res.json())
    .then(data => {
      setHtml(data.definition[0])
      if(data.definition[0] == "<p>Invalid Word!</p>"){
        setHtml("<h1>Invalid Submission</h1>")
      }
    })
    .then(()=>{
      setVocab(true)
      setLoad(false)
    })
  }

  function postToVocabulary(){
    fetch('http://localhost:5000/vocabulary', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        term: word.join(""),
        definition: html,
        translation: "Translate me"
      })
    })
    .then(res=> res.json())
    .then(data => console.log(data))
  }

  return (
    <div 
      className={!word.length == 0 ? "animate-fade-down fixed w-72 h-72 top-24 right-8 flex flex-col bg-white rounded-lg overflow-y-scroll px-2 break-all"
      : "transition-all opacity-0 fixed w-64 h-64 top-24 right-16 flex flex-col bg-white rounded-lg overflow-y-scroll px-2"
      }
    >
      <button onClick={grabDefinition}
        className="antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 m-2 hover:scale-105 hover:duration-150"
      >
        Dictionary Query
      </button>
      Selected Word: {word}
      <div
        className="flex flex-col justify-center items-center"
      >
        {loading ? <Loader/> : ""}
      </div>
      { ReactHTMLParser(html) }
      <button
        onClick={postToVocabulary}
        className={addToVocab ? "antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 m-2 hover:scale-105 hover:duration-150"
        : "hidden"  
      }
      >
        Add To Vocabulary
      </button>
    </div>
  )
}

export default DefinitionPopUp