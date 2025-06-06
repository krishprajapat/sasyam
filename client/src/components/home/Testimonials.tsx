import { useState, useRef, useEffect } from 'react';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "The A2 milk from Sasyamrita's Gir cows has made a remarkable difference in my family's health. The purity and richness of the milk is incomparable to anything available in the market.",
      rating: 5
    },
    {
      id: 2,
      text: "Their traditionally prepared ghee is exceptional. I recommend it to all my clients. The golden color and rich aroma speak volumes about its authenticity.",
      rating: 5
    },
    {
      id: 3,
      text: "I've been using their cow dung cakes for traditional rituals, and the quality is outstanding. It's evident that their cows are well-cared for and fed naturally.",
      rating: 5
    },
    {
      id: 4,
      text: "The panchagavya products from Sasyamrita have greatly enhanced our organic farming results. Their commitment to traditional preparation methods ensures the highest quality.",
      rating: 5
    }
  ];

  useEffect(() => {
    if (sliderRef.current) {
      const moveSlider = () => {
        const isMobile = window.innerWidth < 768;
        const isMedium = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        // Calculate offset based on screen size
        let offset = -100 * activeIndex;
        if (isMedium) {
          offset = -50 * activeIndex;
        } else if (!isMobile) {
          offset = -33.33 * activeIndex;
        }
        
        sliderRef.current!.style.transform = `translateX(${offset}%)`;
      };
      
      moveSlider();
      window.addEventListener('resize', moveSlider);
      
      return () => {
        window.removeEventListener('resize', moveSlider);
      };
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    const maxIndex = testimonials.length - 1;
    setActiveIndex(prev => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-accent-dark" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-accent-dark" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 15.374l-4.472 2.35.853-4.981-3.62-3.53 5.005-.728L10 4.06l2.234 4.424 5.005.729-3.62 3.53.853 4.981L10 15.374zM10 12.75V6.375l-1.284 2.552-2.878.419 2.083 2.03-.49 2.866L10 12.75z" clipRule="evenodd" />
        </svg>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-accent-dark/50" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16" type="fade">
          <span className="font-accent text-accent-dark text-xl">What People Say</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
            Pure Cow Products, Pure Results
          </h2>
          <p className="text-neutral-dark">
            Discover how our traditional cow products have made a difference in the lives of our valued customers.
          </p>
        </AnimatedContainer>

        <AnimatedContainer className="testimonial-carousel relative" type="fade">
          <div className="overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <motion.div 
                    className="bg-white rounded-xl p-8 shadow-sm h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="text-accent-dark flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-neutral-dark mb-6 italic">"{testimonial.text}"</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="absolute top-1/2 -left-4 md:left-0 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition z-10"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition z-10"
            onClick={handleNext}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`testimonial-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
