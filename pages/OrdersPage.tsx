
import React from 'react';
import { Package, ChevronRight, CheckCircle2, Truck, Clock } from 'lucide-react';

const OrdersPage: React.FC = () => {
  // Mock orders
  const orders = [
    {
      id: 'ORD-2023-1001',
      date: '25 de Outubro, 2023',
      total: 899.90,
      status: 'shipped',
      items: 1,
      image: 'https://picsum.photos/id/1/100/100'
    },
    {
      id: 'ORD-2023-1002',
      date: '15 de Outubro, 2023',
      total: 149.90,
      status: 'delivered',
      items: 2,
      image: 'https://picsum.photos/id/2/100/100'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'delivered': return { text: 'Entregue', color: 'text-green-500', bg: 'bg-green-50', icon: <CheckCircle2 size={16} /> };
      case 'shipped': return { text: 'Em Transporte', color: 'text-blue-500', bg: 'bg-blue-50', icon: <Truck size={16} /> };
      default: return { text: 'Processando', color: 'text-yellow-500', bg: 'bg-yellow-50', icon: <Clock size={16} /> };
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center space-x-4 mb-10">
        <div className="p-3 bg-[#1E3A8A] text-white rounded-2xl">
          <Package size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
          <p className="text-gray-500">Acompanhe o histórico de suas compras.</p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map(order => {
          const status = getStatusInfo(order.status);
          return (
            <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt="Produto" className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{order.id}</span>
                    <h3 className="text-lg font-bold text-gray-900">{order.date}</h3>
                    <p className="text-sm text-gray-500">{order.items} {order.items > 1 ? 'itens' : 'item'}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
                    {status.icon}
                    <span>{status.text}</span>
                  </div>
                  <p className="text-xl font-black text-[#1E3A8A]">
                    Kz {order.total.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                  </p>
                  <button className="text-[#1E3A8A] text-sm font-bold flex items-center hover:underline">
                    Ver detalhes <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Você ainda não realizou nenhum pedido.</p>
            <button className="mt-4 text-[#1E3A8A] font-bold">Começar a comprar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
