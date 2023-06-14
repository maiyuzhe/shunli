import { useRef, useState } from "react";
import {IoPlayBackSharp, IoPlayForwardSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoPlaySharp, IoPauseSharp,} from 'react-icons/io5'

function Playback({id}){

    const [play, setPlay] = useState(false)

    let audioRef = useRef()

    function toggleAudio(){
        !play ? audioRef.current.play() : audioRef.current.pause()
        setPlay(!play)
    }

    return (
        <div className="flex bg-black text-white w-6 h-6 rounded hover:bg-red-300 justify-center">
            <audio 
                ref={audioRef} 
                src={`http://localhost:5000/audio_stream/${id}`}
            />
            <button 
                onClick={toggleAudio}
            >
                {play ? <IoPauseSharp/> : <IoPlaySharp/>}
            </button>
        </div>
    )

}

export default Playback