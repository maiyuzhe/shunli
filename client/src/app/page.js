"use client"
import { useState, useEffect } from "react"
import AudioList from "./audiolist"
import Navbar from "./navbar"
import Upload from "./upload"

function Home() {
  
  const [audioFiles, setAudioFiles] = useState([])
  const [uploadTrue, setUpload] = useState(false)

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        {uploadTrue ? <Upload appendAudio={appendAudio}/> : <button onClick={() => setUpload(true)}>Upload File</button>}
        <AudioList audioFiles={audioFiles}/>
      </div>
      <Navbar/>
    </main>
  )
}

export default Home