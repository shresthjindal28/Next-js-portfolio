
"use client";


import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar';
import LazySection from '../Components/LazySection';
import SectionLoader from '../Components/SectionLoader';
import Model3D from '../Components/Model3D';

const Skills = lazy(() => import('../Section/Skills'));
const Contact = lazy(() => import('../Section/Contact'));
const Projects = lazy(() => import('../Section/Projects'));
const Experience = lazy(() => import('../Section/Experience'));
const HomeSection = lazy(() => import('../Section/Home'));

// Error boundary for 3D model
class Model3DErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Section wrapper
type SectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};
const Section = ({ id, className, children }: SectionProps) => (
  <section id={id} className={`py-16 md:py-24 w-full ${className || ''}`}>
    {children}
  </section>
);

const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

const Page = () => {
  return (
    <Suspense fallback={<SectionLoader />}>
      <div className="text-white min-h-screen relative w-full overflow-x-hidden bg-dark-800">
        
        {isDesktop && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Model3DErrorBoundary>
              <Suspense fallback={null}>
                <Model3D />
              </Suspense>
            </Model3DErrorBoundary>
          </div>
        )}
        {/* Overlay gradient to improve contrast with background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-800/80 to-dark-900/90 pointer-events-none" />
        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <AnimatePresence mode="wait">
            <Section id="home">
              <Suspense fallback={<SectionLoader />}>
                <HomeSection />
              </Suspense>
            </Section>
            <LazySection id="skills" className="bg-dark-900/30">
              <Skills />
            </LazySection>
            <LazySection id="experience">
              <Experience />
            </LazySection>
            <LazySection id="projects" className="bg-dark-900/30">
              <Projects />
            </LazySection>
            <LazySection id="contact">
              <Contact />
            </LazySection>
          </AnimatePresence>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
