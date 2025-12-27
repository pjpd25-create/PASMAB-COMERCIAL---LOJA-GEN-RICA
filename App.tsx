
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import CartDrawer from './components/CartDrawer';
import { useCart } from './lib/cartStore';

// Simple mock user
const MOCK_USER = {
  id: 'user123',
  email: 'admin@lovableshop.com',
  isAdmin: true
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(MOCK_USER);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addToCart, removeFromCart, updateQuantity, total } = useCart();

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <Router>
      <Layout 
        user={user} 
        onLogout={handleLogout} 
        openCart={() => setIsCartOpen(true)}
      >
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetailsPage onAddToCart={handleAddToCart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          
          {/* Admin Route Protection Simulation */}
          <Route 
            path="/admin/products" 
            element={user?.isAdmin ? <AdminProductsPage /> : <Navigate to="/" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={total}
      />
    </Router>
  );
};

export default App;
