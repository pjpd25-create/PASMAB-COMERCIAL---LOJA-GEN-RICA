
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import RecommendationSection from '../components/RecommendationSection';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../constants';
import { Product } from '../types';
import { Search, ChevronLeft, ChevronRight, Zap, Flame, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onAddToCart: (p: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState(10);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Lógica do cronómetro de 10 segundos para "Flash Update"
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 10;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Duplicamos os produtos para o efeito de scroll infinito suave (Marquee)
  const marqueeProducts = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS];

  return (
    <div className="pb-20 bg-white overflow-x-hidden">
      {/* Hero Dinâmico */}
      <section className="relative h-[50vh] bg-gray-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-white text-xs font-black tracking-widest uppercase">Live: {MOCK_PRODUCTS.length} Produtos Disponíveis</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
            PASMAB <span className="text-[#f97316]">COMERCIAL</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto">
            A maior e mais rápida experiência de compras em Angola.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* MEGA CARROSSEL INFINITO (Marquee) */}
      <section className="py-8 bg-white border-y border-gray-100 relative group">
        <div className="container mx-auto px-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#f97316] p-2 rounded-xl text-white shadow-lg shadow-orange-200">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase">Flash Catalog</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-950 text-white px-4 py-1.5 rounded-full text-xs font-bold">
              <Flame size={14} className="text-orange-500 animate-pulse" />
              <span>REFRESH EM {countdown}s</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="animate-scroll flex space-x-6 hover:[animation-play-state:paused]">
            {marqueeProducts.map((product, idx) => (
              <div key={`${product.id}-${idx}`} className="w-[240px] shrink-0 transition-transform duration-300 hover:scale-105">
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center">
          <div className="relative flex-grow w-full group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f97316] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Pesquisar em todo o catálogo PASMAB..."
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#f97316] outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar w-full lg:w-auto p-2">
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-4 rounded-2xl whitespace-nowrap font-black text-sm transition-all transform active:scale-95 ${
                  selectedCategory === cat.id 
                    ? 'bg-[#f97316] text-white shadow-[0_10px_20px_rgba(249,115,22,0.3)] scale-105' 
                    : 'bg-white border border-gray-100 text-gray-600 hover:border-[#f97316] hover:text-[#f97316]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mb-20">
          <RecommendationSection onAddToCart={onAddToCart} />
        </div>

        {/* Grid View principal */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Todos os Itens <span className="text-[#f97316] ml-2">[{filteredProducts.length}]</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Zap size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600">Nenhum produto encontrado com "{searchQuery}"</h3>
            <p className="text-gray-400">Tente outra categoria ou termo de pesquisa.</p>
          </div>
        )}
      </div>

      {/* Promo Banner Inferior */}
      <section className="container mx-auto px-4 mt-24">
        <div className="bg-[#f97316] rounded-[3rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <TrendingUp size={400} />
          </div>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase">O Futuro do Comércio em Angola.</h2>
            <p className="text-lg opacity-90 mb-8 font-medium">Junte-se a milhares de clientes satisfeitos na PASMAB COMERCIAL. Qualidade, rapidez e confiança.</p>
            <button className="bg-white text-[#f97316] px-10 py-4 rounded-2xl font-black text-lg hover:shadow-xl transition-all active:scale-95">
              CRIAR CONTA GRÁTIS
            </button>
          </div>
          <div className="mt-12 md:mt-0 relative z-10">
             <div className="grid grid-cols-2 gap-4">
               {[...MOCK_PRODUCTS].slice(0, 4).map(p => (
                 <img key={p.id} src={p.imageUrl} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white/20 shadow-lg" alt="Pasmab Preview" />
               ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
