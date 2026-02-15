import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Group products by category
  const productsByCategory = categories?.map((cat) => ({
    ...cat,
    products: products?.filter((p) => p.category_id === cat.id) || [],
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Product Catalog */}
      <main className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">
              Unable to load products. Please try again later.
            </p>
          </div>
        )}

        {productsByCategory?.map((category) => (
          <section key={category.id} id={category.slug} className="mb-16 lg:mb-24 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8 lg:mb-12">
              <h2 className="font-display text-2xl lg:text-4xl font-semibold text-foreground">
                {category.name}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            {category.products.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground italic">
                No products in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    imageUrl={product.image_paths?.[0] || ""}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </section>
        ))}

        {!isLoading && (!products || products.length === 0) && (
          <div className="text-center py-20">
            <h2 className="font-display text-2xl text-foreground mb-2">Collection Coming Soon</h2>
            <p className="font-body text-muted-foreground">
              Our curated selection is being prepared. Check back shortly.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="font-display text-lg text-foreground">REVE ESSENCE <span className="text-gold-gradient">NG</span></p>
          <p className="font-body text-xs text-muted-foreground mt-2 tracking-widest uppercase">
            Luxury Redefined &bull; © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Index;
