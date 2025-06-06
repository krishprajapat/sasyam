import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter } from '@/components/products/ProductFilter';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

const CATEGORIES = ["All", "Dairy", "Personal Care", "Panchagavya"];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch products from API
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60, // 1 minute
  });

  // Filter and limit to 6 featured products
  const filteredProducts = activeCategory === "All"
    ? products.slice(0, 6)
    : products.filter(product => product.category === activeCategory).slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <AnimatedContainer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6" type="fade">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                  Featured Products
                </h2>
                <p className="text-neutral-dark mt-2">
                  Discover our most popular cow products
                </p>
              </div>
              
              <ProductFilter
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </AnimatedContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm h-[400px] animate-pulse"
              >
                <div className="bg-neutral-lightest h-60 w-full"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-neutral-lightest rounded w-1/4"></div>
                  <div className="h-6 bg-neutral-lightest rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-lightest rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <AnimatedContainer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6" type="fade">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                Featured Products
              </h2>
              <p className="text-neutral-dark mt-2">
                Discover our most popular cow products
              </p>
            </div>
            
            <ProductFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </AnimatedContainer>
        </div>

        <AnimatedContainer type="fade">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedContainer>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary-dark">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
