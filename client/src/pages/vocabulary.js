import Navbar from "../components/navbar"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"
import Term from "@/components/vocab/term"

function Vocabulary(){

	const {user} = useUser()

  const [vocabulary, setVocab] = useState([{"word": "暂时", "definition": "简介", "id": 0}])

  useEffect(()=> {
    fetch('http://localhost:5000/vocabulary')
    .then(res=>res.json())
    .then(data => setVocab(data.vocabulary))
    .catch(error => setVocab([{"word": "錯誤", "definition": "Vocabulary Not Found", "id": 0}]))
  },[])

  function filterVocab(id){
    const newVocab = vocabulary.filter(term=>term.id != id);
    console.log(newVocab);
    setVocab(newVocab);
  }

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
			<div
			className="overflow-y-scroll relative flex flex-col mt-24 mb-12 px-2 w-[44rem] h-full text-center items-center bg-white text-black font-gothic rounded-xl"
			>
				<div 
          className="absolute left-0 flex flex-row items-center"
        >
          <img 
            className="rounded-full w-12 m-4 border border-black border-2 bg-black"
            alt="profile-pic" 
            src={user ? user.picture: ""}
          />
          <p>
            {user ? user.name : ""}'s Vocabulary
          </p>
        </div>
        {/* Vocabulary container */}
        <div className="flex flex-col mt-24 w-3/4 items-center">
          {vocabulary.map( vocab => 
          <Term vocab={vocab} 
          filterVocab={filterVocab}
          key={vocab.word}/>)}
        </div>
			</div>
		</main>
	)
}

export default Vocabulary