const { useEffect, useState } = require("react");
import AudioEntry from "./audioentry";

function AudioList({setAudio}){

    const [audioFiles, setAudioFiles] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/audio_upload')
        .then(res => res.json())
        .then(data => setAudioFiles(data))
        .catch(error => console.log(error))
    },[])

    return (
        <ul>
            {audioFiles.map((audioFile) => {
                return <AudioEntry setAudio={setAudio} id = {audioFile.id} key ={audioFile.id} name={audioFile.filename}/>
            })}
        </ul>
    )
}

export default AudioList