function Term({vocab}){
  return (
    <div
      className="transition ease-in-out flex flex-row m-2 px-2 py-1 border-b-2 border-black hover:scale-105"
    >
      <p
        className="mx-1"
      >
        {vocab.word}
      </p>
      <p
        className="mx-1"  
      >
        -
      </p>
      <p
        className="mx-1"
      >
        {vocab.definition}
      </p>
    </div>
  )
}

export default Term