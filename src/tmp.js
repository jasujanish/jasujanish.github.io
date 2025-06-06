return (
  <div className="min-h-screen flex flex-col bg-black text-white cursor-cell font-mono overflow-hidden">
    <header
      className="
        relative
        flex items-start justify-start   
        w-full h-2/5
        bg-cover bg-center
        p-10
        pt-16
        lg:p-16
        lg:pt-20
        xl:p-24
        2xl:p-32
        2xl:pt-36
        text-left                         
      "
    >
      <div className="
          w-full
          sm:w-3/4
          md:w-3/4            
          pl-4 md:pl-8 lg:pl-16 
      ">
        {/* Rotating Greeting, Hover Gradient */}
        <h1 className="font-sans mb-12">
          <Greeting />
        </h1>

        {/* Description */}
        <div className="text-balance text-gray-300 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed font-light">
          <p className="hover:cursor-text">Sophomore at Carnegie Mellon University</p>
          <p className="hover:cursor-text">Passionate about machine learning, deep learning, robotics, and computer systems</p>
        </div>
      </div>
    </header>
    <>
    <div  className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 mt-auto">
          <Link
            to={currentRoutes[0]}
            key={currentRoutes[0]}
            className="block"
          >
            <GridElement
              image_background={currentImages[0]}
              text={currentTexts[0]}
            />
          </Link>
          <Link
            to={currentRoutes[1]}
            key={currentRoutes[1]}
            className="block"
          >
            <GridElement
              image_background={currentImages[1]}
              text={currentTexts[1]}
            />
          </Link>
          <a href={currentLinkedIn} target="_blank" rel="noopener noreferrer">
            <GridElement image_background={currentImages[2]} text={currentTexts[2]} />
          </a>
          <Link
            to={currentRoutes[3]}
            key={currentRoutes[3]}
            className="block"
          >
            <GridElement
              image_background={currentImages[3]}
              text={currentTexts[3]}
            />
          </Link>
      </div>
    </>
  </div>
);
}
