import AccountCard from "@/components/account/accountCard"
import Navbar from "../components/navbar"
import { useUser } from "@auth0/nextjs-auth0/client"

function Account(){

	const {user} = useUser()

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