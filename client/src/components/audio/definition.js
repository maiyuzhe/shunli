import { useState } from "react"
import ReactHTMLParser from 'html-react-parser'

function DefinitionPopUp({word}){

  const [html, setHtml] = useState("<div></div>")

  function grabDefinition(){
    fetch(`http://localhost:5000/definitions/${word.join("")}`)
    .then(res => res.json())
    .then(data => setHtml(data.definition[0]))
  }

  return (
    <div className="flex flex-col border border-white">
      <button onClick={grabDefinition}>
        GRAB HTML
      </button>
      {word}
      { ReactHTMLParser(html) }
    </div>
  )
}

export default DefinitionPopUp