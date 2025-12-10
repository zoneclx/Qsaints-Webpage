import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders, useUpdateOrderStatus, Order } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";

const Orders = () => {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const sendEmail = async () => {
    if (!selectedOrder || !emailMessage) {
      toast.error("Please select an order and enter a message");
      return;
    }

    setSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke("send-order-email", {
        body: {
          to: selectedOrder.customer_email,
          customerName: selectedOrder.customer_name,
          orderId: selectedOrder.id,
          message: emailMessage,
        },
      });

      if (error) throw error;

      toast.success("Email sent successfully!");
      setEmailMessage("");
      setSelectedOrder(null);
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>

        {orders.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground">No orders yet</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    
                    <div className="space-y-2">
                      <p><strong>Customer:</strong> {order.customer_name}</p>
                      <p><strong>Email:</strong> {order.customer_email}</p>
                      {order.customer_phone && (
                        <p><strong>Phone:</strong> {order.customer_phone}</p>
                      )}
                      <p><strong>Address:</strong></p>
                      <p className="text-sm">
                        {order.shipping_address}<br />
                        {order.shipping_city}, {order.shipping_postal_code}<br />
                        {order.shipping_country}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Order Items</h4>
                    <div className="space-y-2 mb-4">
                      {(order.order_items as any[]).map((item: any, index: number) => (
                        <div key={index} className="text-sm">
                          {item.name} - Size {item.size} × {item.quantity} = ${item.price * item.quantity}
                        </div>
                      ))}
                      <p className="font-bold text-lg mt-2">Total: ${order.total_amount}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label>Status</Label>
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateStatus.mutate({ orderId: order.id, newStatus: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => setSelectedOrder(order)}
                        variant="outline"
                        className="w-full"
                      >
                        Send Email to Customer
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Email Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <Card className="p-6 max-w-lg w-full">
              <h3 className="text-2xl font-bold mb-4">Send Email</h3>
              <p className="mb-4">
                To: {selectedOrder.customer_email} ({selectedOrder.customer_name})
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emailMessage">Message</Label>
                  <Input
                    id="emailMessage"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Enter your message..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={sendEmail} disabled={sendingEmail}>
                    {sendingEmail ? "Sending..." : "Send Email"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(null);
                      setEmailMessage("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
