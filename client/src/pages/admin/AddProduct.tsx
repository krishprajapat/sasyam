import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation, RouteComponentProps } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '@/components/admin/ProductForm';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@shared/schema';

type Params = { id: string };

export default function AddProduct({ params }: RouteComponentProps<Params>) {
  const { requireAdmin } = useAuth();
  const [, navigate] = useLocation();
  const id = params?.id ? parseInt(params.id) : undefined;
  const isEditMode = !!id;

  // Protect the route
  useEffect(() => {
    requireAdmin();
  }, [requireAdmin]);

  // Fetch product if in edit mode
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    },
    enabled: isEditMode,
  });

  // Page title based on mode
  const pageTitle = isEditMode ? 'Edit Product' : 'Add New Product';

  return (
    <>
      <Helmet>
        <title>{pageTitle} - Sasyamrita Organics</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        
        <div className="flex-1 flex">
          <AdminSidebar />
          
          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/products">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
                  <p className="text-gray-500">
                    {isEditMode ? 'Update product information' : 'Create a new product for the catalog'}
                  </p>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>{isEditMode ? 'Product Details' : 'New Product'}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditMode && isLoading ? (
                    <div className="space-y-4">
                      <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ) : (
                    <ProductForm 
                      product={isEditMode ? product : undefined}
                      onSuccess={() => navigate('/admin/products')}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
