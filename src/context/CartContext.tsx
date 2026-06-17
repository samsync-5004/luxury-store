import * as React from "react";
import type { Product } from "@/lib/api";

export type CartItem = {
  product: Product & {
    selectedSize?: string;
    selectedColor?: string;
  };
  quantity: number;
  id: string;
};

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (
    product: Product,
    selectedSize?: string,
    selectedColor?: string,
    quantity?: number,
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "reve-essence-cart";

const getItemId = (productId: string, selectedSize?: string, selectedColor?: string) =>
  [productId, selectedSize || "", selectedColor || ""].join("|");

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      setItems([]);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage failures
    }
  }, [items]);

  const addToCart = React.useCallback(
    (
      product: Product,
      selectedSize?: string,
      selectedColor?: string,
      quantity: number = 1,
    ) => {
      const id = getItemId(product.id, selectedSize, selectedColor);
      setItems((current) => {
        const existing = current.find((item) => item.id === id);
        if (existing) {
          return current.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [
          ...current,
          {
            id,
            product: {
              ...product,
              selectedSize,
              selectedColor,
            },
            quantity,
          },
        ];
      });
    },
    [],
  );

  const removeFromCart = React.useCallback((itemId: string) => {
    setItems((current) => current.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = React.useCallback((itemId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );
  }, []);

  const clearCart = React.useCallback(() => setItems([]), []);

  const cartCount = React.useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const cartTotal = React.useMemo(
    () => items.reduce((total, item) => total + item.quantity * Number(item.product.price), 0),
    [items],
  );

  const value = React.useMemo(
    () => ({ items, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }),
    [items, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
