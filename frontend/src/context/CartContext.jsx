import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('lego-cart');
    return savedCart ? JSON.parse(savedCart) : [];
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
    localStorage.setItem('lego-cart', JSON.stringify(cart));
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
