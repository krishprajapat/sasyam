import { Helmet } from 'react-helmet';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { useEffect } from 'react';

export default function Contact() {
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
        <title>Get in Touch - Sasyamrita Organics</title>
        <meta name="description" content="Contact Sasyamrita Organics with questions about our products, sustainable farming practices, or partnership opportunities." />
        <meta property="og:title" content="Get in Touch - Sasyamrita Organics" />
        <meta property="og:description" content="Contact us with questions about our products, sustainable farming practices, or partnership opportunities." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
        <meta property="og:type" content="website" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </Helmet>

      <Navbar />

      <main>
        {/* Contact Hero Section */}
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedContainer className="text-center max-w-3xl mx-auto" type="fade">
              <span className="font-accent text-accent-dark text-xl">Get in Touch</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mt-2 mb-6">
                We'd Love to Hear From You
              </h1>
              <p className="text-neutral-dark text-lg mb-8">
                Have questions about our products or practices? Interested in partnering with us? Or just want to share your Sasyamrita experience? We're here to help.
              </p>
            </AnimatedContainer>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <AnimatedContainer type="slide-right">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    Send Us a Message
                  </h2>
                  <p className="text-neutral-dark mb-8">
                    Fill out the form below and we'll get back to you as soon as possible. We value your feedback and inquiries.
                  </p>
                  
                  <ContactForm />
                </AnimatedContainer>
              </div>
              
              <div className="lg:w-1/2">
                <AnimatedContainer type="slide-left">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    Contact Information
                  </h2>
                  <p className="text-neutral-dark mb-8">
                    Prefer to reach out directly? Here are all the ways you can connect with us.
                  </p>
                  
                  <ContactInfo />
                </AnimatedContainer>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-neutral-lightest">
          <div className="container mx-auto px-4">
            <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16" type="fade">
              <span className="font-accent text-accent-dark text-xl">Frequently Asked Questions</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                Common Inquiries
              </h2>
              <p className="text-neutral-dark text-lg">
                Find answers to some of the most common questions we receive. If you can't find what you're looking for, please reach out to us directly.
              </p>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How can I purchase your products?",
                  answer: "Our products are available at Iskcon Vapi and we serve home deliveries. Contact us for specific availability and ordering options."
                },
                {
                  question: "Are all your products certified organic?",
                  answer: "Yes, all Sasyamrita products are certified organic. We maintain rigorous standards that often exceed certification requirements."
                },
                {
                  question: "Do you ship your products?",
                  answer: "For certain shelf-stable products, we offer shipping. Fresh produce is typically available for local pickup or delivery only."
                },
                {
                  question: "Do you offer bulk orders for restaurants?",
                  answer: "Yes, we can provide bulk orders with advance notice. Please contact us to discuss your specific requirements."
                }
              ].map((faq, index) => (
                <AnimatedContainer
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm"
                  type="fade"
                  delay={0.1 * (index + 1)}
                >
                  <h3 className="font-heading text-xl font-bold text-primary mb-3">{faq.question}</h3>
                  <p className="text-neutral-dark">{faq.answer}</p>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
