import GenericButton from "../buttons/genericButton";

function AccountCard({user}){
  return (
    <div
    className="flex flex-col mt-24 w-[40rem] text-center items-center 
    justify-center bg-white text-black font-gothic rounded-xl"
    >
      <img 
        className="rounded-full w-48 h-48 mt-4 border border-black border-2"
        alt="profile-pic" 
        src={user ? user.picture : ""}
      />
      {user ?
        <h1
          className="mt-4"
        >
          {user.name}
          <br/>
          {user.email}
          <br/>
          Uploads:
        </h1>
      : ""}
      <GenericButton buttonLabel={"Clear Account"}/>
    </div>
  )
}

export default AccountCard;