import AudioList from "./audio/audiolist"
import Navbar from "./navbar"
import { useUser } from "@auth0/nextjs-auth0/client"


function Home() {

  const { user } = useUser();

  return (
    <main className="flex flex-col items-center h-screen">
      {user ? 
      <AudioList/>
      : 
      <div
      className="flex flex-col items-center relative mt-24"
      >
        <div
        className="transition ease-in-out blur-sm hover:blur-none invert"
        >
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/%E6%96%87-order.gif" 
          alt="char"
          />
        </div>
        <a
        href='/api/auth/login'
        className="absolute top-10 mix-blend-difference	transition ease-in-out text-5xl border border-white rounded px-4 mt-24 font-gothic hover:scale-110 hover:duration-150"
        >
          Login
        </a>
      </div>
      }
      <Navbar user={user}/>
    </main>
  )
}

export default Home