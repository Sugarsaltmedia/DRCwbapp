import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Razorpay-Signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Function to verify Razorpay webhook signature
function verifyRazorpaySignature(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    return expectedSignature === signature;
  } catch (error) {
    console.error('❌ Error verifying webhook signature:', error);
    return false;
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('🎣 Razorpay webhook function called');
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
    // Parse webhook data
    if (!event.body) {
      console.error('❌ No webhook body received');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: 'Bad Request: No body'
      };
    }

    const signature = event.headers['x-razorpay-signature'];
    if (!signature) {
      console.error('❌ No signature found in headers');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: 'Bad Request: No signature'
      };
    }

    // Get Razorpay webhook secret
    const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!RAZORPAY_WEBHOOK_SECRET) {
      console.error('❌ RAZORPAY_WEBHOOK_SECRET not configured');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: 'Server configuration error'
      };
    }

    // Verify webhook signature
    if (!verifyRazorpaySignature(event.body, signature, RAZORPAY_WEBHOOK_SECRET)) {
      console.error('❌ Webhook signature verification failed');
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: 'Forbidden: Invalid signature'
      };
    }

    console.log('✅ Webhook signature verified successfully');

    // Parse webhook payload
    const webhookData = JSON.parse(event.body);
    console.log('📨 Received Razorpay webhook:', webhookData.event);

    // Handle different webhook events
    switch (webhookData.event) {
      case 'payment.captured':
        console.log('✅ Payment captured:', webhookData.payload.payment.entity.id);
        
        // Update order status in your database
        // Example: Mark order as paid/completed
        const paymentEntity = webhookData.payload.payment.entity;
        
        // Initialize Supabase client if needed
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseServiceKey) {
          const supabase = createClient(supabaseUrl, supabaseServiceKey);
          
          // Update order status
          // await supabase
          //   .from('orders')
          //   .update({ 
          //     status: 'completed', 
          //     payment_status: 'paid',
          //     payment_id: paymentEntity.id,
          //     razorpay_order_id: paymentEntity.order_id
          //   })
          //   .eq('order_id', paymentEntity.order_id);
        }
        
        console.log('🎉 Order marked as completed');
        break;

      case 'payment.failed':
        console.log('❌ Payment failed:', webhookData.payload.payment.entity.id);
        
        // Handle failed payment
        // Mark order as failed in database
        break;

      default:
        console.log('ℹ️ Unhandled webhook event:', webhookData.event);
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ status: 'success' })
    };

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};