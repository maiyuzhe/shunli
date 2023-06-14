"use client"
import { useState } from "react"
import AudioList from "./audiolist"
import Navbar from "./navbar"
import Playback from "./playback"
import Upload from "./upload"

function Home() {

  const [audioId, setAudio] = useState(1)

  function changeTrack(id){
    console.log(`changed to track with id of ${id}`)
    setAudio(id)
    console.log(audioId)
  }

  function appendAudio(data){
    console.log(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar/>
      <Upload appendAudio={appendAudio}/>
      <AudioList setAudio={changeTrack}/>
      <Playback audioId={audioId}/>
    </main>
  )
}

export default Home