function NavbarLinks({destination, title, ch_back}){
  return (
    <a href={destination}
    className="text-2xl left-0 select-none relative
    text-black font-gothic cursor-pointer mx-4 z-10">
      {title}
      <h1 className="select-none text-2xl absolute top-1 left-1
      text-black font-gothic blur-[1.5px] opacity-50 
      hover:scale-110 hover:blur-none duration-300">
        {ch_back}
      </h1>
    </a>
  )
}

export default NavbarLinks