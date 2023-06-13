import { useState } from "react";

function Navbar(){
    const [dropdownOpen, setdropdownOpen] = useState(false);

    return (
        <div className="flex justify-items-stretch fixed top-0 bg-white w-screen p-4 bg-opacity-50 border-b-2 border-white">
            <h1 className="text-xl justify-self-start text-black font-gothic">
                SHUNLI
            </h1>
            <div
                 onClick={() => setdropdownOpen(!dropdownOpen)}
                 class="absolute right-4 bg-black overflow-hidden w-8 h-8 flex justify-center items-center
                 hover:cursor-pointer 
                 ">
             </div> 
                <div class={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute w-42 right-4 z-40 mt-2 rounded border-[.5px] border-light bg-white bg-opacity-50 py-5 shadow-card transition-all`}>
                 <a
                     href="javascript:void(0)"
                     class="block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                 >
                     Account Details
                 </a>
                 <a
                     href="javascript:void(0)"
                     class="block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                 >
                     Settings
                 </a>
                 <a
                     href="javascript:void(0)"
                     class="block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                 >
                     Logout
                 </a>
             </div>
        </div>
    )
}

export default Navbar