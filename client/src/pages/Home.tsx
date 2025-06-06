import { Helmet } from 'react-helmet';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Hero from '@/components/home/Hero';
import BrandIntro from '@/components/home/BrandIntro';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutSection from '@/components/about/AboutSection';
import Testimonials from '@/components/home/Testimonials';
import { ContactForm } from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { useState, useEffect } from 'react';

export default function Home() {
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

  return (
    <>
      <Helmet>
        <title>Sasyamrita Organics </title>
        <meta name="description" content="Sasyamrita Organics - Premium organic produce grown with sustainable farming practices. Discover our range of natural, ethically-sourced products." />
        <meta property="og:title" content="Sasyamrita Organics - Nurture Naturally" />
        <meta property="og:description" content="Premium organic produce grown with sustainable farming practices. Discover our range of natural, ethically-sourced products." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        <meta property="og:type" content="website" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero />
        <BrandIntro />
        <FeaturedProducts />
        <AboutSection />
        <Testimonials />
        
        <section id="contact" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <span className="font-accent text-accent-dark text-xl">Get in Touch</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                  We'd Love to Hear From You
                </h2>
                <p className="text-neutral-dark mb-8">
                  Have questions about our products or practices? Interested in partnering with us? Or just want to share your Sasyamrita experience? We're here to help.
                </p>
                
                <ContactForm />
              </div>
              
              <div className="lg:w-1/2">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
