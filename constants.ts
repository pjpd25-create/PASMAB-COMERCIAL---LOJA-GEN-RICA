
import { Product, Category } from './types';

export const COLORS = {
  primary: '#f97316', // Orange 500
  primaryHover: '#ea580c', // Orange 600
  accent: '#ef4444',
  background: '#FFFFFF',
  gray: '#F3F4F6'
};

export const MOCK_CATEGORIES: Category[] = [
  { id: 'all', name: 'Todos' },
  { id: 'eletronicos', name: 'Eletrônicos' },
  { id: 'vestuario', name: 'Vestuário' },
  { id: 'casa', name: 'Casa & Decoração' },
  { id: 'esporte', name: 'Desporto' },
  { id: 'kids', name: 'Kids' },
];

// Gerando 80 produtos para o carrossel dinâmico
const generateProducts = (): Product[] => {
  const categories = ['eletronicos', 'vestuario', 'casa', 'esporte', 'kids'];
  const names = [
    'Smartwatch', 'Camiseta Premium', 'Luminária LED', 'Ténis de Corrida', 'Mochila Urbana',
    'Smartphone Pro', 'Calça Jeans Slim', 'Vaso Cerâmica', 'Bola de Elite', 'Kit Lego Tech',
    'Auscultadores Pro', 'Jaqueta Corta-vento', 'Quadro Abstrato', 'Tapete Comfort', 'Boneca Fashion',
    'Tablet Air', 'Bermuda Sport', 'Cadeira Gamer', 'Kit Pesos', 'Quebra-cabeça 3D',
    'Drone Explore', 'Óculos de Sol', 'Relógio Clássico', 'Coluna Bluetooth', 'Câmara 4K'
  ];

  return Array.from({ length: 80 }).map((_, i) => {
    const baseIndex = i % names.length;
    const catIndex = i % categories.length;
    const isDiscounted = i % 4 === 0;
    const price = Math.floor(Math.random() * 80000) + 3000;
    
    return {
      id: `${i + 1}`,
      name: `${names[baseIndex]} ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
      description: `Produto exclusivo PASMAB COMERCIAL. Qualidade garantida para o mercado de Angola. Design moderno e durabilidade excepcional.`,
      price: price,
      oldPrice: isDiscounted ? price * 1.4 : undefined,
      imageUrl: `https://picsum.photos/id/${(i + 15) % 100}/600/600`,
      stock: Math.floor(Math.random() * 50) + 5,
      categoryId: categories[catIndex],
      rating: parseFloat((Math.random() * (5 - 3.8) + 3.8).toFixed(1))
    };
  });
};

export const MOCK_PRODUCTS: Product[] = generateProducts();
