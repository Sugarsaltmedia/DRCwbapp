import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import Razorpay from 'razorpay';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface OrderRequest {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: any;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('🚀 Create Razorpay order function called');
  console.log('📋 Event method:', event.httpMethod);

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

    const { amount, currency = 'INR', receipt, notes }: OrderRequest = JSON.parse(event.body);
    console.log('💳 Order request data:', { amount, currency, receipt });

    // Validate required fields
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Valid amount is required' 
        })
      };
    }

    // Get Razorpay credentials from environment variables
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error('❌ Missing Razorpay credentials');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Payment service configuration error' })
      };
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    console.log('📤 Creating Razorpay order...');

    // Create order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    });

    console.log('✅ Razorpay order created successfully:', order.id);

    // Return the order details to the client
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: RAZORPAY_KEY_ID
      })
    };

  } catch (error) {
    console.error('❌ Order creation error:', error);
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