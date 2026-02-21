import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFish from "@/components/FeaturedFish";
import RecipeSection from "@/components/RecipeSection";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedFish />
      <WhyChoose />
      <RecipeSection />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;