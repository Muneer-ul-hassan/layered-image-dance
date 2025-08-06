import { useState, useEffect } from 'react';
import fashion1 from '@/assets/fashion-1.jpg';
import fashion2 from '@/assets/fashion-2.jpg';
import fashion3 from '@/assets/fashion-3.jpg';
import fashion4 from '@/assets/fashion-4.jpg';
import fashion5 from '@/assets/fashion-5.jpg';

const fashionImages = [
  { id: 1, src: fashion1, alt: 'Elegant Evening Dress' },
  { id: 2, src: fashion2, alt: 'Sleek Black Outfit' },
  { id: 3, src: fashion3, alt: 'Brown Luxury Dress' },
  { id: 4, src: fashion4, alt: 'Black Mini Dress' },
  { id: 5, src: fashion5, alt: 'Black Ensemble' },
];

export const FashionCarousel = () => {
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'stacked' | 'spread'>('hidden');

  useEffect(() => {
    // Start animation sequence automatically
    const timer1 = setTimeout(() => {
      setAnimationPhase('stacked');
    }, 500);

    const timer2 = setTimeout(() => {
      setAnimationPhase('spread');
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-luxury-dark rounded-full"></div>
          </div>
          <h1 className="text-2xl font-light tracking-widest text-luxury-gold">ZEVANA</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-luxury-border/30 flex items-center justify-center hover:bg-luxury-surface/20 transition-colors">
            <div className="w-4 h-4 rounded-full border border-luxury-gold"></div>
          </button>
          <button className="w-10 h-10 rounded-full border border-luxury-border/30 flex items-center justify-center hover:bg-luxury-surface/20 transition-colors">
            <div className="w-3 h-3 bg-luxury-gold rounded-full"></div>
          </button>
          <button className="px-4 py-2 rounded-full border border-luxury-border/30 text-foreground/60 text-sm hover:bg-luxury-surface/20 transition-colors">
            Contact
          </button>
        </div>
      </nav>

      {/* Side Text */}
      <div className="absolute left-8 top-1/4 transform -translate-y-1/2 z-10 max-w-xs">
        <p className="text-foreground/60 text-sm leading-relaxed">
          At Zevana, we craft dresses that move with grace and speak with style. From conceptual artistry to visual discourse — designed to make every woman feel effortlessly beautiful.
        </p>
      </div>

      <div className="absolute right-8 top-1/4 transform -translate-y-1/2 z-10 text-right max-w-xs">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-2 tracking-wide leading-tight">
          DESIGNED TO MAKE
          <br />
          AN ENTRANCE.
        </h2>
      </div>

      {/* Main Carousel Container */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-[600px]">
          {fashionImages.map((image, index) => {
            let positionClass = 'absolute transition-all duration-1000 ease-out';
            let imageSize = 'w-48 h-64';
            
            if (animationPhase === 'hidden') {
              positionClass += ' top-full left-1/2 transform -translate-x-1/2 opacity-0';
            } else if (animationPhase === 'stacked') {
              positionClass += ' top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100';
              positionClass += ` z-${10 - index}`;
            } else if (animationPhase === 'spread') {
              if (index === 0) {
                // Far left
                positionClass += ' top-1/2 left-8 transform -translate-y-1/2 opacity-100 rotate-[-8deg]';
                imageSize = 'w-40 h-56';
              } else if (index === 1) {
                // Left
                positionClass += ' top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-100 rotate-[-4deg]';
                imageSize = 'w-44 h-60';
              } else if (index === 2) {
                // Center (larger)
                positionClass += ' top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 z-20';
                imageSize = 'w-56 h-72';
              } else if (index === 3) {
                // Right
                positionClass += ' top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 opacity-100 rotate-[4deg]';
                imageSize = 'w-44 h-60';
              } else if (index === 4) {
                // Far right
                positionClass += ' top-1/2 right-8 transform -translate-y-1/2 opacity-100 rotate-[8deg]';
                imageSize = 'w-40 h-56';
              }
            }

            return (
              <div
                key={image.id}
                className={positionClass}
                style={{
                  transitionDelay: animationPhase === 'spread' ? `${index * 0.1}s` : '0s',
                  zIndex: index === 2 ? 20 : 10 - Math.abs(index - 2),
                }}
              >
                <div className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`${imageSize} object-cover rounded-2xl shadow-luxury hover:shadow-card transition-all duration-500 border border-luxury-border/20`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};