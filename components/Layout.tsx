
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/cartStore';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  openCart: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, openCart }) => {
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-[#f97316] flex items-center tracking-tighter uppercase">
            <ShoppingBag className="mr-2" />
            LOJA<span className="text-gray-900 ml-1">ONLINE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#f97316] font-semibold transition-colors">Loja</Link>
            {user?.isAdmin && (
              <Link to="/admin/products" className="text-gray-600 hover:text-[#f97316] font-semibold transition-colors">Gestão</Link>
            )}
            <Link to="/orders" className="text-gray-600 hover:text-[#f97316] font-semibold transition-colors">Encomendas</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-[#f97316] transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.email}</span>
                <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 p-2 text-gray-700 hover:text-[#f97316] transition-colors">
                <User size={20} />
                <span className="text-sm font-semibold hidden sm:block">Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold text-[#f97316] mb-6 uppercase flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              LOJA ONLINE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A tua plataforma de compras em Angola. Entregas rápidas em Luanda, Benguela e todo o país com a melhor qualidade.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Suporte</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-[#f97316]">Contactos</Link></li>
              <li><Link to="/orders" className="hover:text-[#f97316]">Seguir Encomenda</Link></li>
              <li><button className="hover:text-[#f97316]">Perguntas Frequentes</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button className="hover:text-[#f97316]">Termos de Uso</button></li>
              <li><button className="hover:text-[#f97316]">Privacidade</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Fica Atento</h4>
            <p className="text-sm text-gray-400 mb-6">Novidades exclusivas no teu e-mail.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-grow px-4 py-2 bg-gray-900 border border-gray-800 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#f97316]"
              />
              <button className="bg-[#f97316] text-white px-6 py-2 rounded-r-lg font-bold hover:bg-[#ea580c] transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-900 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Angola Online. Qualidade em primeiro lugar.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
