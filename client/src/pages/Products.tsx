import { Helmet } from 'react-helmet';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { getUniqueCategories } from '@/lib/utils';

export default function Products() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const initialCategory = params.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

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

  // Fetch all products to get categories
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  // Safe casting of the products array
  const productArray = Array.isArray(products) ? products : [];
  const categories = getUniqueCategories(productArray);

  // Update category when URL parameter changes
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  return (
    <>
      <Helmet>
        <title>Sacred Cow Products - Sasyamrita Organics</title>
        <meta name="description" content="Discover our range of pure cow products including A2 milk, ghee, buttermilk, and traditional Ayurvedic preparations made with sacred cow ingredients." />
        <meta property="og:title" content="Sacred Cow Products - Sasyamrita Organics" />
        <meta property="og:description" content="Experience the divine benefits of pure cow products, crafted with traditional methods and modern standards." />
        <meta property="og:image" content="/assets/products/milk.jpg" />
        <meta property="og:type" content="website" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-[hsl(195,47%,97%)] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedContainer className="text-center max-w-3xl mx-auto" type="fade">
              <span className="font-accent text-[hsl(16,85%,55%)] text-xl">Sacred Products</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-[hsl(142,43%,35%)] mt-2 mb-6">
                Pure Cow Products
              </h1>
              <p className="text-[hsl(120,10%,10%)] text-lg mb-8">
                Experience the divine benefits of our pure cow products, crafted with traditional methods and modern standards. From fresh A2 milk to sacred Ayurvedic preparations, each product carries the blessing of our sacred cows.
              </p>
            </AnimatedContainer>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <AnimatedContainer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6" type="fade">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-[hsl(142,43%,35%)]">
                    Browse Our Products
                  </h2>
                  <p className="text-[hsl(120,10%,10%)] mt-2">
                    Discover our range of pure and sacred cow products
                  </p>
                </div>
                
                <ProductFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </AnimatedContainer>
            </div>

            <ProductGrid category={activeCategory} />
          </div>
        </section>

        {/* Product Information */}
        <section className="py-16 md:py-24 bg-[hsl(195,47%,97%)]">
          <div className="container mx-auto px-4">
            <AnimatedContainer type="fade">
              <div className="max-w-3xl mx-auto">
                <span className="font-accent text-[hsl(16,85%,55%)] text-xl">Why Choose Our Products</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(142,43%,35%)] mt-2 mb-6">
                  The Sacred Difference
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[hsl(142,43%,35%)]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[hsl(142,43%,35%)] mb-2">Pure A2 Milk</h3>
                      <p className="text-[hsl(120,10%,10%)]">Our milk comes from pure indigenous Gir cows, ensuring you get the most nutritious and easily digestible A2 milk.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[hsl(142,43%,35%)]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[hsl(142,43%,35%)] mb-2">Traditional Methods</h3>
                      <p className="text-[hsl(120,10%,10%)]">We follow ancient Vedic practices in our production process, preserving the sacred nature of cow products.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[hsl(142,43%,35%)]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[hsl(142,43%,35%)] mb-2">Ethical Treatment</h3>
                      <p className="text-[hsl(120,10%,10%)]">Our cows are treated with utmost respect and care, ensuring both their well-being and the purity of our products.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[hsl(142,43%,35%)]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[hsl(142,43%,35%)] mb-2">Ayurvedic Benefits</h3>
                      <p className="text-[hsl(120,10%,10%)]">Our products are prepared following Ayurvedic principles, offering both physical and spiritual benefits.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
