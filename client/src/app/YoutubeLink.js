function YoutubeLink(){

  function PostYoutubeURL(url){
    fetch("http://localhost:5000/audio_stream", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify([])
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  return (
    <form onSubmit={(e) => PostYoutubeURL(e.target.value)}>
      <input>
      </input>
    </form>
  )

}

export default YoutubeLink