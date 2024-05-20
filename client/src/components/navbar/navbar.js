import NavbarLinks from "./links";
import NavbarDropdown from "./navbarDropdown";

function Navbar({user}){

    const links = [
        {
            title: "Shunli",
            ch_back: "順利",
            destination: "/"
        },
        {
            title: "Analyze",
            ch_back: "分析",
            destination: "/"
        },
        {
            title: "Texts",
            ch_back: "文件",
            destination: "/texts"
        },
        {
            title: "Explore",
            ch_back: "浏览",
            destination: "/explore"
        }
    ]

    return (
        <div className="flex justify-items-stretch fixed top-0 z-50
        bg-black/50 dark:bg-white/50 w-screen p-4 border-b-2 border-black dark:border-white">
            {links.map((link) => <NavbarLinks 
            destination={link.destination} ch_back={link.ch_back}
            title={link.title} key={link.title}/>)}

            {user ? <NavbarDropdown user={user}/> : ""}
        </div>
    )
}

export default Navbar