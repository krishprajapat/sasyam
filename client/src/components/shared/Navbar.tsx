import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [location] = useLocation();

  // Check if a link should be active
  const isLinkActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`
        ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'} 
        sticky top-0 z-50 transition-all duration-300
      `}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center space-x-4 group">
              <Logo className="h-16 w-16 md:h-20 md:w-20" />
              <div className="flex flex-col">
                <span className="font-heading text-[hsl(16,85%,55%)] font-bold text-2xl md:text-3xl tracking-wider font-['Playfair_Display'] italic">
                  Sasyamrita
                </span>
                <span className="text-[hsl(142,43%,35%)] text-sm md:text-base font-medium font-['Nunito_Sans'] tracking-wide">
                  Organics
                </span>
              </div>
            </a>
          </Link>
          
          <button 
            className="md:hidden text-[hsl(142,43%,35%)] hover:text-[hsl(16,85%,55%)] transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto bg-white md:bg-transparent w-full md:w-auto p-4 md:p-0 shadow-lg md:shadow-none ${isScrolled ? 'mt-2' : 'mt-4'}`}>
            <ul className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-8">
              <li>
                <Link href="/">
                  <a className={`text-[hsl(142,43%,35%)] hover:text-[hsl(16,85%,55%)] transition py-1 border-b-2 ${isLinkActive('/') ? 'border-[hsl(16,85%,55%)]' : 'border-transparent'}`}>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className={`text-[hsl(142,43%,35%)] hover:text-[hsl(16,85%,55%)] transition py-1 border-b-2 ${isLinkActive('/about') ? 'border-[hsl(16,85%,55%)]' : 'border-transparent'}`}>
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className={`text-[hsl(142,43%,35%)] hover:text-[hsl(16,85%,55%)] transition py-1 border-b-2 ${isLinkActive('/products') ? 'border-[hsl(16,85%,55%)]' : 'border-transparent'}`}>
                    Products
                  </a>
                </Link>
              </li>

              <li className="md:ml-4">
                <Link href="/contact">
                  <Button
                    className="bg-[hsl(142,43%,35%)] hover:bg-[hsl(142,43%,30%)] text-white border-2 border-transparent hover:border-[hsl(142,43%,35%)] transition-all duration-300"
                    asChild
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Us
                    </motion.a>
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
