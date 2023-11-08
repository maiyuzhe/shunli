function GenericButton({propFunc, buttonLabel, extraCSS}){
  return (
    <button
    onClick={propFunc}
    className={`antialiased m-2 transition ease-in-out font-gothic 
    border-black border rounded-md px-2 hover:scale-105 hover:duration-150
    ${extraCSS}`}
    >
      {buttonLabel}
    </button>
  )
}

export default GenericButton;