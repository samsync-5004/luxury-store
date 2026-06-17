import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_paths: string[];
    material: string;
    sizes: string[];
    colors: string[];
    categories?: { name: string } | null;
  };
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const placeholderUrl = useMemo(
    () => `https://placehold.co/800x800/1a1a1a/gold?text=${encodeURIComponent(product.name.slice(0, 1))}`,
    [product.name],
  );
  const images = product.image_paths.length > 0 ? product.image_paths : [placeholderUrl];

  const nextImage = () => setCurrentImage((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentImage((i) => (i - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast({ title: "Added to bag ✓" });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card border border-border rounded-sm w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image gallery */}
            <div className="relative aspect-square bg-muted">
              <img
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = placeholderUrl;
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/50 backdrop-blur-sm text-foreground rounded-full hover:bg-background/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/50 backdrop-blur-sm text-foreground rounded-full hover:bg-background/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentImage ? "bg-foreground" : "bg-foreground/30"
                        }`}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product details */}
            <div className="p-6 md:p-8 flex flex-col gap-6">
              {product.categories && (
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  {product.categories.name}
                </p>
              )}
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                {product.name}
              </h2>
              <p className="font-display text-xl text-foreground">₦{product.price.toLocaleString()}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="space-y-4 border-t border-border pt-4">
                {product.material && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Material</p>
                    <p className="font-body text-sm text-foreground">{product.material}</p>
                  </div>
                )}

                {product.sizes.length > 0 && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Select Size</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                            selectedSize === size
                              ? "border-gold bg-gold text-background"
                              : "border-border bg-background text-foreground hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors.length > 0 && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Select Color</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                            selectedColor === color
                              ? "border-gold bg-gold text-background"
                              : "border-border bg-background text-foreground hover:border-foreground"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">Quantity</p>
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="outline" onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}>
                      -
                    </Button>
                    <span className="min-w-[2rem] text-center font-body text-sm text-foreground">{quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => setQuantity((qty) => qty + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-auto gap-2" size="lg" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                Add to Bag
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
