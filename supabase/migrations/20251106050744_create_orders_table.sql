/*
  # Create Orders Table and Authentication Setup

  ## Overview
  This migration creates the orders table for the DRC Cinema Hall food ordering system
  and sets up proper Row Level Security (RLS) policies for secure data access.

  ## 1. New Tables
    - `orders`
      - `id` (uuid, primary key): Unique identifier for each order
      - `items` (jsonb): Array of order items with product details, quantities, and prices
      - `total` (numeric): Total order amount in rupees
      - `seat_number` (integer): Cinema seat number
      - `row_selection` (text): Cinema row letter (A-L)
      - `screen_number` (integer): Cinema screen number (1-4)
      - `customer_name` (text): Customer's full name
      - `customer_phone` (text): Customer's phone number (10 digits)
      - `timestamp` (timestamptz): Order creation time with timezone
      - `status` (text): Order status - 'ongoing' or 'completed'
      - `payment_id` (text, optional): Razorpay payment ID
      - `payment_signature` (text, optional): Razorpay payment signature
      - `order_receipt` (text, optional): Order receipt reference
      - `created_at` (timestamptz): Record creation timestamp

  ## 2. Security Configuration
    - Enable Row Level Security on orders table
    - **SELECT Policy**: Authenticated users can read all orders (for admin dashboard)
    - **INSERT Policy**: Anonymous users can create orders (for customer checkout)
    - **UPDATE Policy**: Authenticated users can update order status (for admin operations)
    - **DELETE Policy**: Authenticated users can delete orders (for admin cleanup)

  ## 3. Performance Optimization
    - Index on timestamp column for efficient ordering by date
    - Index on status column for filtering ongoing/completed orders
    - Index on customer_phone for customer order lookup

  ## 4. Important Notes
    - RLS is enabled to protect data access
    - Anonymous users can only insert orders (checkout flow)
    - Only authenticated admin users can view, update, and delete orders
    - All timestamps use timestamptz for proper timezone handling
    - Items stored as JSONB for flexible product data structure
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  items jsonb NOT NULL,
  total numeric NOT NULL CHECK (total >= 0),
  seat_number integer NOT NULL CHECK (seat_number > 0),
  row_selection text NOT NULL CHECK (length(row_selection) > 0),
  screen_number integer NOT NULL CHECK (screen_number > 0),
  customer_name text NOT NULL CHECK (length(customer_name) > 0),
  customer_phone text NOT NULL CHECK (length(customer_phone) = 10),
  timestamp timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed')),
  payment_id text,
  payment_signature text,
  order_receipt text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users (admins) to view all orders
CREATE POLICY "Authenticated users can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow anonymous users to create orders (customer checkout)
CREATE POLICY "Anonymous users can create orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to create orders as well
CREATE POLICY "Authenticated users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to update order status
CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to delete orders
CREATE POLICY "Authenticated users can delete orders"
  ON orders
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_timestamp ON orders(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
