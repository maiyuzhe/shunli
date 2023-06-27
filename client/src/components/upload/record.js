import { useState, useRef } from "react"

function Record(){

  //https://blog.logrocket.com/how-to-create-video-audio-recorder-react/

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

  return (
    <div
    className="flex flex-col items-center"
    >
      <button
        onClick={getAudioPermission}
        className={permission ? "hidden": "mt-2 px-2 font-gothic text-black border border-black rounded-md"}
      >
        Get Permission
      </button>
      <button
        className={!permission ? "hidden": "mt-2 px-2 font-gothic text-black border border-black rounded-md"}
        onClick={() => {
          if (recordingStatus == true){
            stopRecording()
          }
          else{
            startRecording()
          }
        }}
      >
        {!recordingStatus ? "Record" : "Stop Recording"}
      </button>
      <br/>
      <audio src={audio} controls></audio>
    </div>
  )
}

export default Record