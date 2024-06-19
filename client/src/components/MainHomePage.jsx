import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Footer from "./Footer";
import OurStore from "./OurStore";
import Testimonials from "./Testimonials";

const MainHomePage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <OurStore />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};


export default MainHomePage;
