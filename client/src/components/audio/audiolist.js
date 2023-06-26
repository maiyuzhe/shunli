const { useEffect, useState } = require("react");
import AudioEntry from "./audioentry";
import { useUser } from "@auth0/nextjs-auth0/client";

function AudioList({audioFiles}){

    const { user } = useUser()

    const filteredAudio = audioFiles.filter(file => file.email ==user.email )

    return (
        <div className="flex flex-col items-center w-[45rem] overflow-y-scroll">
            {audioFiles ? filteredAudio.map((audioFile) => {
                return <AudioEntry id = {audioFile.id} key ={audioFile.id} name={audioFile.filename}/>
            }) : <p>upload files</p>}
        </div>
    )
}

export default AudioList