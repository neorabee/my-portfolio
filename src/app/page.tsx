import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGrid from "@/components/ProjectsGrid";
import Profile from "@/components/Profile";
import Explorations from "@/components/Explorations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlobalRoadmap from "@/components/GlobalRoadmap";

import { RoadmapProvider } from "@/components/RoadmapContext";

export default function Home() {
  return (
    <RoadmapProvider>
      <Navbar />
      <main className="relative overflow-x-hidden">
        <GlobalRoadmap />
        <Hero />
        <Profile />
        <FeaturedProject />
        <ProjectsGrid />
        <Contact />
        <Explorations />
      </main>
      <Footer />
    </RoadmapProvider>
  );
}
