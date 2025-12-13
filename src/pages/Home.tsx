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
      {/* HERO SECTION */}
      <section className={`relative min-h-[100svh] flex items-end pb-12 sm:pb-16 lg:pb-20 overflow-hidden ${USE_LIGHT_OVERLAY ? "hero-light" : ""}`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div
            className={`absolute inset-0 ${
              USE_LIGHT_OVERLAY
                ? "bg-gradient-to-t from-white/80 via-white/40 to-white/20"
                : "bg-gradient-to-t from-black/80 via-black/50 to-black/20"
            }`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
              {/* LEFT */}
              <div className="space-y-6 sm:space-y-8">
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 bg-hero-glass-bg/90 lg:bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white-muted text-sm font-medium drop-shadow-sm">
                    New Collection Available
                  </span>
                </div>

                {/* HEADING */}
                <div className="space-y-2">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white sm:text-hero-text tracking-tighter leading-[0.9]">
                    Qsaints
                  </h1>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/80 lg:text-white/80 tracking-tighter leading-[0.9]">
                    FOCAL SHOP
                  </h1>
                </div>

                {/* DESCRIPTION */}
                <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-md leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Unleash your style. Bold pieces crafted for the modern generation who dare to stand out.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/shop">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl">
                      Shop Now →
                    </Button>
                  </Link>
                </div>
              </div>

              {/* DESKTOP STATS */}
              <div className="hidden lg:flex justify-end">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-white">100%</div>
                    <div className="text-white text-sm">Free Shipping</div>
                  </div>
                  <div className="bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-white">10+</div>
                    <div className="text-white text-sm">Unique Designs</div>
                  </div>
                  <div className="bg-hero-glass-bg backdrop-blur-md border border-hero-glass-border rounded-2xl p-6 text-center col-span-2">
                    <div className="text-4xl font-bold text-white">100%</div>
                    <div className="text-white text-sm">Premium Quality</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE STATS */}
            <div className="flex lg:hidden gap-4 mt-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {[
                { value: "100%", label: "Free Shipping" },
                { value: "10+", label: "Unique Designs" },
                { value: "100%", label: "Premium Quality" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex-shrink-0 bg-hero-glass-bg/90 backdrop-blur-md border border-hero-glass-border rounded-xl px-5 py-3 text-center"
                >
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-sm text-white/80">{item.label}</div>
                </div>
              ))}
            </div>

            {/* SCROLL */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <div className="flex flex-col items-center gap-2 text-white/70">
                <span className="text-sm uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div ref={featuredSection.ref} className={`container mx-auto ${featuredSection.isVisible ? "opacity-100" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div ref={newsletterSection.ref} className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Stay Connected</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" name="email" placeholder="Enter your email" required className="h-12" />
            <Button type="submit" size="lg" className="h-12">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
