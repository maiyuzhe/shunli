import AccountCard from "@/components/account/accountCard";
import Navbar from "../../components/navbar/navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Account(){
	
	const {user} = useUser();

	const router = useRouter();

	useEffect(()=>{
		if(!user)router.push('http://localhost:3000/');
	})

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
			<AccountCard user={user}/>
		</main>
	)
}

export default Account