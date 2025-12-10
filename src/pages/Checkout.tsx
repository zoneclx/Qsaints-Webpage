import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCreateOrder } from "@/hooks/useOrders";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Please sign in to continue");
        navigate("/auth");
      } else {
        setUser(session.user);
        setFormData(prev => ({
          ...prev,
          customerEmail: session.user.email || "",
        }));
      }
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const order = await createOrder.mutateAsync({
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone || null,
        shipping_address: formData.shippingAddress,
        shipping_city: formData.shippingCity,
        shipping_postal_code: formData.shippingPostalCode,
        shipping_country: formData.shippingCountry,
        order_items: items as any,
        total_amount: totalPrice,
        status: "pending",
      });

      // Send confirmation email in background
      supabase.functions.invoke("send-order-confirmation", {
        body: {
          orderId: order.id,
          customerEmail: formData.customerEmail,
          customerName: formData.customerName,
          orderItems: items,
          totalAmount: totalPrice,
          shippingAddress: formData.shippingAddress,
          shippingCity: formData.shippingCity,
          shippingCountry: formData.shippingCountry,
          phone: formData.customerPhone,
          paymentMethod: formData.paymentMethod,
        },
      });

      toast.success("Order placed successfully!", {
        description: "You will receive a confirmation email shortly.",
      });

      clearCart();
      navigate("/");
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order", {
        description: error.message || "Please try again later.",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₱{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Shipping Information Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email *</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="shippingAddress">Street Address *</Label>
                <Input
                  id="shippingAddress"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shippingCity">City *</Label>
                  <Input
                    id="shippingCity"
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shippingPostalCode">Postal Code *</Label>
                  <Input
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    value={formData.shippingPostalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shippingCountry">Country *</Label>
                <Input
                  id="shippingCountry"
                  name="shippingCountry"
                  value={formData.shippingCountry}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="gcash">GCash</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={createOrder.isPending}>
                {createOrder.isPending ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
