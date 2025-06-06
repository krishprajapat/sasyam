import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Contact from "@/pages/Contact";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ManageProducts from "@/pages/admin/ManageProducts";
import AddProduct from "@/pages/admin/AddProduct";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

function App() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/products" component={Products} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin" component={Login} />
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route path="/admin/products" component={ManageProducts} />
              <Route path="/admin/products/add" component={AddProduct} />
              <Route path="/admin/products/:id/edit" component={AddProduct} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
