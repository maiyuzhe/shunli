import Navbar from "../components/navbar"

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
					THIS IS MY ACCOUNT PAGE, THERE ARE MANY LIKE IT, BUT THIS ONE IS DISTINCTLY MINE
				</h1>
			</div>
		</main>
	)
}

export default Account