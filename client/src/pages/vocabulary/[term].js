import Navbar from "@/components/navbar/navbar"
import VocabDetail from "@/components/vocab/individual/vocabDetail";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
function TermPage(){

const user = useUser();

  const router= useRouter();

	return (
		<main
		className="flex flex-col items-center h-screen"
		>
			<Navbar user={user}/>
      <VocabDetail vocabObject={router.query.term}/>
		</main>
	)
};

export default TermPage