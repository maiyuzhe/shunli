const { useEffect, useState } = require("react");
import AudioEntry from "./audioentry";

function AudioList({audioFiles}){

    

    return (
        <ul>
            {audioFiles ? audioFiles.map((audioFile) => {
                return <AudioEntry id = {audioFile.id} key ={audioFile.id} name={audioFile.filename}/>
            }) : <p>upload files</p>}
        </ul>
    )
}

export default AudioList