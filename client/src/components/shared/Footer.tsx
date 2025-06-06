import { Link } from 'wouter';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[hsl(142,43%,35%)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <Link href="/">
              <a className="flex items-center space-x-4 group">
                <Logo className="h-16 w-16 md:h-20 md:w-20" />
                <div className="flex flex-col">
                  <span className="font-heading text-white font-bold text-2xl md:text-3xl tracking-wide group-hover:text-[hsl(16,85%,55%)] transition-colors duration-300">
                    Sasyamrita
                  </span>
                  <span className="text-white text-sm md:text-base font-medium group-hover:text-[hsl(16,85%,55%)] transition-colors duration-300">
                    Organics
                  </span>
                </div>
              </a>
            </Link>
            <p className="mb-6 text-[hsl(195,47%,92%)] mt-4">Experience the divine benefits of our pure cow products, crafted with love and tradition.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/sasyamrta/" target="_blank" rel="noopener noreferrer" className="text-[hsl(195,47%,92%)] hover:text-white transition" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 320 512">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/sasyamrtaorganic/?hl=en" target="_blank" rel="noopener noreferrer" className="text-[hsl(195,47%,92%)] hover:text-white transition" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@sasyamritaorganicpvtltd3732" target="_blank" rel="noopener noreferrer" className="text-[hsl(195,47%,92%)] hover:text-white transition" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 576 512">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <h3 className="font-heading font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <h3 className="font-heading font-bold text-xl mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=Dairy">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">Pure A2 Dairy Products</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=Personal Care">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">Personal Care Products</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=Panchagavya">
                  <a className="text-[hsl(195,47%,92%)] hover:text-white transition">Panchagavya Products</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 px-4">
            <h3 className="font-heading font-bold text-xl mb-6">Newsletter</h3>
            <p className="mb-4 text-[hsl(195,47%,92%)]">Subscribe to receive updates on new products, farming practices, and seasonal offerings.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[hsl(195,47%,85%)] text-foreground w-full bg-white"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-[hsl(195,47%,92%)] hover:bg-[hsl(195,47%,85%)] text-[hsl(142,43%,35%)] font-semibold px-4 rounded-r-lg transition"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-[hsl(195,47%,92%)]/30 mt-12 pt-8 text-center text-[hsl(195,47%,92%)]">
          <p>&copy; {new Date().getFullYear()} Sasyamrita Organics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
