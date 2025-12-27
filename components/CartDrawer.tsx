
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  total: number;
  isAuthenticated: boolean;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  total,
  isAuthenticated
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-950 flex items-center uppercase tracking-tighter">
              <ShoppingBag className="mr-3 text-[#f97316]" size={28} /> Teu Carrinho
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-2xl transition-all">
              <X size={28} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-6 py-8 no-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <ShoppingBag size={80} className="text-gray-200 mb-6" />
                <p className="text-xl font-bold text-gray-400">Teu carrinho está vazio.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 text-[#f97316] font-black uppercase tracking-widest text-sm hover:underline"
                >
                  Ir às compras
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.productId} className="flex space-x-5 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-black text-gray-900 leading-tight mb-1">{item.product.name}</h3>
                        <p className="text-[#f97316] font-black">
                          Kz {item.product.price.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                          <button 
                            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:text-[#f97316] transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="px-4 text-sm font-black">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:text-[#f97316] transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.productId)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-8 border-t border-gray-100 bg-gray-50/50">
              {!isAuthenticated && (
                <div className="mb-6 flex items-start space-x-3 bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  <ShieldAlert className="text-[#f97316] shrink-0" size={20} />
                  <p className="text-xs font-bold text-orange-700 leading-tight uppercase tracking-tighter">
                    Precisas de fazer login ou registo para finalizar a tua compra.
                  </p>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total Estimado</span>
                <span className="text-3xl font-black text-gray-950">
                  Kz {total.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <button 
                onClick={handleCheckoutClick}
                className="block w-full text-center bg-[#f97316] text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-[#ea580c] transition-all shadow-xl shadow-orange-100 active:scale-[0.98] uppercase tracking-tighter"
              >
                {isAuthenticated ? 'Finalizar Compra' : 'Login para Comprar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
