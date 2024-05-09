function Custom404(){
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="mb-24 flex flex-col items-center justify-center">
        <img src="/xtt404.gif" alt="404"/>
        <h1>
          一点也不顺利！
        </h1>
        <p>
          Page not found.
        </p>
        <a href="/"
        className="underline decoration-solid">
          Return Home
        </a>
      </div>
    </main>
  )
};

export default Custom404