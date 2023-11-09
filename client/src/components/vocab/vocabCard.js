import { useState, useEffect } from "react";
import Term from "./term";

function VocabCard({user}){

  const [vocabulary, setVocab] = useState([])

  useEffect(()=> {
    fetch('http://localhost:5000/vocabulary')
    .then(res=>res.json())
    .then(data => setVocab(data.vocabulary))
    .catch(error => setVocab([]))
  },[])

  function filterVocab(id){
    const newVocab = vocabulary.filter(term=>term.id != id);
    console.log(newVocab);
    setVocab(newVocab);
  }

  return (
    <div
    className="overflow-y-scroll relative flex flex-col mt-24 mb-12 px-2 w-[44rem] h-full text-center items-center bg-white text-black font-gothic rounded-xl"
    >
      <div 
        className="absolute left-0 flex flex-row items-center"
      >
        <img 
          className="rounded-full w-12 h-12 m-4 border border-black border-2 bg-black"
          alt="profile-pic" 
          src={user ? user.picture: ""}
        />
        <p>
          {user ? user.name : ""}'s Vocabulary
        </p>
      </div>
      {/* Vocabulary container */}
      <div className="flex flex-col mt-24 w-3/4 items-center">
        {vocabulary ? 
        <p>Vocabulary not found.</p>
        : 
        vocabulary.map( vocab => 
        <Term vocab={vocab} 
        filterVocab={filterVocab}
        key={vocab.id}/>)}
      </div>
    </div>
  )
}

export default VocabCard;