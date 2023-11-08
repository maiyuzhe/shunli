import GenericButton from "@/components/buttons/genericButton"
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
				{user ?
					<h1
						className="mt-4"
					>
						{user.name}
						<br/>
						{user.email}
						<br/>
						Uploads:
					</h1>
				: ""}
				<GenericButton buttonLabel={"Clear Account"}/>
			</div>
		</main>
	)
}

export default Account