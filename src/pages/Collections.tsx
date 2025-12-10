import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Collections = () => {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Collections
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our curated collections designed for the modern lifestyle
          </p>
        </div>

        {categories.map((category) => (
          <section key={category} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Collections;
