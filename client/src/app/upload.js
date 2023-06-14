function Upload({appendAudio}) {

    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const formData = new FormData()
        console.log(file.type, file.size)
        formData.append('file', file)
        console.log(formData)
        fetch('http://localhost:5000/audio_stream', {
          method: "POST",
          body: formData
        })
        .then(res=> res.json())
        .then(data => appendAudio(data))
        .catch(error => console.log(error))

      }
    };
    
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={handleChange} />
      </form>
    );
};

export default Upload