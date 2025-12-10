import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground">
            Building a legacy through authentic design and sustainable practices
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            At Qsaints, we believe in the power of thoughtful design and sustainable practices. 
            Each piece is carefully crafted to stand the test of time, both in style and quality. 
            We're committed to creating clothing that moves with you through life's journey.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our designs draw inspiration from urban streetwear culture while maintaining a 
            commitment to timeless aesthetics. We partner with ethical manufacturers and use 
            sustainable materials to ensure our impact on the planet is minimized while 
            maximizing quality and durability.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Quality First</h3>
              <p className="text-muted-foreground">
                Every piece is crafted with premium materials and meticulous attention to detail
              </p>
            </div>
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Sustainability</h3>
              <p className="text-muted-foreground">
                We prioritize eco-friendly practices and ethical manufacturing processes
              </p>
            </div>
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Authenticity</h3>
              <p className="text-muted-foreground">
                Designs that reflect genuine street culture and modern urban lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our collection of carefully curated pieces
          </p>
          <Link to="/shop">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
