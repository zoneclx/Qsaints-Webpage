import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  to: string;
  customerName: string;
  orderId: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, customerName, orderId, message }: OrderEmailRequest = await req.json();

    console.log("Order email request received:", {
      to,
      customerName,
      orderId,
      messagePreview: message.substring(0, 50),
    });

    // Email sending is disabled - message logged successfully
    console.log("Note: Email sending is not configured. Message logged successfully.");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message logged successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-email:", error);
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
