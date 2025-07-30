import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PaymentRequest {
  amount: number;
  buyer_name: string;
  phone: string;
  redirect_url?: string;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('🚀 Create payment function called');
  console.log('📋 Event method:', event.httpMethod);
  console.log('📋 Event headers:', event.headers);

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: 'OK'
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const { amount, buyer_name, phone, redirect_url }: PaymentRequest = JSON.parse(event.body);
    console.log('💳 Payment request data:', { amount, buyer_name, phone });

    // Validate required fields
    if (!amount || !buyer_name || !phone) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing required fields: amount, buyer_name, phone' 
        })
      };
    }

    // Get Instamojo credentials from environment variables
    const INSTAMOJO_API_KEY = process.env.INSTAMOJO_API_KEY;
    const INSTAMOJO_AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN;

    if (!INSTAMOJO_API_KEY || !INSTAMOJO_AUTH_TOKEN) {
      console.error('❌ Missing Instamojo credentials');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Payment service configuration error' })
      };
    }

    // Get the site URL for redirect and webhook URLs
    const siteUrl = process.env.URL || `https://${event.headers.host}`;
    const defaultRedirectUrl = `${siteUrl}/#/payment-success`;
    const webhookUrl = `${siteUrl}/.netlify/functions/payment-webhook`;

    // Prepare payment request data for Instamojo
    const paymentData = new URLSearchParams({
      amount: amount.toString(),
      purpose: `DRC Cafe Order - ${buyer_name}`,
      buyer_name: buyer_name,
      phone: phone,
      redirect_url: redirect_url || defaultRedirectUrl,
      webhook_url: webhookUrl,
      send_email: 'false',
      send_sms: 'false'
    });

    console.log('📤 Sending request to Instamojo...');
    console.log('🔗 Webhook URL:', webhookUrl);
    console.log('🔗 Redirect URL:', redirect_url || defaultRedirectUrl);

    // Create payment request with Instamojo
    const instamojoResponse = await fetch('https://test.instamojo.com/api/1.1/payment-requests/', {
      method: 'POST',
      headers: {
        'X-Api-Key': INSTAMOJO_API_KEY,
        'X-Auth-Token': INSTAMOJO_AUTH_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: paymentData.toString()
    });

    const responseText = await instamojoResponse.text();
    console.log('📨 Instamojo response status:', instamojoResponse.status);
    console.log('📨 Instamojo response:', responseText);

    if (!instamojoResponse.ok) {
      console.error('❌ Instamojo API error:', responseText);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Failed to create payment request',
          details: responseText 
        })
      };
    }

    const instamojoData = JSON.parse(responseText);

    if (!instamojoData.success) {
      console.error('❌ Instamojo payment creation failed:', instamojoData);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Payment request creation failed',
          details: instamojoData.message || 'Unknown error'
        })
      };
    }

    console.log('✅ Payment request created successfully');
    console.log('🔗 Payment URL:', instamojoData.payment_request.longurl);

    // Return the payment URL to the client
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        payment_url: instamojoData.payment_request.longurl,
        payment_id: instamojoData.payment_request.id
      })
    };

  } catch (error) {
    console.error('❌ Payment creation error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};