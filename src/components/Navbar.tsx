import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Shoes", slug: "shoes" },
  { name: "Watches", slug: "wrist-watches" },
  { name: "Glasses", slug: "glasses" },
  { name: "Jackets", slug: "jackets" },
  { name: "Accessories", slug: "accessories" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="font-display text-xl lg:text-2xl font-bold tracking-wider text-foreground">
            REVE ESSENCE <span className="text-gold-gradient">NG</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/#${cat.slug}`}
                className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {cat.name}
              </a>
            ))}
            <Link
              to="/admin"
              className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/#${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.name}
                </a>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
