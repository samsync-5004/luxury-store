import { ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-4 text-center">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-muted-foreground">REVE ESSENCE <span className="text-gold-gradient">NG</span></p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Checkout Coming Soon</h1>
          <p className="max-w-3xl mx-auto font-body text-base text-muted-foreground sm:text-lg">
            Our checkout page is being perfected for the ultimate luxury experience. In the meantime, place your order directly on WhatsApp and we will handle the rest.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-border bg-card p-8">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/")}> 
                <ArrowLeft size={16} /> Back to Store
              </Button>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-500"
                onClick={() => {
                  window.location.href =
                    "https://wa.me/2349000000000?text=Hi%2C%20I%E2%80%99d%20like%20to%20place%20an%20order";
                }}
              >
                <MessageCircle size={16} /> Order via WhatsApp
              </Button>
            </div>

            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="rounded-xl border border-border bg-background/60 p-8 text-center">
                  <p className="font-display text-xl text-foreground">No items in your cart yet.</p>
                  <p className="font-body text-sm text-muted-foreground">Browse the collection and add something special.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-border bg-background/50 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-display text-lg text-foreground">{item.product.name}</p>
                          <p className="font-body text-sm text-muted-foreground">{item.product.selectedSize || "Size N/A"} • {item.product.selectedColor || "Color N/A"}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">Qty {item.quantity}</p>
                          <p className="font-display text-base text-foreground">₦{(item.quantity * Number(item.product.price)).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-8">
            <p className="font-display text-xl text-foreground mb-4">Order Summary</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Items</span>
                <span>{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="rounded-3xl bg-background p-5">
                <p className="font-body text-sm text-muted-foreground">
                  Checkout support is coming soon. To place an order today, use WhatsApp and reference your selected items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
