import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ContactList from '@/components/admin/ContactList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '@/components/ui/separator';
import { Milk, Sparkles, Heart, Leaf } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Contact {
  id: number;
  archived: boolean;
  // Add other contact fields as needed
}

interface Product {
  id: number;
  name: string;
  category: keyof typeof CATEGORY_INFO;
  inStock: boolean;
  // Add other product fields as needed
}

interface CategoryData {
  count: number;
  inStock: number;
  outOfStock: number;
}

interface CategoryInfo {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
}

// Category metadata
const CATEGORY_INFO = {
  'Dairy': {
    icon: Milk,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Pure A2 milk products'
  },
  'Personal Care': {
    icon: Sparkles,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Natural body care products'
  },
  'Panchagavya': {
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Traditional cow-based products'
  }
} as const;

type CategoryKey = keyof typeof CATEGORY_INFO;

function isValidCategory(category: string): category is CategoryKey {
  return category in CATEGORY_INFO;
}

export default function Dashboard() {
  const { requireAdmin } = useAuth();
  const [, navigate] = useLocation();

  // Protect the route
  useEffect(() => {
    requireAdmin(() => {
      // Additional initialization if needed
    });
  }, [requireAdmin]);

  // Fetch contacts
  const { data: contacts = [], isLoading: isLoadingContacts } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
    staleTime: 1000 * 60, // 1 minute
  });

  // Fetch products
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60, // 1 minute
  });

  // Filter unarchived contacts
  const activeContacts = contacts.filter(contact => !contact.archived);
  const archivedContacts = contacts.filter(contact => contact.archived);

  // Get product categories and stock status
  const categories = products.reduce((acc: Record<CategoryKey, CategoryData>, product) => {
    // Ensure the category is valid
    const category = isValidCategory(product.category) ? product.category : 'Dairy';
    
    if (!acc[category]) {
      acc[category] = {
        count: 0,
        inStock: 0,
        outOfStock: 0
      };
    }
    acc[category].count++;
    if (product.inStock) {
      acc[category].inStock++;
    } else {
      acc[category].outOfStock++;
    }
    return acc;
  }, {} as Record<CategoryKey, CategoryData>);

  // Initialize empty categories
  Object.keys(CATEGORY_INFO).forEach((category) => {
    const key = category as CategoryKey;
    if (!categories[key]) {
      categories[key] = {
        count: 0,
        inStock: 0,
        outOfStock: 0
      };
    }
  });

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Sasyamrita Organics</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        
        <div className="flex-1 flex">
          <AdminSidebar />
          
          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {isLoadingProducts ? (
                        <div className="h-9 w-12 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        products.length
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Across all categories
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      New Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {isLoadingContacts ? (
                        <div className="h-9 w-12 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        activeContacts.length
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Unarchived contact submissions
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Archived Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {isLoadingContacts ? (
                        <div className="h-9 w-12 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        archivedContacts.length
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Processed contact submissions
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContactList limit={5} />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingProducts ? (
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-6 bg-gray-200 animate-pulse rounded"></div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {(Object.entries(categories) as [CategoryKey, CategoryData][]).map(([category, data]) => {
                            if (!CATEGORY_INFO[category]) return null;
                            
                            const CategoryIcon = CATEGORY_INFO[category].icon;
                            const info = CATEGORY_INFO[category];
                            
                            return (
                              <div key={category}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`p-1.5 rounded-lg ${info.bgColor}`}>
                                    <CategoryIcon className={`h-4 w-4 ${info.color}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium">{category}</span>
                                      <span className="text-sm text-gray-500">{data.count} items</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{info.description}</p>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div 
                                      className={`h-1.5 rounded-full ${info.color.replace('text', 'bg')}`}
                                      style={{ width: `${(data.count / products.length) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500">
                                    <span>{data.inStock} in stock</span>
                                    <span>{data.outOfStock} out of stock</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <button 
                          onClick={() => navigate('/admin/products/add')}
                          className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition"
                        >
                          Add New Product
                        </button>
                        <button 
                          onClick={() => navigate('/admin/products')}
                          className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition"
                        >
                          Manage Products
                        </button>
                        <button 
                          onClick={() => window.open('/', '_blank')}
                          className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition"
                        >
                          View Website
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
