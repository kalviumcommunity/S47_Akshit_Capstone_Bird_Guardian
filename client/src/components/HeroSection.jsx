


//  videos  import
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
      Welcome to Bird 
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "} 
          Guardian <br />  <span className="bg-gradient-to-r from-yellow-500 to-green-800  text-transparent bg-clip-text mx-2 lg:text-4xl text-2xl"> Your trusted companion in bird conservation </span> 
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      At Bird Guardian, We&#39;re committed to understanding and enhancing the lives
      of our feathered friends. Explore a comprehensive resource on bird behavior,
      habitats, and conservation efforts.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          Start For Free  {/* Add link to sign in */}
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
        Learn More {/* add a a document link regarding bird */}
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
