export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  maxPrice?: number;
  description?: string;
  image?: string;
  sizes?: string[];
  hasVariants?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: string | null;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: Date;
  status: 'ongoing' | 'completed';
  seatNumber?: number;
  rowSelection?: string;
  screenNumber?: number;
  customerName: string;
  customerPhone: string;
}