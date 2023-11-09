import Navbar from "../components/navbar"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"
import VocabCard from "@/components/vocab/vocabCard"

function Vocabulary(){

	const {user} = useUser()

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
      <VocabCard user={user}/>
		</main>
	)
}

export default Vocabulary