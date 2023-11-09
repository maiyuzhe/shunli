import NavbarDropdown from "./navbarDropdown";

function Navbar({user}){

    return (
        <div className="flex justify-items-stretch fixed top-0 z-40
        bg-white w-screen p-4 bg-opacity-50 border-b-2 border-white">
            <a
              href="/" 
              className="text-2xl left-0 text-black font-gothic cursor-pointer">
                Shunli
            </a>
            <h1 className="cursor-default text-3xl fixed left-16 text-black font-gothic 
            blur-[1.5px] opacity-50 hover:scale-110 hover:blur-none duration-300">
                順利
            </h1>
            {user ? <NavbarDropdown user={user}/> : ""}
        </div>
    )
}

export default Navbar