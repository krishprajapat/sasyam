import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function AdminSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/admin/dashboard',
    },
    {
      name: 'Products',
      icon: <Package className="h-5 w-5" />,
      path: '/admin/products',
    },
    {
      name: 'Messages',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/dashboard#messages',
    },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const basePath = path.split('#')[0];
      return location.startsWith(basePath);
    }
    return location === path || location.startsWith(`${path}/`);
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xl font-semibold text-primary">Admin Panel</span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <a
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path) 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          onClick={logout}
          className={cn(
            "flex items-center w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
