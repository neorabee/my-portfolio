import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGrid from "@/components/ProjectsGrid";
import Profile from "@/components/Profile";
import Explorations from "@/components/Explorations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProject />
        <ProjectsGrid />
        <Profile />
        <Explorations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
