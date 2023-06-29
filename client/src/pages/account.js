import Navbar from "../components/navbar"
import { useUser } from "@auth0/nextjs-auth0/client"

function Account(){

	const {user} = useUser()

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
			<div
			className="flex flex-col mt-24 w-[40rem] text-center items-center justify-center bg-white text-black font-gothic rounded-xl"
			>
				<img 
					className="rounded-full w-48 mt-4 border border-black border-2"
					alt="profile-pic" 
					src={user ? user.picture : ""}
				/>
				<h1
				  className="mt-4"
				>
					{user ? user.name :""}
					<br/>
					{user ? user.email : ""}
					<br/>
					Uploads:
				</h1>
				<button
				  className="mb-4 border border-black rounded-lg px-2"
				>
					Clear Account
				</button>
			</div>
		</main>
	)
}

export default Account