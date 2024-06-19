
import { StoreItems } from "../constants";

const OurStore = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        OurStore
      </h2>
      <div className="flex flex-wrap">
      {StoreItems.map((item, index) => {
        // Iterate through the properties of each item
        for (let key in item) {
          // Access the image URL
          const imageUrl = item[key];
          // Render an image element with the URL and specified styling
          return (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
              <div className="p-10 border border-neutral-700 rounded-xl">
                <img src={imageUrl} alt={`Item ${index + 1}`} className="w-full h-auto mb-8" />
              </div>
            </div>
          );
        }
      })}
      </div>

      <center className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-gradient">Discover Unparalleled Quality</h2>
        <p className="text-lg mb-6 text-lg text-gray-500">
          Indulge in premium craftsmanship 
          that exceeds expectations. 
          Elevate your experience with meticulously curated products crafted for durability, functionality, and style.
        </p>
        <p className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text text-2xl font-bold">Explore our collection today.</p>
      </div>
    </center>


    </div>

  );
};

export default OurStore;
