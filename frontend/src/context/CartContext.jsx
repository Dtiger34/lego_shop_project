import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser } from '../service/authAPI';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user && user.id) {
        const savedCart = localStorage.getItem(`lego-cart-${user.id}`);
        return savedCart ? JSON.parse(savedCart) : [];
      }
    }
    // For guest users, load from guest cart
    const guestCart = localStorage.getItem('lego-cart-guest');
    return guestCart ? JSON.parse(guestCart) : [];
  });

  const [modal, setModal] = useState({
    show: false,
    product: null
  });

  const [toast, setToast] = useState({
    show: false,
    product: null
  });

  const [shippingModal, setShippingModal] = useState({
    show: false
  });

  useEffect(() => {
    // Always save cart to localStorage
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user && user.id) {
        localStorage.setItem(`lego-cart-${user.id}`, JSON.stringify(cart));
        // Remove guest cart when user is authenticated
        localStorage.removeItem('lego-cart-guest');
      }
    } else {
      // Save to guest cart for non-authenticated users
      localStorage.setItem('lego-cart-guest', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    setToast({
      show: true,
      product: product
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    // Remove cart from localStorage
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user && user.id) {
        localStorage.removeItem(`lego-cart-${user.id}`);
      }
    } else {
      localStorage.removeItem('lego-cart-guest');
    }
  };

  // Load cart from localStorage for authenticated user (merge with guest cart if exists)
  const loadUserCart = () => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user && user.id) {
        // Get guest cart if exists
        const guestCart = localStorage.getItem('lego-cart-guest');
        const guestItems = guestCart ? JSON.parse(guestCart) : [];
        
        // Get user cart
        const userCart = localStorage.getItem(`lego-cart-${user.id}`);
        const userItems = userCart ? JSON.parse(userCart) : [];
        
        // Merge carts: combine items, update quantities if duplicates
        const mergedCart = [...userItems];
        guestItems.forEach(guestItem => {
          const existingIndex = mergedCart.findIndex(item => item._id === guestItem._id);
          if (existingIndex > -1) {
            // Update quantity if item exists
            mergedCart[existingIndex].quantity += guestItem.quantity;
          } else {
            // Add new item
            mergedCart.push(guestItem);
          }
        });
        
        setCart(mergedCart);
        
        // Clean up guest cart after merging
        localStorage.removeItem('lego-cart-guest');
      }
    } else {
      // Load guest cart for non-authenticated users
      const guestCart = localStorage.getItem('lego-cart-guest');
      setCart(guestCart ? JSON.parse(guestCart) : []);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const closeToast = () => {
    setToast({ show: false, product: null });
  };

  const openModal = (product) => {
    setModal({ show: true, product });
  };

  const closeModal = () => {
    setModal({ show: false, product: null });
  };

  const openShippingModal = () => {
    setShippingModal({ show: true });
  };

  const closeShippingModal = () => {
    setShippingModal({ show: false });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadUserCart,
    getTotalItems,
    getTotalPrice,
    toast,
    closeToast,
    modal,
    openModal,
    closeModal,
    shippingModal,
    openShippingModal,
    closeShippingModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
