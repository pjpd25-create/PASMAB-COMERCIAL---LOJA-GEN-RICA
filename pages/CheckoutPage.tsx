
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '../lib/cartStore';

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'multicaixa' | 'card'>('multicaixa');

  const handleFinish = async () => {
    setLoading(true);
    // Simulate stock validation and payment processing
    await new Promise(res => setTimeout(res, 2000));
    setLoading(false);
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio para checkout</h2>
        <button onClick={() => navigate('/')} className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-bold">
          Voltar às compras
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                <h2 className="text-xl font-bold">Endereço de Entrega</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Província</label>
                  <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none">
                    <option>Luanda</option>
                    <option>Benguela</option>
                    <option>Huambo</option>
                    <option>Cabinda</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro / Rua</label>
                  <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número da Casa</label>
                  <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone de Contacto</label>
                  <input type="text" placeholder="+244" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                <h2 className="text-xl font-bold">Método de Pagamento</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('multicaixa')}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'multicaixa' ? 'border-[#1E3A8A] bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`p-3 rounded-xl mr-4 ${paymentMethod === 'multicaixa' ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <QrCode size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Referência Multicaixa</p>
                    <p className="text-xs text-gray-500">Pague no ATM ou App</p>
                  </div>
                </button>

                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-[#1E3A8A] bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`p-3 rounded-xl mr-4 ${paymentMethod === 'card' ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <CreditCard size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Cartão de Crédito</p>
                    <p className="text-xs text-gray-500">Visa / Mastercard</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-8 space-y-4 animate-fadeIn">
                  <div className="relative">
                    <input type="text" placeholder="Número do Cartão" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
                    <input type="text" placeholder="CVV" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">{item.quantity}x</span>
                      <span className="font-medium text-gray-800 truncate max-w-[150px]">{item.product.name}</span>
                    </div>
                    <span className="font-bold text-[#1E3A8A]">Kz {(item.product.price * item.quantity).toLocaleString('pt-AO', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>Kz {total.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Entrega</span>
                  <span className="text-green-500 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#1E3A8A] pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>Kz {total.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full bg-[#1E3A8A] text-white py-4 rounded-2xl font-bold text-lg mt-8 hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={24} />
                    <span>Finalizar e Pagar</span>
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                <ShieldCheck size={14} className="mr-1" /> Transação segura e criptografada
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
