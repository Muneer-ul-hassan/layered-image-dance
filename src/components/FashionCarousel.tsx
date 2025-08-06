import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'slide-up' | 'arrange'>('initial');

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationPhase('slide-up');
    
    setTimeout(() => {
      setAnimationPhase('arrange');
    }, 1000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationPhase('initial');
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></div>
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-luxury-gold">
            ZEVANA
          </h1>
          <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></div>
        </div>
        <p className="text-foreground/80 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          At Zevana, we craft dreams that move with grace and speak with style. From conceptual artistry to visual discourse — designed to make every woman feel extraordinary.
        </p>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-light text-foreground mb-2 tracking-wide">
          DESIGNED TO MAKE
        </h2>
        <h3 className="text-3xl md:text-5xl font-light text-foreground tracking-wide">
          AN ENTRANCE.
        </h3>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-6xl h-96 mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          {fashionImages.map((image, index) => {
            let animationClass = '';
            let positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
            
            if (animationPhase === 'initial') {
              positionClass += ' translate-y-full opacity-0';
            } else if (animationPhase === 'slide-up') {
              animationClass = 'animate-slide-up';
              positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
            } else if (animationPhase === 'arrange') {
              if (index === 0) {
                animationClass = 'animate-slide-left';
                positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
              } else if (index === 1) {
                animationClass = 'animate-slide-left';
                positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
              } else if (index === 2) {
                // Center image stays
                positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float';
              } else if (index === 3) {
                animationClass = 'animate-slide-right';
                positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
              } else if (index === 4) {
                animationClass = 'animate-slide-right';
                positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
              }
            }

            return (
              <div
                key={image.id}
                className={`${positionClass} ${animationClass}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  zIndex: index === 2 ? 10 : 5 - Math.abs(index - 2),
                }}
              >
                <div className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-48 h-64 md:w-56 md:h-72 object-cover rounded-2xl shadow-card hover:shadow-luxury transition-all duration-500 border border-luxury-border/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-8 py-3 bg-luxury-surface border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300 rounded-full font-light tracking-wider"
        >
          {isAnimating ? 'ANIMATING...' : 'START SHOW'}
        </Button>
        
        <Button
          onClick={resetAnimation}
          variant="outline"
          className="px-8 py-3 border border-luxury-border text-foreground hover:bg-luxury-surface transition-all duration-300 rounded-full font-light tracking-wider"
        >
          RESET
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center gap-3 mt-8">
        <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></div>
        <div className="w-8 h-1 bg-luxury-gold/60 rounded-full"></div>
        <div className="w-2 h-2 bg-luxury-gold/40 rounded-full"></div>
      </div>
    </div>
  );
};