import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct, updateProduct, uploadProductImage } from "@/lib/api";
import type { Category } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Upload } from "lucide-react";

interface ProductFormProps {
  product?: any;
  categories: Category[];
  onSuccess: () => void;
}

export default function ProductForm({ product, categories, onSuccess }: ProductFormProps) {
  const isEditing = !!product;
  const { toast } = useToast();

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(product?.category_id || "");
  const [material, setMaterial] = useState(product?.material || "");
  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);
  const [colors, setColors] = useState<string[]>(product?.colors || []);
  const [existingImages, setExistingImages] = useState<string[]>(product?.image_paths || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || !categoryId || !material) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (existingImages.length === 0 && newFiles.length === 0) {
      toast({ title: "Please add at least one image", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    try {
      // Upload new images
      const uploadedUrls: string[] = [];
      for (const file of newFiles) {
        const url = await uploadProductImage(file);
        uploadedUrls.push(url);
      }

      const allImages = [...existingImages, ...uploadedUrls];

      const productData = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category_id: categoryId,
        material: material.trim(),
        sizes,
        colors,
        image_paths: allImages,
      };

      if (isEditing) {
        await updateProduct(product.id, productData);
        toast({ title: "Product updated successfully" });
      } else {
        await createProduct(productData);
        toast({ title: "Product created successfully" });
      }

      onSuccess();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const addSize = () => {
    if (sizeInput.trim() && !sizes.includes(sizeInput.trim())) {
      setSizes([...sizes, sizeInput.trim()]);
      setSizeInput("");
    }
  };

  const addColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput.trim())) {
      setColors([...colors, colorInput.trim()]);
      setColorInput("");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles([...newFiles, ...Array.from(e.target.files)]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Name *</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-card border-border text-foreground" required />
      </div>

      <div className="space-y-2">
        <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Description *</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-card border-border text-foreground min-h-[100px]" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Price (₦) *</Label>
          <Input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-card border-border text-foreground" required />
        </div>
        <div className="space-y-2">
          <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Category *</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="bg-card border-border text-foreground">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Material *</Label>
        <Input value={material} onChange={(e) => setMaterial(e.target.value)} className="bg-card border-border text-foreground" required />
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Sizes</Label>
        <div className="flex gap-2">
          <Input value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())} placeholder="e.g. M, L, 42" className="bg-card border-border text-foreground" />
          <Button type="button" variant="outline" onClick={addSize} size="sm">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {sizes.map((s) => (
            <span key={s} className="px-3 py-1 bg-muted text-foreground text-xs font-body flex items-center gap-1 rounded-sm">
              {s}
              <button type="button" onClick={() => setSizes(sizes.filter((x) => x !== s))}><X size={12} /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Colors</Label>
        <div className="flex gap-2">
          <Input value={colorInput} onChange={(e) => setColorInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())} placeholder="e.g. Black, Gold" className="bg-card border-border text-foreground" />
          <Button type="button" variant="outline" onClick={addColor} size="sm">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((c) => (
            <span key={c} className="px-3 py-1 bg-muted text-foreground text-xs font-body flex items-center gap-1 rounded-sm">
              {c}
              <button type="button" onClick={() => setColors(colors.filter((x) => x !== c))}><X size={12} /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Images *</Label>
        <div className="flex flex-wrap gap-3">
          {existingImages.map((url, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={url} alt="" className="w-full h-full object-cover rounded-sm" />
              <button
                type="button"
                onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {newFiles.map((file, i) => (
            <div key={`new-${i}`} className="relative w-20 h-20">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover rounded-sm" />
              <button
                type="button"
                onClick={() => setNewFiles(newFiles.filter((_, j) => j !== i))}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          <label className="w-20 h-20 border border-dashed border-border flex items-center justify-center cursor-pointer hover:border-foreground/50 transition-colors rounded-sm">
            <Upload size={20} className="text-muted-foreground" />
            <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {isEditing ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
