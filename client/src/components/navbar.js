import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function Navbar({user}){
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
            <a
              href="/" 
              className="text-2xl left-0 text-black font-gothic cursor-pointer">
                Shunli
            </a>
            <h1 className="cursor-default text-3xl fixed left-16 text-black font-gothic blur-[1.5px] opacity-50 hover:scale-110 hover:blur-none duration-300">
                順利
            </h1>
            <div ref={menuRef}>
                <div
                    onClick={() => {
                        if(user){
                            setdropdownOpen(!dropdownOpen)
                        }
                    }}
                    className={user ? 
                        "transition-all duration-300 absolute top-2 right-4 overflow-hidden w-12 h-12 rounded-full border-2 border-black cursor-pointer"
                        :
                        "hidden"
                    }>
                    <a>
                        <img alt="user" src={user? user.picture: ""}/>
                    </a>
                </div> 
                <div className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute w-42 right-4 z-40 mt-2 rounded border-[.5px] border-light bg-white bg-opacity-50 py-1 shadow-card transition-all`}>
                    <Link
                        href='/account'
                        className="cursor-pointer block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                    >
                        Account Details
                    </Link>
                    <Link
                        href='/vocabulary'
                        className="cursor-pointer block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                    >
                        Vocabulary
                    </Link>
                    {user ? <a
                        href='/api/auth/logout'
                        className="cursor-pointer block py-2 px-5 text-base font-gothic text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
                    >
                        Logout
                    </a> : ""}
                </div>
            </div>
        </div>
    )
}

export default Navbar