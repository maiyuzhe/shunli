import { useEffect, useState } from "react";

function Playback({audioId}){

    const [audioPlay, setPlay] = useState(false)
    
    const [audioFile, setAudio] = useState(null)

    const ctx = new AudioContext()

    function getResponse(){
        fetch(`http://localhost:5000/audio_download/${audioId}`)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodedAudio => setAudio(decodedAudio))
        .catch(error => console.log(error))
    }

    function playAudio() {
        
        setTimeout(getResponse(), 5000)

        const startAudio = ctx.createBufferSource()
        startAudio.buffer = audioFile
        startAudio.connect(ctx.destination)
        startAudio.start(ctx.currentTime)
        setPlay(true)
        // else{
        //     startAudio.stop(ctx.currentTime)
        //     setPlay(false)
        // }
    }

    return (
        <div>
            <button onClick={playAudio}>Play Audio</button>
        </div>
    )

}

export default Playback