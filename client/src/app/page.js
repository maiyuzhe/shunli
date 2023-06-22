"use client"
import { useState, useEffect } from "react"
import AudioList from "./audiolist"
import Navbar from "./navbar"
import UploadButton from "./uploadbutton"

function Home() {
  
  const [audioFiles, setAudioFiles] = useState([])

  useEffect(() => {
      fetch('http://localhost:5000/audio_stream')
      .then(res => res.json())
      .then(data => setAudioFiles(data))
      .catch(error => console.log(error))
  },[])

  function appendAudio(data){
    console.log(data)
    setAudioFiles([...audioFiles, data])
  }

  return (
    <main className="flex flex-col items-center h-screen">
      <div className="mt-24">
        <UploadButton appendAudio={appendAudio}/>
      </div>
      <div className="flex flex-col items-center overflow-y-scroll mt-12">
        <AudioList audioFiles={audioFiles}/>
      </div>
        <Navbar/>
    </main>
  )
}

export default Home