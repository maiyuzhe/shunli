import Playback from "./playback"

function AudioEntry({id, name}){

    return(
        <li className="flex">
            <a>
              {name}
            </a>
            <a>
              <Playback audioId={id}/>
            </a>
        </li>
    )
}

export default AudioEntry