import Navbar from "../../components/navbar/navbar"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"
import VocabCard from "@/components/vocab/vocabCard";
import { useRouter } from "next/router";

function Vocabulary(){

	const {user} = useUser()

	const router = useRouter();

	useEffect(()=>{
		if(!user)router.push('http://localhost:3000/');
	})

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
      {user ? <VocabCard user={user}/> : ""}
		</main>
	)
}

export default Vocabulary