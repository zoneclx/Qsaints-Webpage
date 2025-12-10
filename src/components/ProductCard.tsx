import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

const ProductCard = ({ id, name, price, image, description }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover-lift bg-card">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-secondary/30">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </Link>
      <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        <div className="flex items-center justify-between pt-2 gap-2">
          <span className="text-lg sm:text-xl font-bold text-foreground">${price}</span>
          <Link to={`/product/${id}`}>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
