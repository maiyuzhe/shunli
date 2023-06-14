import { useEffect, useState } from "react";
import {IoPlayBackSharp, IoPlayForwardSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoPlaySharp, IoPauseSharp,} from 'react-icons/io5'

function Playback({audioId}){

    const [audioPlay, setPlay] = useState(false)

    

    function playAudio(){
        // if(ctx.state == "running"){
        //     console.log(ctx)
        //     fetch(`http://localhost:5000/audio_download/${audioId}`)
        //     .then(data => data.arrayBuffer())
        //     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        //     .then(decodedAudio => {
        //         const startAudio = ctx.createBufferSource()
        //         startAudio.buffer = decodedAudio
        //         startAudio.connect(ctx.destination)
        //         startAudio.start(ctx.currentTime)
        //         console.log(ctx)
        //     })
        //     .catch(error => console.log(error))
        // }
        // else if(ctx.state === "suspended"){
        //     ctx.resume()
        // }
        // else{
        //     ctx.suspend()
        // }
        const audio = new Audio(`http://localhost:5000/audio_download/${audioId}`)
        console.log(audio)
        !audioPlay ? audio.play() : audio.pause()
        setPlay(!audioPlay)
    }

    return (
        <div className="bg-white text-black rounded p-2 m-2 hover:bg-red-300">
            <button onClick={playAudio}><IoPlaySharp/></button>
        </div>
    )

}

export default Playback