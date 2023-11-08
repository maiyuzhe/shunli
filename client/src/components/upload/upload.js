import { useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Record from "./record";
import GenericButton from "../buttons/genericButton";

function Upload({appendAudio}) {

  const {user} = useUser()

  const [record, setRecord] = useState(false)

  const [linkPlaceholder, setPlaceholder] = useState("Youtube Link")

  const hiddenFileInput = useRef(null);
  
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('email', user.email)
      fetch('http://localhost:5000/audio_stream', {
        method: "POST",
        body: formData
      })
      .then(res=> res.json())
      .then(data => appendAudio(data))
      .catch(error => console.log(error))
    }
  };

  const uploadYoutube = (e) => {
    e.preventDefault()
    if(e.target.url.value == "")
    {
      setPlaceholder("Please Enter URL");
      return;
    }
    fetch("http://localhost:5000/audio_stream", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({url: e.target.url.value, type: "url", email: user.email})
    })
    .then(res => res.json())
    .then(data => appendAudio(data))
    .catch(error => console.log(error))
  }

  function recordToggle()
  {
    setRecord(!record);
  }
  
  return (
    <div
    className="flex flex-col items-center m-1 text-black justify-center"
    >
      <div
        className={`flex flex-row flex-wrap justify-center 
        ${record ? "hidden" : ""}`}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <GenericButton propFunc={handleClick} buttonLabel={"Upload Audio"}/>
          <input className="hidden" type="file" ref={hiddenFileInput} onChange={handleChange}/>
        </form>
        <form  onSubmit={uploadYoutube}
        className="flex flex-row">
          <input placeholder={linkPlaceholder} type="url"name="url"
          className="m-3 font-gothic text-center border border-black" 
          />
          <GenericButton buttonLabel={"Upload Youtube Audio"} extraCSS={"text-xs"}/>
        </form>
      </div>

      <GenericButton propFunc={recordToggle} 
      buttonLabel={record ? "Return to Upload" : "Submit Recording"}
      propFuncArg={record}/>

      {record ? <Record appendAudio={appendAudio}/> : ""}
      
    </div>
  );
};

export default Upload