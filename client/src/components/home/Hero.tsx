import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { useState, useEffect } from 'react';

const CAROUSEL_IMAGES = [
  {
    src: "/assets/home/carousel/cow1.png",
    alt: "Pure Indigenous Gir Cow",
    caption: "Our Pure Indigenous Gir Cows"
  },
  {
    src: "/assets/home/carousel/M4.jpg",
    alt: "Fresh A2 Milk",
    caption: "Fresh A2 Milk Daily"
  },
  {
    src: "/assets/home/carousel/billona.webp",
    alt: "Traditional Ghee Making",
    caption: "Traditional Ghee Making Process"
  },
  {
    src: "/assets/home/carousel/productPoster.png",
    alt: "Cow Products",
    caption: "Our Range of Sacred Cow Products"
  }
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Handle manual navigation
  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  return (
    <section id="home" className="relative overflow-hidden hero-pattern">
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          <AnimatedContainer className="w-full md:w-1/2" type="slide-right">
            <span className="font-accent text-[hsl(16,85%,55%)] text-xl md:text-2xl">Pure. Sacred. Natural.</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(142,43%,35%)] mt-2 mb-4 md:mb-6">
              Pure Cow Products for a Healthier Life
            </h1>
            <p className="text-[hsl(120,10%,10%)] text-base md:text-lg mb-6 md:mb-8 max-w-lg">
              Experience the divine benefits of our pure cow products, crafted with love and tradition. From fresh milk to ayurvedic preparations, we bring you nature's best.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button
                  className="bg-[hsl(142,43%,35%)] hover:bg-[hsl(142,43%,30%)] text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                  asChild
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Products
                  </motion.a>
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-[hsl(195,47%,92%)] text-[hsl(142,43%,35%)] border-2 border-[hsl(142,43%,35%)] font-semibold py-2 px-6 rounded-full transition duration-300"
                  asChild
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Our Heritage
                  </motion.a>
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer className="w-full md:w-1/2 relative" type="slide-left" delay={0.2}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              {/* Carousel Images */}
              {CAROUSEL_IMAGES.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentImage ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: 'center center'
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                      <p className="text-white text-center text-sm sm:text-base md:text-lg font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-14 sm:bottom-16 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
                {CAROUSEL_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      index === currentImage 
                        ? 'bg-white w-3 sm:w-4' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Info Cards - Hidden on mobile, visible from medium screens */}
            <motion.div
              className="absolute -bottom-5 -left-5 bg-white p-3 sm:p-4 rounded-lg shadow-lg hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center">
                <div className="bg-[hsl(195,47%,92%)] rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[hsl(142,43%,35%)] text-sm sm:text-base">100% Pure</p>
                  <p className="text-xs sm:text-sm text-[hsl(120,10%,10%)]">Indigenous A2 Milk</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -top-5 -right-5 bg-white p-3 sm:p-4 rounded-lg shadow-lg hidden md:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center">
                <div className="bg-[hsl(195,47%,92%)] rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[hsl(142,43%,35%)] text-sm sm:text-base">Ayurvedic</p>
                  <p className="text-xs sm:text-sm text-[hsl(120,10%,10%)]">Traditional Methods</p>
                </div>
              </div>
            </motion.div>
          </AnimatedContainer>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[hsl(195,47%,97%)]/80 to-transparent"></div>
    </section>
  );
}
