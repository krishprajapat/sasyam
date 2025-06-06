import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductList from '@/components/admin/ProductList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { ProductFilter } from '@/components/products/ProductFilter';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price?: string;
  unit?: string;
}

const CATEGORIES = ['All', 'Dairy', 'Personal Care', 'Panchagavya'];

export default function ManageProducts() {
  const { requireAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Protect the route
  useEffect(() => {
    requireAdmin();
  }, [requireAdmin]);

  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60, // 1 minute
  });

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Manage Products - Sasyamrita Organics</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        
        <div className="flex-1 flex">
          <AdminSidebar />
          
          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
                  <p className="text-gray-500">Add, edit and remove products from the catalog</p>
                </div>
                
                <Link href="/admin/products/add">
                  <Button className="bg-primary hover:bg-primary-dark w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                  </Button>
                </Link>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Product Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <ProductFilter
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Products ({filteredProducts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductList products={filteredProducts} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
