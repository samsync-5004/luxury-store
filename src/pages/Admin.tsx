import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  createCategory,
  deleteCategory,
} from "@/lib/api";
import AdminLogin from "@/components/AdminLogin";
import ProductForm from "@/components/ProductForm";
import CategoryManager from "@/components/CategoryManager";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, Plus, Pencil, Trash2, Loader2, ArrowLeft, Tags } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("products-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: !!session,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: !!session,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product deleted" });
      setDeleteId(null);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={() => {}} />;
  }

  const getCategoryName = (categoryId: string) => {
    return categories?.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-display text-xl font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { setShowCategories(true); setShowForm(false); }}>
              <Tags size={16} className="mr-2" /> Categories
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {showCategories ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-foreground">Manage Categories</h2>
              <Button variant="outline" size="sm" onClick={() => setShowCategories(false)}>
                Back to Products
              </Button>
            </div>
            <CategoryManager />
          </div>
        ) : showForm ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-foreground">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <Button variant="outline" size="sm" onClick={() => { setShowForm(false); setEditingProduct(null); }}>
                Cancel
              </Button>
            </div>
            <ProductForm
              product={editingProduct}
              categories={categories || []}
              onSuccess={() => {
                setShowForm(false);
                setEditingProduct(null);
                queryClient.invalidateQueries({ queryKey: ["products"] });
              }}
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-foreground">Products</h2>
              <Button onClick={() => { setShowForm(true); setEditingProduct(null); }}>
                <Plus size={16} className="mr-2" /> Add Product
              </Button>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-foreground" />
              </div>
            ) : !products || products.length === 0 ? (
              <p className="text-center text-muted-foreground font-body py-12">
                No products yet. Add your first product above.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-3 px-2 font-body text-xs uppercase tracking-widest text-muted-foreground">Image</th>
                      <th className="py-3 px-2 font-body text-xs uppercase tracking-widest text-muted-foreground">Name</th>
                      <th className="py-3 px-2 font-body text-xs uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Category</th>
                      <th className="py-3 px-2 font-body text-xs uppercase tracking-widest text-muted-foreground">Price</th>
                      <th className="py-3 px-2 font-body text-xs uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-2">
                          <img
                            src={product.image_paths?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-sm"
                          />
                        </td>
                        <td className="py-3 px-2 font-body text-sm text-foreground">{product.name}</td>
                        <td className="py-3 px-2 font-body text-sm text-muted-foreground hidden sm:table-cell">
                          {getCategoryName(product.category_id)}
                        </td>
                        <td className="py-3 px-2 font-body text-sm text-foreground">
                          ₦{Number(product.price).toLocaleString()}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => { setEditingProduct(product); setShowForm(true); }}
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteId(product.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">Delete Product</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. The product will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
