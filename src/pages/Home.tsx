import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroBanner from "@/assets/hero-banner.jpg";
import { toast } from "sonner";

const Home = () => {
  const featuredSection = useScrollAnimation();
  const storySection = useScrollAnimation();
  const newsletterSection = useScrollAnimation();
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    toast.success("Thanks for subscribing!", {
      description: `We'll send updates to ${email}`,
    });
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in tracking-tight">
           
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
        
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover-lift">
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div 
          ref={featuredSection.ref}
          className={`container mx-auto scroll-fade-in ${featuredSection.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-foreground tracking-tight">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
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
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-secondary/50">
        <div 
          ref={storySection.ref}
          className={`container mx-auto max-w-3xl text-center scroll-fade-in ${storySection.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight">Our Story</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            At Qsaints., we believe in the power of thoughtful design and sustainable practices. 
            Each piece is carefully crafted to stand the test of time, both in style and quality. 
            We're committed to creating clothing that moves with you through life's journey.
          </p>
          <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground hover-lift">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div 
          ref={newsletterSection.ref}
          className={`container mx-auto max-w-2xl text-center scroll-fade-in ${newsletterSection.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground tracking-tight">Stay Connected</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 h-12"
            />
            <Button type="submit" size="lg" className="px-6 sm:px-8 h-12 hover-lift">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
