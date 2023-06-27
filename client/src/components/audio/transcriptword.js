import { useState } from "react"

function TranscriptWord({word, index}){

  const [toggle, setToggle] = useState(false)

  return (
    <p
      onClick={() => setToggle(!toggle)}
      className={
        !toggle ? 
        "transition ease-in-out px-[0.05rem] cursor-pointer hover:text-red-500 hover:scale-110"
        : 
        "text-red-500 transition ease-in-out px-[0.05rem] cursor-pointer hover:text-red-500 hover:scale-110"
      }
    >
      {word}
    </p>
  )
}

export default TranscriptWord