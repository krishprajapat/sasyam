import { Helmet } from 'react-helmet';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { ImageCarousel } from '@/components/ui/image-carousel';

export default function About() {
  // Effect for AOS initialization
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      window.AOS?.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const values = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Purity",
      description: "Maintaining the highest standards of purity in our products, from cow care to final preparation."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
      title: "Tradition",
      description: "Preserving ancient wisdom and traditional methods in the preparation of our cow products."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Quality",
      description: "Ensuring the highest quality in our products through careful cow selection and traditional processing methods."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Spirituality",
      description: "Incorporating spiritual practices and values in our product preparation and cow care processes."
    }
  ];

  const storyImages = [
    {
      src: "/assets/goshala/C1.jpg",
      alt: "Sacred cows in our Goshala",
      caption: "Our Sacred Gir Cows"
    },
    {
      src: "/assets/goshala/C3.png",
      alt: "Our Sacred Goshala",
      caption: "Our Sacred Goshala"
    },
    
    {
      src: "/assets/home/carousel/billona.webp",
      alt: "Traditional ghee preparation",
      caption: "Traditional Ghee Preparation"
    },
    {
      src: "/assets/banners/M3.jpg",
      alt: "Pure milk processing",
      caption: ""
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Sasyamrita Organics</title>
        <meta name="description" content="Learn about Sasyamrita's journey in preserving traditional cow products and our commitment to purity and quality." />
        <meta property="og:title" content="About Us - Sasyamrita Organics" />
        <meta property="og:description" content="Discover our journey in bringing pure and traditional cow products to every household." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" />
        <meta property="og:type" content="website" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedContainer className="text-center max-w-3xl mx-auto" type="fade">
              <span className="font-accent text-accent-dark text-xl">Our Story</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mt-2 mb-6">
                Preserving Sacred Traditions Through Pure Cow Products
              </h1>
              <p className="text-neutral-dark text-lg mb-8">
                At Sasyamrita, we are dedicated to bringing you the purest cow products, prepared with traditional methods and spiritual values. Our commitment to preserving these sacred traditions ensures that each product carries divine benefits for your well-being.
              </p>
              <ImageCarousel 
                images={storyImages}
                className="max-w-4xl mx-auto shadow-xl"
                autoPlayInterval={6000}
              />
            </AnimatedContainer>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedContainer type="slide-right">
                <span className="font-accent text-accent-dark text-xl">Our Purpose</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                  Mission & Vision
                </h2>
                
                <div className="bg-neutral-lightest p-6 rounded-xl mb-6">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Our Mission</h3>
                  <p className="text-neutral-dark">
                    To provide pure and traditional cow products that enhance physical, mental, and spiritual well-being while preserving ancient wisdom and supporting ethical cow care practices.
                  </p>
                </div>
                
                <div className="bg-neutral-lightest p-6 rounded-xl">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Our Vision</h3>
                  <p className="text-neutral-dark">
                    A world where the sacred benefits of pure cow products are accessible to all, promoting holistic wellness while preserving our cultural heritage and spiritual values.
                  </p>
                </div>
              </AnimatedContainer>
              
              <AnimatedContainer type="slide-left">
                <img 
                  src="/assets/home/carousel/productPoster.png" 
                  alt="Traditional ghee preparation"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-neutral-lightest">
          <div className="container mx-auto px-4">
            <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16" type="fade">
              <span className="font-accent text-accent-dark text-xl">What We Stand For</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                Our Core Values
              </h2>
              <p className="text-neutral-dark text-lg">
                These principles guide everything we do — from how we grow our food to how we engage with our community.
              </p>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AnimatedContainer 
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm transition-transform hover:-translate-y-1 duration-300"
                  type="fade"
                  delay={0.1 * (index + 1)}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-3 text-center">{value.title}</h3>
                  <p className="text-neutral-dark text-center">{value.description}</p>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Our Goshala */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedContainer type="slide-right">
                <img 
                  src="/assets/goshala/C6.png" 
                  alt="Our Sacred Goshala"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </AnimatedContainer>
              
              <AnimatedContainer type="slide-left">
                <span className="font-accent text-accent-dark text-xl">Our Sacred Space</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                  The Sasyamrita Goshala
                </h2>
                <div className="space-y-4 text-neutral-dark">
                  <p>
                    Our Goshala is more than just a shelter for cows – it's a sacred space where we honor and care for these divine beings following ancient Vedic traditions.
                  </p>
                  <p>
                    Each cow in our Goshala receives personalized care, a nutritious diet of organic feed, and regular health check-ups. We maintain the highest standards of cleanliness and comfort, ensuring our cows live in a stress-free environment.
                  </p>
                  <p>
                    The Goshala follows traditional architectural principles that ensure proper ventilation, natural lighting, and ample space for the cows to move freely. Our dedicated team of caretakers performs daily puja and maintains the spiritual atmosphere of the premises.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-neutral-lightest p-4 rounded-xl">
                    <div className="text-primary font-bold text-2xl mb-1">50+</div>
                    <div className="text-sm text-neutral-dark">Indigenous Cows</div>
                  </div>
                  <div className="bg-neutral-lightest p-4 rounded-xl">
                    <div className="text-primary font-bold text-2xl mb-1">24/7</div>
                    <div className="text-sm text-neutral-dark">Expert Care</div>
                  </div>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <AnimatedContainer className="max-w-3xl mx-auto" type="fade">
              <span className="font-accent text-accent-dark text-xl">Join Our Journey</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                Experience the Sasyamrita Difference
              </h2>
              <p className="text-neutral-dark text-lg mb-8">
                Discover our range of organic products grown with care for both you and the environment. Connect with us to learn more about our sustainable farming practices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products">
                  <Button
                    className="btn-primary w-full sm:w-auto"
                    asChild
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Our Products
                    </motion.a>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="btn-secondary w-full sm:w-auto"
                    asChild
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get in Touch
                    </motion.a>
                  </Button>
                </Link>
              </div>
            </AnimatedContainer>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
