'use client';

import DomeGallery from '@/components/reactbits/DomeGallery';

const photos = [
  '/photography/1 (1).jpg',
  '/photography/1 (2).jpg',
  '/photography/1 (3).jpg',
  '/photography/1 (4).jpg',
  '/photography/1 (5).jpg',
  '/photography/1 (6).jpg',
  '/photography/1 (7).jpg',
  '/photography/1 (8).jpg',
  '/photography/2 (2).jpg',
  '/photography/2 (3).jpg',
  '/photography/2 (4).jpg',
  '/photography/2 (5).jpg',
  '/photography/2 (6).jpg',
  '/photography/2 (7).jpg',
  '/photography/2 (8).jpg',
  '/photography/3 (1).jpg',
  '/photography/3 (2).jpg',
  '/photography/3 (3).jpg',
  '/photography/3 (4).jpg',
  '/photography/3 (5).jpg',
  '/photography/3 (6).jpg',
  '/photography/3 (7).jpg',
  '/photography/3 (8).jpg',
];

export default function PhotographyExperiment() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#060010' }}>
      <DomeGallery
        images={photos}
        fit={1}
        minRadius={1000}
        maxVerticalRotationDeg={11}
        segments={30}
        dragDampening={2.5}
        grayscale={false}
        overlayBlurColor="#060010"
        openedImageWidth="500px"
        openedImageHeight="500px"
      />
    </div>
  );
}
