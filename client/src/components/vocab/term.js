import ReactHTMLParser from "html-react-parser"
import { useState } from "react"

function Term({vocab}){

  const [deleted, setDelete] = useState(false)

  function removeEntry(){
    fetch(`http://localhost:5000/vocabulary/${vocab.id}`, {
      method: "DELETE"
    })
    .then(res=> {
      setDelete(true)
    })
  }

  return (
    <div
      className={
        !deleted ? "relative transition ease-in-out items-center flex flex-col m-2 px-2 py-1 border-b-2 border-black"
        :
        "hidden"
      }
    >
      <button
        onClick={removeEntry}
        className="absolute left-48 w-36 antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 mb-2 hover:scale-105 hover:bg-red-500 hover:duration-150"
      >
        DELETE ENTRY
      </button>
        {ReactHTMLParser(vocab.definition)}
    </div>
  )
}

export default Term