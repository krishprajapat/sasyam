import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full -mr-24 hidden lg:block"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <AnimatedContainer className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-16" type="slide-right">
            <span className="font-accent text-accent-dark text-xl">Our Story</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
              Preserving Sacred Traditions Through Pure Cow Products
            </h2>
            <div className="space-y-4 text-neutral-dark">
              <p>
                Sasyamrita began with a profound respect for India's ancient cow-care traditions. Our journey started with establishing a Goshala dedicated to indigenous Gir cows, treating them not just as animals, but as divine mothers.
              </p>
              <p>
                Today, our Goshala is home to over 50 indigenous cows, where we maintain the highest standards of cow care following Vedic principles. Each cow receives personalized attention, organic feed, and regular health check-ups in a stress-free environment.
              </p>
              <p>
                We specialize in producing pure A2 milk and traditional cow products like ghee, curd, and panchagavya, all prepared using time-honored methods that preserve their sacred benefits and healing properties.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-primary">50+ Cows</p>
                  <p className="text-sm text-neutral-dark">Gir Cows</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-primary">10+ Products</p>
                  <p className="text-sm text-neutral-dark">Traditional Preparations</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="btn-secondary"
                  asChild
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More About Us
                  </motion.a>
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer className="lg:w-1/2 relative" type="slide-left">
            <div className="grid grid-cols-2 gap-4">
            <img
                src="/assets/banners/P4.jpg"
                alt="Traditional Ghee Processing"
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <img
                src="/assets/goshala/C5.jpg"
                alt="Our Sacred Goshala"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <img
                src="/assets/about-us/gallery/F1.jpg"
                alt="Team"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <img
                src="/assets/home/carousel/productPoster.png"
                alt="Traditional Cow Products"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
