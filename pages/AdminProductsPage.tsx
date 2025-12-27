
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Produtos</h1>
          <p className="text-gray-500">Adicione, edite ou remova itens do seu catálogo.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg active:scale-95">
          <Plus size={20} />
          <span>Novo Produto</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 text-gray-600 font-medium px-4 py-2 rounded-xl hover:bg-gray-100">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Estoque</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={product.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 capitalize">{product.categoryId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-900'}`}>
                      {product.stock} un
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#1E3A8A]">Kz {product.price.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
