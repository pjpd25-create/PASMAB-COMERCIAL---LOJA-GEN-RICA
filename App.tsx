
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartDrawer from './components/CartDrawer';
import { useCart } from './lib/cartStore';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(() => {
    const savedUser = localStorage.getItem('loja_online_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addToCart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  useEffect(() => {
    if (user) {
      localStorage.setItem('loja_online_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('loja_online_user');
    }
  }, [user]);

  const handleLogin = (email: string) => {
    setUser({
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email: email,
      isAdmin: email.includes('admin') // Simulação simples de admin
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  // Componente de Rota Protegida
  // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" 
  // and associated "missing children" errors during TS compilation.
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    const location = useLocation();
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
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
          
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
          
          <Route 
            path="/checkout" 
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/orders" 
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            } 
          />
          
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
        isAuthenticated={!!user}
      />
    </Router>
  );
};

export default App;
