// LazySection component

import React, { Suspense } from 'react';

type LazySectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const LazySection = ({ id, className, children }: LazySectionProps) => {
  return (
    <section id={id} className={`w-full ${className || ''}`}>
      <Suspense fallback={<div>Loading section...</div>}>
        {children}
      </Suspense>
    </section>
  );
};

export default LazySection;
