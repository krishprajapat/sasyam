import { motion } from 'framer-motion';
import { handleImageError } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    price?: string;
    unit?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-60">
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          onError={handleImageError}
        />
        {product.price && (
          <div className="absolute top-4 right-4 bg-[hsl(142,43%,35%)] text-white px-3 py-1 rounded-full font-medium text-sm">
            ₹{product.price}{product.unit ? ` / ${product.unit}` : ''}
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-[hsl(16,85%,55%)] bg-[hsl(195,47%,92%)] py-1 px-2 rounded-full">
          {product.category}
        </span>
        <h3 className="font-heading text-xl font-bold text-[hsl(142,43%,35%)] mt-3 mb-2">{product.name}</h3>
        <p className="text-[hsl(120,10%,10%)] text-sm mb-4">{product.description}</p>
      </div>
    </motion.div>
  );
}
