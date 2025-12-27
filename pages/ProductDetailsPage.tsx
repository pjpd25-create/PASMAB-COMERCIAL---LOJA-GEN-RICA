
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, Review } from '../types';
import RecommendationSection from '../components/RecommendationSection';
import { useHistory } from '../lib/historyStore';

interface ProductDetailsPageProps {
  onAddToCart: (p: Product) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const { trackProduct } = useHistory();
  
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      trackProduct(product.id);
    }
  }, [product, trackProduct]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Produto não encontrado</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-[#f97316] font-semibold flex items-center justify-center mx-auto">
          <ArrowLeft size={20} className="mr-2" /> Voltar à Loja
        </button>
      </div>
    );
  }

  const reviews: Review[] = [
    { id: '1', productId: '1', userId: 'u1', userName: 'António Luanda', rating: 5, comment: 'Excelente qualidade, recomendo vivamente!', createdAt: '2023-11-10' },
    { id: '2', productId: '1', userId: 'u2', userName: 'Helena Benguela', rating: 4, comment: 'Muito bonito e confortável.', createdAt: '2023-11-05' }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center text-gray-500 hover:text-[#f97316] transition-colors font-bold"
      >
        <ArrowLeft size={20} className="mr-2" /> Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <div className="relative">
          <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="bg-orange-50 text-[#f97316] text-[10px] font-black px-3 py-1 rounded-full uppercase w-fit mb-4">
            {product.categoryId}
          </span>
          <h1 className="text-5xl font-black text-gray-950 mb-4 tracking-tight leading-none">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center text-orange-400">
              <Star size={20} fill="currentColor" />
              <span className="ml-2 text-gray-900 font-black text-xl">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 font-medium">{reviews.length} Avaliações</span>
          </div>

          <div className="mb-10">
            <span className="text-4xl font-black text-[#f97316]">
              Kz {product.price.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
            </span>
            {product.oldPrice && (
              <span className="ml-4 text-xl text-gray-300 line-through">
                Kz {product.oldPrice.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
              <Truck size={24} className="text-[#f97316]" />
              <span className="text-xs font-bold text-gray-700">Entrega Express em Luanda</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
              <ShieldCheck size={24} className="text-[#f97316]" />
              <span className="text-xs font-bold text-gray-700">Garantia 100% Original</span>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center space-x-4 ${
              product.stock > 0 
                ? 'bg-gray-950 text-white hover:bg-[#f97316]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={24} />
            <span>{product.stock > 0 ? 'ADICIONAR AO CARRINHO' : 'ESGOTADO'}</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-100 mb-12">
        <div className="flex space-x-12">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-xl font-black transition-all relative ${
              activeTab === 'description' ? 'text-[#f97316]' : 'text-gray-400'
            }`}
          >
            Detalhes Técnicos
            {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f97316] rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-xl font-black transition-all relative ${
              activeTab === 'reviews' ? 'text-[#f97316]' : 'text-gray-400'
            }`}
          >
            Feedback ({reviews.length})
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f97316] rounded-t-full" />}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mb-32">
        {activeTab === 'description' ? (
          <div className="text-gray-600 leading-loose text-lg">
            <p>O {product.name} representa o auge da engenharia e design moderno. Testado e aprovado pelos padrões mais rigorosos.</p>
            <ul className="mt-6 space-y-4 list-disc pl-6 text-[#f97316]">
              <li><span className="text-gray-600">Material de alta durabilidade e resistência</span></li>
              <li><span className="text-gray-600">Tecnologia adaptativa para o mercado Angolano</span></li>
              <li><span className="text-gray-600">Design premiado internacionalmente</span></li>
            </ul>
          </div>
        ) : (
          <div className="space-y-10">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-50 p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#f97316] text-white flex items-center justify-center font-black rounded-2xl">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900">{review.userName}</h4>
                      <p className="text-xs text-gray-400">{review.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex text-orange-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <RecommendationSection 
        currentProductId={product.id} 
        onAddToCart={onAddToCart} 
        title="Também podes gostar"
      />
    </div>
  );
};

export default ProductDetailsPage;
