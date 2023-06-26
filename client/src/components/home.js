import { useState, useEffect } from "react"
import AudioList from "./audio/audiolist"
import Navbar from "./navbar"
import UploadButton from "./upload/uploadbutton"
import { useUser } from "@auth0/nextjs-auth0/client"

function Home() {

  const { user } = useUser();

  const [audioFiles, setAudioFiles] = useState([{
    id: 1,
    filename: "file",
  }])
  
  useEffect(() => {
      fetch('http://localhost:5000/audio_stream')
      .then(res => res.json())
      .then(data => setAudioFiles(data))
      .catch(error => console.log(error))
  },[])

  function appendAudio(data){
    setAudioFiles([...audioFiles, data])
  }

  return (
    <main className="flex flex-col items-center h-screen">
      {user ? 
      <div 
      className="flex flex-col mt-24 w-screen items-center overflow-y-scroll"
      >
        <div>
          <UploadButton appendAudio={appendAudio}/>
        </div>
        <div className="flex flex-col items-center mt-6 ml-2">
          <AudioList audioFiles={audioFiles}/>
        </div>
      </div> 
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