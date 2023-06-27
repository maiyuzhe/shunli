import { useState } from "react"
import Upload from "./upload"

function UploadButton({appendAudio}){

  const [uploadTrue, setUpload] = useState(true)

  return (
    <div className={
      uploadTrue ? "transition-all delay-150 flex justify-center relative w-80 bg-white h-9 rounded m-2"
      :
      "transition-all flex justify-center relative w-80 h-48 bg-white rounded"
    }
    >
      <p
      className="absolute cursor-default left-1 top-1 text-black font-bold font-gothic"
      >
        Upload
      </p>
      <p
      className="absolute cursor-default left-5 top text-black text-3xl blur-[1px] opacity-50 z-0 hover:scale-110 hover:blur-none duration-300"
      >
        上傳
      </p>
      <button onClick={() => setUpload(!uploadTrue)}
      className={uploadTrue ? "transition-all delay-150 absolute top-1 left-36 text-black font-black w-4 hover:scale-150 hover:delay-0" : "transition-all absolute top-1 left-72 text-black font-black w-4 hover:scale-150 hover:delay-0"}
			>
        {uploadTrue ? "+" : "-"}
      </button>
      <div className={uploadTrue ? "transition-all invisible absolute top-1": "animate-fade-down animate-once animate-duration-500 visible absolute top-8"}>
        <Upload appendAudio={appendAudio}/>
      </div>
    </div>
  )
}

export default UploadButton