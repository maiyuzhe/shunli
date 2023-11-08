import ReactHTMLParser from "html-react-parser"
import GenericButton from "../buttons/genericButton"

function Term({vocab, filterVocab}){

  function removeEntry(){
    fetch(`http://localhost:5000/vocabulary/${vocab.id}`, {
      method: "DELETE"
    });
    filterVocab(vocab.id)
  }

  return (
    <div className="transition ease-in-out items-center 
    relative border border-black rounded-lg w-full
    flex flex-col m-2 p-2 border-b-2 border-black">
      <GenericButton propFunc={removeEntry} 
      buttonLabel={"X"} 
      extraCSS={"hover:bg-red-500 absolute right-0 top-0 m-0"}/>
      {ReactHTMLParser(vocab.definition)}
    </div>
  )
}

export default Term