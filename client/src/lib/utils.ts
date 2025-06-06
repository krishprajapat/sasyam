import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format dates
export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Function to truncate text
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Function to validate email
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to get image placeholder in case of error
export function getImagePlaceholder(): string {
  return 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80';
}

// Function to handle image loading error
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
  event.currentTarget.src = getImagePlaceholder();
}

// Function to get unique categories from products
export function getUniqueCategories(products: any[]): string[] {
  if (!products || !products.length) return ['All'];
  const categories = products.map(product => product.category);
  const uniqueCategories = ['All', ...new Set(categories)];
  return uniqueCategories;
}
