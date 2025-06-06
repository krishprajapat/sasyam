import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/shared/Logo';
import { Link } from 'wouter';
import { ExternalLink, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/dashboard">
            <a className="flex items-center space-x-4 group">
              <Logo className="h-12 w-12" />
              <div className="flex flex-col">
                <span className="font-heading text-[hsl(16,85%,55%)] font-bold text-xl tracking-wider font-['Playfair_Display'] italic">
                  Sasyamrita
                </span>
                <span className="text-[hsl(142,43%,35%)] text-sm font-medium font-['Nunito_Sans'] tracking-wide">
                  Organics
                </span>
              </div>
            </a>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm"
          >
            <span className="hidden sm:inline">View Website</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full bg-primary text-white hover:bg-primary-dark"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.username}</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard">
                  <a className="cursor-pointer">Dashboard</a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/products">
                  <a className="cursor-pointer">Manage Products</a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
