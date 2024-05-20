const { useEffect, useState } = require("react");
import AudioEntry from "./audioEntry";
import UploadButton from "../upload/uploadButton";
import { useUser } from "@auth0/nextjs-auth0/client"

function AudioList(){

    const [audioFiles, setAudioFiles] = useState();

    const {user} = useUser();
    
    function appendAudio(data){
      setAudioFiles([...audioFiles, data])
      fetch(`http://localhost:5000/transcriptions`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
            upload_id: data.id,
            filename: data.filename
        })
      })
    };

    function removeEntry(id){
      const newAudioFiles = audioFiles.filter(audio=> audio.id != id);
      setAudioFiles(newAudioFiles);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/audio_stream/${user.email}`)
        .then(res => res.json())
        .then(data => {
            if(data["error"]) setAudioFiles([]);
            else setAudioFiles(data);
            
        })
        .catch(error => console.log(error))
    },[])

    return (
        <div 
        className="flex flex-col mt-24 w-screen items-center overflow-y-scroll"
        >
            <UploadButton appendAudio={appendAudio}/>
            {audioFiles ? audioFiles.map((audioFile) => {
                return <AudioEntry id = {audioFile.id} 
                key ={audioFile.name} 
                name={audioFile.filename}
                removeEntry={removeEntry}/>
            }) : <p>upload files!</p>}
        </div>
    )
}

export default AudioList