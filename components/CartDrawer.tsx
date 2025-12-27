
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  total: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#1E3A8A] flex items-center">
              <ShoppingBag className="mr-2" size={24} /> Seu Carrinho
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Seu carrinho está vazio.</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-[#1E3A8A] font-semibold hover:underline"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex space-x-4">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-[#1E3A8A] font-bold text-sm">
                        Kz {item.product.price.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-gray-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-gray-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 font-medium text-lg">Subtotal</span>
                <span className="text-2xl font-bold text-[#1E3A8A]">
                  Kz {total.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="block w-full text-center bg-[#1E3A8A] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg active:scale-[0.98]"
              >
                Finalizar Compra
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
