import { useState, useRef } from "react"
import { useUser } from "@auth0/nextjs-auth0/client";

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
      setAudioChunks([])
      console.log(audioChunks)
    }
  }

  function handleUpload(){
    const formData = new FormData()
    const dateInfo = Date().toString().split(" ")
    const fileName = (`${dateInfo[1]}-${dateInfo[2]}-${dateInfo[3]}-${dateInfo[4].replaceAll(":", "-")}`)
    const newFile = new File([audioChunks], `${fileName}.mp3`);
    formData.append("file", newFile)
    formData.append('email', user.email)
    formData.append('type', 'recording')
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

  return (
    <div
    className="flex flex-col items-center"
    >
      <button
        onClick={getAudioPermission}
          className={permission ? "hidden"
          :
          "antialiased m-2 transition ease-in-out font-gothic border-black border rounded-md px-2 hover:scale-105 hover:duration-150"
          }
        >
        Get Permission
      </button>
      <div
        className="flex flex-row"
      >
        <div
          className="relative"
        >
          <button
            className={!permission ? "hidden": 
            "antialiased mx-1 transition ease-in-out font-gothic border-black border rounded-md px-2 hover:scale-105 hover:duration-150"
            }
            onClick={() => {
              if (recordingStatus === true){
                stopRecording()
              }
              else{
                startRecording()
              }
            }}
          >
            {!recordingStatus ? "Record" : "Stop Recording"}
          </button>
          <div
            className={recordingStatus ? 
              "absolute right-0 top-0 animate-ping animate-duration-[1500ms] animate-ease-out bg-red-500 rounded-full w-3 h-3 border border-black"
              :
              "hidden"
            }
          >
          </div>
        </div>
        <button
          className={audio ?
            "antialiased mx-1 transition ease-in-out font-gothic border-black border rounded-md px-2 hover:scale-105 hover:duration-150"
            :
            "hidden"
          }
          onClick={handleUpload}
        >
          Upload Recording
        </button>
      </div>
      <br/>
      <div className={audio ? 
        "absolute animate-fade-down animate-once top-16 mt-4 border border-black rounded-full w-76"
        :
        "hidden"  
      }>
        <audio src={audio} controls controlsList="timeline play nodownload foobar"></audio>
      </div>
    </div>
  )
}

export default Record