
"use client";

import dynamic from 'next/dynamic';
import Navbar from '../Components/Navbar';
import SectionLoader from '../Components/SectionLoader';

const Model3D = dynamic(() => import('../Components/Model3D'), { ssr: false, loading: () => null });
const Skills = dynamic(() => import('../Section/Skills'), { loading: () => <SectionLoader /> });
const Contact = dynamic(() => import('../Section/Contact'), { loading: () => <SectionLoader /> });
const Projects = dynamic(() => import('../Section/Projects'), { loading: () => <SectionLoader /> });
const Experience = dynamic(() => import('../Section/Experience'), { loading: () => <SectionLoader /> });
const HomeSection = dynamic(() => import('../Section/Home'), { loading: () => <SectionLoader /> });

type SectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};
const Section = ({ id, className, children }: SectionProps) => (
  <section id={id} className={`py-16 md:py-24 w-full ${className || ''}`}>{children}</section>
);

const Page = () => {
  return (
    <div className="text-white min-h-screen relative w-full overflow-x-hidden bg-dark-800">
      {/* 3D model background always rendered */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Model3D />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Section id="home">
          <HomeSection />
        </Section>
        <Section id="skills">
          <Skills />
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="experience">
          <Experience />
        </Section>
        <Section id="contact">
          <Contact />
        </Section>
      </div>
    </div>
  );
};

export default Page;
