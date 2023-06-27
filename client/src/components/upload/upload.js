import { useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Record from "./record";

function Upload({appendAudio}) {

  const {user} = useUser()

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
      .then(data => {
        appendAudio(data)
        fetch('http://localhost:5000/transcriptions', {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            audio_id: data.id,
            filename: data.filename
          })
        })
      })
      .catch(error => console.log(error))

    }
  };

  const uploadYoutube = (e) => {
    e.preventDefault()
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
  
  return (
    <div
    className="flex flex-col items-center m-1 text-black"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <button 
        onClick={handleClick}
        className="antialiased transition ease-in-out font-gothic border-black border rounded-md px-2 hover:scale-105 hover:duration-150"
        >
          Upload File
        </button>
        <input className="hidden" type="file" ref={hiddenFileInput} onChange={handleChange}/>
      </form>
      <form  onSubmit={uploadYoutube}>
        <input placeholder="Youtube Link" type="url"name="url"
        className="m-3 font-gothic text-center border border-black hidden" 
        />
      </form>
      <Record/>
    </div>
  );
};

export default Upload