import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border shadow-2xl overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <p className="font-display text-lg text-foreground">Your Bag</p>
                <p className="font-body text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"}</p>
              </div>
              <button onClick={onClose} className="text-foreground/80 hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="px-6 py-6">
              {items.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-border bg-background/60 text-center">
                  <ShoppingBag className="h-12 w-12 text-foreground/60" />
                  <p className="font-display text-xl text-foreground">Your bag is empty</p>
                  <p className="font-body text-sm text-muted-foreground">Add something luxurious and continue shopping.</p>
                  <Button variant="outline" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="rounded-sm border border-border p-4 bg-background">
                        <div className="flex gap-4">
                          <img
                            src={item.product.image_paths?.[0] || "https://placehold.co/120x160/1a1a1a/gold?text=+"}
                            alt={item.product.name}
                            className="h-24 w-24 rounded-sm object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-display text-sm text-foreground">{item.product.name}</p>
                            <p className="font-body text-xs text-muted-foreground">{item.product.selectedSize || "Size N/A"} • {item.product.selectedColor || "Color N/A"}</p>
                            <div className="mt-3 flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                -
                              </Button>
                              <span className="font-body text-sm text-foreground">{item.quantity}</span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                          <span>Line total</span>
                          <span className="font-medium text-foreground">₦{(item.quantity * Number(item.product.price)).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-4 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-sm border border-border bg-background p-5">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-semibold text-foreground">₦{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="mt-5 grid gap-3">
                      <Button onClick={onClose} variant="outline">
                        Continue Shopping
                      </Button>
                      <Button onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
