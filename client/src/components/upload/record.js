import { useState, useRef } from "react"
import { useUser } from "@auth0/nextjs-auth0/client";
import GenericButton from "../buttons/genericButton";

function Record({appendAudio}){

  const {user} = useUser()

  const mimeType = "audio/x-wav"

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  async function getAudioPermission(){
    if ("MediaRecorder" in window){
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        })
        setPermission(true)
        setStream(streamData)
      }
      catch (error) {
        alert(error.message)
      }
    }
    else{
      alert("Audio recording is not supported in your browser.")
    }
  }

  async function startRecording(){
    setRecordingStatus(true)
    setAudioChunks([])
    const media = new MediaRecorder(stream, {type: mimeType})
    mediaRecorder.current = media
    mediaRecorder.current.start()
    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (e) => {
      if ( typeof e.data === "undefined") return
      if ( e.data.size === 0 ) return
      localAudioChunks.push(e.data)
    }
    setAudioChunks(localAudioChunks)
  }

  function stopRecording(){
    setRecordingStatus(false)
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudio(audioUrl)
      console.log(audioUrl)
      console.log(audioChunks)
    }
  }

  function handleUpload(){
    const formData = new FormData()
    const dateInfo = Date().toString().split(" ")
    const fileName = (`${dateInfo[1]}-${dateInfo[2]}-${dateInfo[3]}-${dateInfo[4].replaceAll(":", "-")}`)
    const audioBlob = new Blob(audioChunks, {type: mimeType})
    const newFile = new File([audioBlob], `${fileName}.webm`);
    formData.append("file", newFile)
    formData.append('email', user.email)
    fetch('http://localhost:5000/audio_stream', {
        method: "POST",
        body: formData
      })
      .then(res=> res.json())
      .then(data => {
        appendAudio(data)
        fetch('http://localhost:5000/transcriptions', {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            audio_id: data.id,
            filename: data.filename
          })
        })
      })
      .catch(error => console.log(error))
  }

  function toggleRecord()
  {
    if (recordingStatus === true) stopRecording();
    else startRecording();
  }

  return (
    <div
    className="flex flex-col items-center"
    >
      {permission ? "" : <GenericButton propFunc={getAudioPermission} buttonLabel={"Get Permission"}/>}
      <div
        className="flex flex-row"
      >
        <div
          className="relative"
        >
          {permission ? <GenericButton 
          propFunc={toggleRecord} 
          buttonLabel={recordingStatus ? "Stop Recording" : "Record"}/> : ""}
          {/* Flashing red circle to indicate recording */}
          {recordingStatus ? <div className="absolute right-0 top-0 animate-ping 
          animate-duration-[1500ms] animate-ease-out bg-red-500 
          rounded-full w-3 h-3 border border-black"/>: ""}
        </div>
        {audio ? <GenericButton propFunc={handleUpload} buttonLabel={"Upload Recording"} />: ""}
      </div>
      <br/>
      {/*Gives a nice preview with controls for the audio*/}
      {audio ? 
      <div className="absolute animate-fade-down animate-once 
      top-16 mt-4 border border-black rounded-full w-76">
        <audio src={audio} controls controlsList="timeline play nodownload foobar"></audio>
      </div> 
      : ""}
    </div>
  )
}

export default Record