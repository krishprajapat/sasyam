import { motion } from 'framer-motion';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
    >
      <img
        src="/assets/logo.jpg"
        alt="Sasyamrta Logo"
        className={`${className} object-contain rounded-full border-2 border-[hsl(142,43%,35%)] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[hsl(16,85%,55%)]`}
        style={{ minWidth: '48px' }}
      />
    </motion.div>
  );
}
