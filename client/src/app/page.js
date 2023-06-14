"use client"
import { useState, useEffect } from "react"
import AudioList from "./audiolist"
import Navbar from "./navbar"
import Upload from "./upload"

function Home() {
  
  const [audioFiles, setAudioFiles] = useState([])

  useEffect(() => {
      fetch('http://localhost:5000/audio_upload')
      .then(res => res.json())
      .then(data => setAudioFiles(data))
      .catch(error => console.log(error))
  },[])

  function appendAudio(data){
    setAudioFiles([...audioFiles, data])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar/>
      <div>
      https://blog.logrocket.com/building-audio-player-react/
        <Upload appendAudio={appendAudio}/>
        <AudioList audioFiles={audioFiles}/>
      </div>
    </main>
  )
}

export default Home