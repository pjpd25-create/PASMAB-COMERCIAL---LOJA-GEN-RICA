
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { getAIRecommendations } from '../lib/aiService';
import { useCart } from '../lib/cartStore';
import { useHistory } from '../lib/historyStore';

interface RecommendationSectionProps {
  currentProductId?: string;
  onAddToCart: (p: Product) => void;
  title?: string;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ 
  currentProductId, 
  onAddToCart,
  title = "Sugestões Inteligentes"
}) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { items } = useCart();
  const { history } = useHistory();

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      const cartIds = items.map(i => i.productId);
      const recIds = await getAIRecommendations(history, cartIds, currentProductId);
      
      const recProducts = recIds
        .map(id => MOCK_PRODUCTS.find(p => p.id === id))
        .filter((p): p is Product => !!p && p.id !== currentProductId)
        .slice(0, 4);

      setRecommendations(recProducts);
      setLoading(false);
    };

    fetchRecs();
  }, [currentProductId, history.length, items.length]);

  if (!loading && recommendations.length === 0) return null;

  return (
    <div className="py-12 border-t border-gray-100">
      <div className="flex items-center space-x-2 mb-8">
        <div className="p-2 bg-orange-50 text-[#f97316] rounded-lg">
          <Sparkles size={20} />
        </div>
        <h2 className="text-2xl font-black text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-50 rounded-2xl aspect-[3/4] border border-gray-100" />
          ))
        ) : (
          recommendations.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendationSection;
