
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '../lib/cartStore';

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'multicaixa' | 'card'>('multicaixa');

  const handleFinish = async () => {
    setLoading(true);
    // Simulação de processamento de stock e pagamento
    await new Promise(res => setTimeout(res, 2000));
    setLoading(false);
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-black mb-6 uppercase">O teu carrinho está vazio</h2>
        <button onClick={() => navigate('/')} className="bg-[#f97316] text-white px-10 py-4 rounded-2xl font-black uppercase shadow-lg">
          Começar a Comprar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-black text-gray-900 mb-12 uppercase tracking-tighter">Checkout <span className="text-[#f97316]">Seguro</span></h1>
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-2/3 space-y-10">
            <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black bg-[#f97316] text-white text-xl">1</div>
                <h2 className="text-2xl font-black uppercase">Entrega em Angola</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Província</label>
                  <select className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold">
                    <option>Luanda</option>
                    <option>Benguela</option>
                    <option>Huambo</option>
                    <option>Cabinda</option>
                    <option>Huíla</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Município / Bairro / Rua</label>
                  <input type="text" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Número da Casa</label>
                  <input type="text" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Telefone Unitel/Movicel</label>
                  <input type="text" placeholder="+244" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold" />
                </div>
              </form>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black bg-[#f97316] text-white text-xl">2</div>
                <h2 className="text-2xl font-black uppercase">Pagamento</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setPaymentMethod('multicaixa')}
                  className={`flex items-center p-6 rounded-3xl border-2 transition-all group ${paymentMethod === 'multicaixa' ? 'border-[#f97316] bg-white shadow-xl' : 'border-gray-100 bg-white hover:border-orange-200'}`}
                >
                  <div className={`p-4 rounded-2xl mr-5 transition-colors ${paymentMethod === 'multicaixa' ? 'bg-[#f97316] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50'}`}>
                    <QrCode size={28} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-gray-900 uppercase text-sm tracking-tighter">Referência Multicaixa</p>
                    <p className="text-xs text-gray-400 font-bold">ATM ou MCX Express</p>
                  </div>
                </button>

                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center p-6 rounded-3xl border-2 transition-all group ${paymentMethod === 'card' ? 'border-[#f97316] bg-white shadow-xl' : 'border-gray-100 bg-white hover:border-orange-200'}`}
                >
                  <div className={`p-4 rounded-2xl mr-5 transition-colors ${paymentMethod === 'card' ? 'bg-[#f97316] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50'}`}>
                    <CreditCard size={28} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-gray-900 uppercase text-sm tracking-tighter">Cartão de Crédito</p>
                    <p className="text-xs text-gray-400 font-bold">Visa / Mastercard</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-10 space-y-6 p-6 bg-white rounded-3xl border border-gray-100 animate-fadeIn shadow-sm">
                  <div className="relative">
                    <input type="text" placeholder="Número do Cartão" className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="MM/AA" className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold" />
                    <input type="text" placeholder="CVV" className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f97316] outline-none font-bold" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-gray-950 rounded-[2.5rem] p-10 text-white shadow-2xl sticky top-24 border-4 border-[#f97316]/20">
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Resumo da Ordem</h2>
              
              <div className="space-y-6 mb-8 max-h-72 overflow-y-auto pr-2 no-scrollbar border-b border-gray-800 pb-8">
                {items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-black text-xs text-[#f97316]">
                        {item.quantity}x
                      </div>
                      <span className="font-bold text-gray-300 truncate max-w-[120px]">{item.product.name}</span>
                    </div>
                    <span className="font-black text-white">Kz {(item.product.price * item.quantity).toLocaleString('pt-AO')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-gray-400 font-bold text-sm">
                  <span className="uppercase tracking-widest">Subtotal</span>
                  <span>Kz {total.toLocaleString('pt-AO')}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold text-sm">
                  <span className="uppercase tracking-widest">Portes</span>
                  <span className="text-green-500">GRÁTIS</span>
                </div>
                <div className="flex justify-between text-3xl font-black text-[#f97316] pt-6 mt-6 border-t border-gray-800">
                  <span>TOTAL</span>
                  <span>Kz {total.toLocaleString('pt-AO')}</span>
                </div>
              </div>

              <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full bg-[#f97316] text-white py-6 rounded-[1.5rem] font-black text-xl mt-12 hover:bg-white hover:text-[#f97316] transition-all shadow-2xl flex items-center justify-center space-x-4 disabled:opacity-50 group"
              >
                {loading ? (
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={28} className="group-hover:scale-125 transition-transform" />
                    <span className="uppercase tracking-tighter">Confirmar Pedido</span>
                  </>
                )}
              </button>
              
              <div className="mt-8 flex items-center justify-center space-x-2 opacity-50">
                <ShieldCheck size={16} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Pagamento 100% Protegido</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
