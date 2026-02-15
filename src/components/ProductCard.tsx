import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  onClick: () => void;
}

export default function ProductCard({ name, price, imageUrl, onClick }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden bg-card rounded-sm">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-display text-base lg:text-lg text-foreground tracking-wide">
          {name}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          ₦{price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
