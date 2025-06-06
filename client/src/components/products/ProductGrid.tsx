import { useState, useEffect } from 'react';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { ProductCard } from './ProductCard';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price?: string;
  unit?: string;
}

interface ProductGridProps {
  category?: string;
}

export function ProductGrid({ category = 'All' }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(category);
  
  // Update active category when the prop changes
  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  // Fetch products from API
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60, // 1 minute
  });
  
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm h-[400px] animate-pulse"
          >
            <div className="bg-[hsl(195,47%,92%)] h-60 w-full"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-[hsl(195,47%,92%)] rounded w-1/4"></div>
              <div className="h-6 bg-[hsl(195,47%,92%)] rounded w-3/4"></div>
              <div className="h-4 bg-[hsl(195,47%,92%)] rounded w-full"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-[hsl(195,47%,92%)] rounded w-1/4"></div>
                <div className="h-4 bg-[hsl(195,47%,92%)] rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-heading text-[hsl(142,43%,35%)] mb-2">No Products Found</h3>
        <p className="text-[hsl(120,10%,10%)]">We couldn't find any products in this category. Please check back later or try another category.</p>
      </div>
    );
  }

  return (
    <AnimatedContainer type="fade">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </AnimatedContainer>
  );
}
