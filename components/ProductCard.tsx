
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-[#ef4444] text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-wider">
            -{discount}%
          </div>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-orange-400 mb-2">
          <Star size={12} fill="currentColor" />
          <span className="ml-1 text-gray-500 font-bold">{product.rating}</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-gray-900 font-bold mb-1 truncate group-hover:text-[#f97316] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-col mb-4 mt-auto">
          {product.oldPrice && (
            <span className="text-gray-400 text-[10px] line-through">
              Kz {product.oldPrice.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
            </span>
          )}
          <span className="text-[#f97316] font-black text-lg">
            Kz {product.price.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="w-full flex items-center justify-center space-x-2 bg-gray-950 text-white font-bold py-3 rounded-xl hover:bg-[#f97316] transition-all transform active:scale-95"
        >
          <ShoppingCart size={18} />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
