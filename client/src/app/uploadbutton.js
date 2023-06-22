import { useState } from "react"
import Upload from "./upload"

function UploadButton({appendAudio}){

  const [uploadTrue, setUpload] = useState(false)

  return (
    <div className={
      uploadTrue ? "transition-all delay-150 flex justify-center relative w-72 bg-white h-9 rounded m-2"
      :
      "transition-all flex justify-center relative w-72 h-28 bg-white rounded"
    }
    >
      <p
      className="absolute left-1 top-1 text-black font-bold font-gothic"
      >
        Upload
      </p>
      <p
      className="absolute left-5 top text-black text-3xl blur-[1px] opacity-50 z-0"
      >
        上傳
      </p>
      <button onClick={() => setUpload(!uploadTrue)}
      className={uploadTrue ? "transition-all delay-150 absolute top-1 left-32 text-black font-black w-4" : "transition-all absolute top-1 left-64 text-black font-black w-4"}
			>
        {uploadTrue ? "+" : "-"}
      </button>
      <div className={uploadTrue ? "transition-all invisible absolute top-1": "transition-all delay-150 visible absolute top-8"}>
        <Upload appendAudio={appendAudio}/>
      </div>
    </div>
  )
}

export default UploadButton