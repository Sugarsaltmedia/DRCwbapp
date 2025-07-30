import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Function to verify Instamojo webhook authenticity
function verifyInstamojoWebhook(webhookData: any, salt: string): boolean {
  try {
    // Extract the MAC (hash) sent by Instamojo
    const receivedMac = webhookData.mac;
    if (!receivedMac) {
      console.error('❌ No MAC found in webhook data');
      return false;
    }

    // Create a copy of webhook data without the MAC
    const dataToHash = { ...webhookData };
    delete dataToHash.mac;

    // Sort parameters alphabetically by key
    const sortedKeys = Object.keys(dataToHash).sort();

    // Concatenate values
    let concatenatedString = '';
    for (const key of sortedKeys) {
      concatenatedString += dataToHash[key];
    }

    // Append salt
    concatenatedString += salt;

    // Generate MD5 hash
    const generatedMac = crypto.createHash('md5').update(concatenatedString).digest('hex');

    console.log('🔐 Generated MAC:', generatedMac);
    console.log('🔐 Received MAC:', receivedMac);

    // Compare hashes
    return generatedMac === receivedMac;
  } catch (error) {
    console.error('❌ Error verifying webhook:', error);
    return false;
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('🎣 Webhook function called');
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

    // Parse the webhook data (Instamojo sends form-encoded data)
    const webhookData: any = {};
    const params = new URLSearchParams(event.body);
    for (const [key, value] of params.entries()) {
      webhookData[key] = value;
    }

    console.log('📨 Received Instamojo webhook:', webhookData);

    // Verify webhook authenticity
    const INSTAMOJO_SALT = process.env.INSTAMOJO_SALT;
    if (!INSTAMOJO_SALT) {
      console.error('❌ INSTAMOJO_SALT not configured');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: 'Server configuration error'
      };
    }

    if (!verifyInstamojoWebhook(webhookData, INSTAMOJO_SALT)) {
      console.error('❌ Webhook verification failed');
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: 'Forbidden: Webhook verification failed'
      };
    }

    console.log('✅ Webhook verified successfully');

    // Check if required fields are present
    if (!webhookData.payment_id || !webhookData.status) {
      console.error('❌ Invalid webhook data: missing payment_id or status');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: 'Invalid webhook data'
      };
    }

    // Initialize Supabase client (if you're using Supabase for data storage)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      console.log('🔥 Supabase client initialized');
    }

    // Process payment status
    if (webhookData.status === 'Credit') {
      console.log('✅ Payment successful:', webhookData.payment_id);
      
      // Here you would typically:
      // 1. Find the order associated with this payment_id
      // 2. Update the order status to 'paid' or 'completed'
      // 3. Send confirmation emails/SMS if needed
      // 4. Update inventory if applicable
      
      // Example: Update order in your database
      // if (supabase) {
      //   await supabase
      //     .from('orders')
      //     .update({ status: 'completed', payment_status: 'paid' })
      //     .eq('payment_id', webhookData.payment_id);
      // }
      
      console.log('🎉 Order marked as completed');
    } else {
      console.log('❌ Payment failed:', webhookData.payment_id, 'Status:', webhookData.status);
      
      // Handle failed payment
      // if (supabase) {
      //   await supabase
      //     .from('orders')
      //     .update({ status: 'failed', payment_status: 'failed' })
      //     .eq('payment_id', webhookData.payment_id);
      // }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: 'Webhook processed successfully'
    };

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: 'Webhook processing failed'
    };
  }
};