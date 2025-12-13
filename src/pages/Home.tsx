import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroBanner from "@/assets/hero-banner.jpg";
import { toast } from "sonner";

// Set to true for bright background images, false for dark backgrounds
const USE_LIGHT_OVERLAY = false;

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
      {/* Hero Section - Add 'hero-light' class for bright backgrounds */}
      <section className={`relative min-h-[100svh] flex items-end pb-12 sm:pb-16 lg:pb-20 overflow-hidden ${USE_LIGHT_OVERLAY ? 'hero-light' : ''}`}>
        {/* Background Image with Dynamic Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className={`absolute inset-0 ${USE_LIGHT_OVERLAY ? 'bg-gradient-to-t from-white/80 via-white/40 to-white/20' : 'bg-gradient-to-t from-hero-overlay/80 via-hero-overlay/40 to-hero-overlay/20'}`} />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-hero-glass-border rounded-full animate-pulse" />
        </div>
        <div className="absolute top-20 right-10 sm:top-32 sm:right-20 z-10 hidden sm:block">
          <div className="w-8 h-8 bg-hero-glass-bg backdrop-blur-sm rounded-lg rotate-45" />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-full px-4 py-2 animate-fade-in">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-hero-text-muted text-sm font-medium">New Collection Available</span>
                </div>
                
                {/* Heading */}
                <div className="space-y-2">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-hero-text animate-fade-in tracking-tighter leading-[0.9]">
                    Qsaints
                  </h1>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-hero-text-muted animate-fade-in tracking-tighter leading-[0.9]">
                    FOCAL SHOP
                  </h1>
                </div>
                
                {/* Description */}
                <p className="text-lg sm:text-xl text-hero-text-muted max-w-md leading-relaxed">
                  Unleash your style. Bold pieces crafted for the modern generation who dare to stand out.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/shop">
                    <Button size="lg" className="w-full sm:w-auto bg-hero-btn-bg !text-hero-btn-text hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover-lift group">
                      Shop Now
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </Link>
                  <Link to="/collections">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-hero-glass-border text-hero-text hover:bg-hero-glass-bg px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm">
                      View Collections
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right Stats - Desktop Only */}
              <div className="hidden lg:flex justify-end">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-hero-text mb-1">100%</div>
                    <div className="text-hero-text-muted text-sm">Free Shipping</div>
                  </div>
                  <div className="bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-hero-text mb-1">10+</div>
                    <div className="text-hero-text-muted text-sm">Unique Designs</div>
                  </div>
                  <div className="bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-2xl p-6 text-center col-span-2">
                    <div className="text-4xl font-bold text-hero-text mb-1">100%</div>
                    <div className="text-hero-text-muted text-sm">Premium Quality</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Stats */}
            <div className="flex lg:hidden gap-4 mt-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex-shrink-0 bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold text-hero-text">500+</div>
                <div className="text-hero-text-muted text-xs">Customers</div>
              </div>
              <div className="flex-shrink-0 bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold text-hero-text">50+</div>
                <div className="text-hero-text-muted text-xs">Designs</div>
              </div>
              <div className="flex-shrink-0 bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold text-hero-text">100%</div>
                <div className="text-hero-text-muted text-xs">Quality</div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <div className="flex flex-col items-center gap-2 text-white/50">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
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
            At Qsaints, we believe in the power of thoughtful design and sustainable practices. 
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
