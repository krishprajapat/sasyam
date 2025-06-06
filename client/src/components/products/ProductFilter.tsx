import { ProductFilterButton } from '@/components/ui/product-filter-button';

interface ProductFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProductFilter({
  categories,
  activeCategory,
  onCategoryChange
}: ProductFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" id="product-filters">
      {categories.map((category) => (
        <ProductFilterButton
          key={category}
          active={category === activeCategory}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </ProductFilterButton>
      ))}
    </div>
  );
}
