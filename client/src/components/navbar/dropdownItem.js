import Link from "next/link";

function DropdownItem({destination, name}){
  return (
    <Link
    href={destination}
    className="cursor-pointer block py-2 px-5 text-base font-gothic t
    ext-body-color hover:bg-white hover:bg-opacity-5 hover:text-primary"
    >
      {name}
    </Link>
  )
}

export default DropdownItem;