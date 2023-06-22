"use client"
import Navbar from "@/app/navbar"
import "../app/globals.css"
function Account(){
	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar/>
			<div
			className="py-24"
			>
				<h1>
					THIS IS MY SETTINGS PAGE, THERE ARE MANY LIKE IT, BUT THIS ONE IS DISTINCTLY MINE
				</h1>
			</div>
		</main>
	)
}

export default Account