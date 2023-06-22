const { useEffect, useState } = require("react");
import AudioEntry from "./audioentry";

function AudioList({audioFiles}){

    return (
        <div className="flex flex-col items-center w-[45rem]">
            {audioFiles ? audioFiles.map((audioFile) => {
                return <AudioEntry id = {audioFile.id} key ={audioFile.id} name={audioFile.filename}/>
            }) : <p>upload files</p>}
        </div>
    )
}

export default AudioList