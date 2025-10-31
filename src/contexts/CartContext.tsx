import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; quantity: number; selectedSize?: string | null } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity, selectedSize } = action.payload;
      const existingItemIndex = state.items.findIndex(
        cartItem => cartItem.id === item.id && cartItem.selectedSize === selectedSize
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        newItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        const newItem: CartItem = {
          ...item,
          quantity,
          selectedSize,
          price: selectedSize === 'Large' && item.maxPrice ? item.maxPrice : item.price
        };
        newItems = [...state.items, newItem];
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newItems = quantity === 0 
        ? state.items.filter(item => item.id !== id)
        : state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0
};

interface CartContextType {
  state: CartState;
  addItem: (item: MenuItem, quantity: number, selectedSize?: string | null) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: MenuItem, quantity: number, selectedSize?: string | null) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity, selectedSize } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};