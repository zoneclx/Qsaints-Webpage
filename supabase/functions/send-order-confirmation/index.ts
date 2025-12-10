import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("re_Ko4WFR9m_CqMnSQLo3U3Wd3sZ56wkdnLM"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  orderItems: any[];
  totalAmount: number;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  phone: string;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      orderId, 
      customerEmail, 
      customerName, 
      orderItems, 
      totalAmount,
      shippingAddress,
      shippingCity,
      shippingCountry,
      phone,
      paymentMethod
    }: OrderConfirmationRequest = await req.json();

    console.log("Order confirmation received:", {
      orderId,
      customerEmail,
      customerName,
      totalAmount,
      itemCount: orderItems.length,
    });

    // Format order items for email
    const itemsList = orderItems.map(item => 
      `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const emailHtml = `
      <h2>New Order Received!</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      
      <h3>Customer Information:</h3>
      <p>
        <strong>Name:</strong> ${customerName}<br>
        <strong>Email:</strong> ${customerEmail}<br>
        <strong>Phone:</strong> ${phone}
      </p>

      <h3>Shipping Address:</h3>
      <p>
        ${shippingAddress}<br>
        ${shippingCity}<br>
        ${shippingCountry}
      </p>

      <h3>Order Details:</h3>
      <pre>${itemsList}</pre>
      
      <p><strong>Total Amount: ₱${totalAmount.toFixed(2)}</strong></p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
    `;

    // Send email to business owner
    const emailResponse = await resend.emails.send({
      from: "Order Notification <onboarding@resend.dev>",
      to: ["enzogimena.shawn@gmail.com"],
      subject: `New Order #${orderId} - ₱${totalAmount.toFixed(2)}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order placed successfully and email sent" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
