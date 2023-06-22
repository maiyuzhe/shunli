import { useEffect, useState, useRef } from "react";

function Navbar(){
    const [dropdownOpen, setdropdownOpen] = useState(false);

    let menuRef = useRef()

    useEffect(() => {
        function handler(e) {
            if(!menuRef.current.contains(e.target)){
                setdropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handler)

        return() => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return (
        <div className="flex justify-items-stretch fixed top-0 bg-white w-screen p-4 bg-opacity-50 border-b-2 border-white">
            <h1 className="text-2xl left-0 text-black font-gothic">
                Shunli
            </h1>
            <h1 className="text-3xl fixed left-16 text-black font-gothic blur-[1px] opacity-50">
                順利
            </h1>
            <div ref={menuRef}>
                <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="transition-all duration-300 absolute right-4 bg-black overflow-hidden w-8 h-8 flex justify-center items-center rounded
                    hover:cursor-pointer hover:bg-white hover:text-black
                    ">
                    <a>
                        =
                    </a>
                </div> 
                <div className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute w-42 right-4 z-40 mt-2 rounded border-[.5px] border-light bg-white bg-opacity-50 py-1 shadow-card transition-all`}>
                    <a
                        className="block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                    >
                        Account Details
                    </a>
                    <a
                        className="block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                    >
                        Settings
                    </a>
                    <a
                        className="block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                    >
                        Logout
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar