import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-8 sm:py-12 px-4 sm:px-6 mt-12 sm:mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Qsaints co.</h3>
            <p className="text-primary-foreground/80 mb-3 sm:mb-4 text-sm sm:text-base">
              Unleash your style.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/qsaints.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/60 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/qsaintsapparel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/60 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm sm:text-base">
              <li><Link to="/shop" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/collections" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">Collections</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm sm:text-base">
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm sm:text-base">
              <li><a href="mailto:hello@qsaints.co" className="hover:text-primary-foreground transition-colors">enzogimena.business@gmail.com</a></li>
              <li><a href="tel:+15551234567" className="hover:text-primary-foreground transition-colors">+639268778266</a></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">Contact Form</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 text-center text-primary-foreground/80 text-sm">
          <p>&copy; {new Date().getFullYear()} Qsaints Apparels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );1
};

export default Footer;
