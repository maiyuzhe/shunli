function AudioEntry({id, name, setAudio}){

    function switchAudio(){
        console.log(`${name} selected.`)
        setAudio(id)
    }

    return(
        <li onClick={switchAudio}>
            {name}
        </li>
    )
}

export default AudioEntry