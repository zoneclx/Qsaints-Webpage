import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      contactSchema.parse(data);
      setIsSubmitting(true);

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (error) throw error;

      toast.success("Message sent!", {
        description: `Thanks ${data.name}! We'll get back to you soon.`,
      });

      form.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation Error", {
          description: error.issues[0].message,
        });
      } else {
        console.error("Error sending contact email:", error);
        toast.error("Failed to send message", {
          description: "Please try again later or contact us directly.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@tandemco.com",
      href: "mailto:hello@tandemco.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Street Style Ave, NY 10001",
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-secondary/50 py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-foreground">
            Let's Connect
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg max-w-md mx-auto">
            We're here to help. Reach out through any channel below.
          </p>
        </div>
      </div>

      {/* Quick Contact Cards - Horizontal scroll on mobile */}
      <div className="px-4 -mt-4 md:-mt-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-3 md:gap-4 scrollbar-hide">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                className="flex-shrink-0 w-[160px] md:w-auto"
              >
                <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card h-full">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2.5 md:p-3 bg-primary/10 rounded-full">
                      <method.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base text-foreground">{method.label}</p>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{method.value}</p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 md:py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="md:col-span-3 order-2 md:order-1">
              <Card className="p-5 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-1 text-foreground">Send a Message</h2>
                <p className="text-sm text-muted-foreground mb-6">Fill out the form and we'll respond within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-sm">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more..."
                      required
                      className="min-h-[120px] md:min-h-[140px] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 text-base font-semibold gap-2" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Business Hours */}
            <div className="md:col-span-2 order-1 md:order-2">
              <Card className="p-5 md:p-6 bg-secondary/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Business Hours</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-foreground">Mon - Fri</span>
                    <span className="text-sm font-medium text-foreground">9AM - 6PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-foreground">Saturday</span>
                    <span className="text-sm font-medium text-foreground">10AM - 4PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-foreground">Sunday</span>
                    <span className="text-sm font-medium text-muted-foreground">Closed</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background rounded-lg">
                  <p className="text-xs md:text-sm text-muted-foreground text-center">
                    🌍 We typically respond within 24 hours
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
