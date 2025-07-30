import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const webhookData = await req.json()
    console.log('Received Instamojo webhook:', webhookData)

    // Verify webhook authenticity (you should implement proper verification)
    // For now, we'll just check if the required fields are present
    if (!webhookData.payment_id || !webhookData.status) {
      console.error('Invalid webhook data received')
      return new Response('Invalid webhook data', { status: 400 })
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (webhookData.status === 'Credit') {
      console.log('Payment successful, updating order status')
      
      // Here you would typically:
      // 1. Find the order associated with this payment
      // 2. Update the order status to 'paid' or 'confirmed'
      // 3. Send confirmation emails/SMS if needed
      
      // For now, we'll just log the successful payment
      console.log(`Payment ${webhookData.payment_id} completed successfully`)
    } else {
      console.log(`Payment ${webhookData.payment_id} failed with status: ${webhookData.status}`)
    }

    return new Response('Webhook processed', { 
      status: 200,
      headers: corsHeaders 
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response('Webhook processing failed', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})