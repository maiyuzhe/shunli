import { useEffect, useState, useRef } from "react";
import DropdownItem from "./dropdownItem";

function NavbarDropdown({user}){

  const [dropdownOpen, setDropdownOpen] = useState(false);

  let menuRef = useRef();

  const menuItems = [
    {
      name: "Account",
      destination: "/account"
    },
    {
      name: "Vocabulary",
      destination: "/vocabulary"
    },
    {
      name: "Log Out",
      destination: "/api/auth/logout"
    }
  ]

  useEffect(() => {
      function handler(e) {
          if(!menuRef.current.contains(e.target)){
              setDropdownOpen(false);
          }
      }
      document.addEventListener("mousedown", handler)

      return() => {
          document.removeEventListener("mousedown", handler)
      }
  });

  return (
    <div ref={menuRef}>
      <button
        onClick={()=> {if(user)setDropdownOpen(!dropdownOpen)}}
        className="transition-all duration-300 absolute top-2 right-4 
        overflow-hidden w-12 h-12 rounded-full border-2 border-black cursor-pointer">
            <img alt="user" src={user.picture}/>
      </button> 
      <div className={`${dropdownOpen ? 'top-full opacity-100 visible' : 'top-[110%] invisible opacity-0'} 
      absolute w-42 right-4 mt-2 rounded border-[.5px] border-black dark:border-white bg-black/50 dark:bg-white/50 py-1 shadow-card transition-all`}
      >
          {menuItems.map((menuItem) => <DropdownItem name={menuItem.name} destination={menuItem.destination}/>)}
      </div>
    </div>
  )
}

export default NavbarDropdown