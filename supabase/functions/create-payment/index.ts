import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface PaymentRequest {
  amount: number;
  purpose: string;
  buyer_name: string;
  phone: string;
  redirect_url: string;
  webhook_url: string;
  send_email: boolean;
  send_sms: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, buyer_name, phone, redirect_url } = await req.json()

    // Validate required fields
    if (!amount || !buyer_name || !phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, buyer_name, phone' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Instamojo API credentials (stored as environment variables)
    const INSTAMOJO_API_KEY = Deno.env.get('INSTAMOJO_API_KEY')
    const INSTAMOJO_AUTH_TOKEN = Deno.env.get('INSTAMOJO_AUTH_TOKEN')

    if (!INSTAMOJO_API_KEY || !INSTAMOJO_AUTH_TOKEN) {
      console.error('Missing Instamojo credentials')
      return new Response(
        JSON.stringify({ error: 'Payment service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare payment request data
    const paymentData: PaymentRequest = {
      amount: amount,
      purpose: `DRC Cafe Order - ${buyer_name}`,
      buyer_name: buyer_name,
      phone: phone,
      redirect_url: redirect_url || `${new URL(req.url).origin}/order-success`,
      webhook_url: `${new URL(req.url).origin}/functions/v1/payment-webhook`,
      send_email: false,
      send_sms: false
    }

    console.log('Creating Instamojo payment request:', {
      amount: paymentData.amount,
      buyer_name: paymentData.buyer_name,
      phone: paymentData.phone
    })

    // Create payment request with Instamojo
    const instamojoResponse = await fetch('https://test.instamojo.com/api/1.1/payment-requests/', {
      method: 'POST',
      headers: {
        'X-Api-Key': INSTAMOJO_API_KEY,
        'X-Auth-Token': INSTAMOJO_AUTH_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(paymentData as any).toString()
    })

    const responseText = await instamojoResponse.text()
    console.log('Instamojo API response status:', instamojoResponse.status)
    console.log('Instamojo API response:', responseText)

    if (!instamojoResponse.ok) {
      console.error('Instamojo API error:', responseText)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create payment request',
          details: responseText 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const instamojoData = JSON.parse(responseText)

    if (!instamojoData.success) {
      console.error('Instamojo payment creation failed:', instamojoData)
      return new Response(
        JSON.stringify({ 
          error: 'Payment request creation failed',
          details: instamojoData.message || 'Unknown error'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Return the payment URL to the client
    return new Response(
      JSON.stringify({
        success: true,
        payment_url: instamojoData.payment_request.longurl,
        payment_id: instamojoData.payment_request.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Payment creation error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})