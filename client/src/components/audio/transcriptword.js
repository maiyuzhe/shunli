import { useState } from "react"
import DefinitionPopUp from "./definition"

function TranscriptWord({word, index, defArray, updateArray, filterArray}){

  const [toggle, setToggle] = useState(false)
  const [definition, setDefinition] =useState("")

  function grabWord(){
    if(defArray.length >= 4){
      console.log("limit")  
    }
    if(!toggle){
      updateArray(word)
    }
    else{
      filterArray(word)
    }
    console.log(defArray)
    setDefinition([...defArray, word])
  }

  return (
    <div>
      <p
        onClick={() => {
          setToggle(!toggle)
          grabWord()
        }
        }
        className={
          !toggle ? 
          "transition ease-in-out px-[0.05rem] cursor-pointer hover:text-red-500 hover:scale-110"
          : 
          "text-red-500 transition ease-in-out px-[0.05rem] cursor-pointer hover:text-red-500 hover:scale-110"
        }
      >
        {word}
      </p>
    </div>
  )
}

export default TranscriptWord