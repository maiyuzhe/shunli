import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function NavbarDropdown({user}){

  const [dropdownOpen, setdropdownOpen] = useState(false);

  let menuRef = useRef();

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
  });

  return (
    <div ref={menuRef}>
      <div
          onClick={()=> {if(user)setdropdownOpen(!dropdownOpen)}}
          className="transition-all duration-300 absolute top-2 right-4 
          overflow-hidden w-12 h-12 rounded-full border-2 border-black cursor-pointer">
          <a>
              <img alt="user" src={user.picture}/>
          </a>
      </div> 
      <div className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute w-42 right-4 mt-2 rounded border-[.5px] border-light bg-black bg-opacity-80 py-1 shadow-card transition-all`}>
          <Link
              href='/account'
              className="cursor-pointer block py-2 px-5 text-base font-gothic t
              ext-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
          >
              Account Details
          </Link>
          <Link
              href='/vocabulary'
              className="cursor-pointer block py-2 px-5 text-base font-gothic 
              text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
          >
              Vocabulary
          </Link>
          <a
              href='/api/auth/logout'
              className="cursor-pointer block py-2 px-5 text-base font-gothic 
              text-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
          >
              Logout
          </a>
      </div>
    </div>
  )
}

export default NavbarDropdown