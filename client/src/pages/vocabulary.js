import Navbar from "../components/navbar"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useState } from "react"
import Term from "@/components/vocab/term"

function Vocabulary(){

	const {user} = useUser()

  const [vocabulary, setVocab] = useState([{"word": "暂时", "definition": "简介"}])

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
			<div
			className="relative flex flex-col mt-24 mb-12 w-[40rem] h-full text-center items-center bg-white text-black font-gothic rounded-xl"
			>
				<div 
          className="absolute left-0 flex flex-row items-center"
        >
          <img 
            className="rounded-full w-12 m-4 border border-black border-2 bg-black"
            alt="profile-pic" 
            src={user.picture}
          />
          <p>
            {user.name}'s Vocabulary
          </p>
        </div>
        <div className="flex flex-col mt-24">
          {vocabulary.map( vocab => <Term vocab={vocab} key={vocab.word}/>)}
        </div>
			</div>
		</main>
	)
}

export default Vocabulary