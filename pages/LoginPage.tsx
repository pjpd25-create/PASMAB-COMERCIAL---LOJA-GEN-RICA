
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 text-[#f97316] rounded-3xl mb-4">
            <LogIn size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase">Bem-vindo</h2>
          <p className="text-gray-500 font-medium">Faça login para continuar suas compras</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="Teu E-mail"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#f97316] outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              required
              placeholder="Palavra-passe"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#f97316] outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f97316] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#ea580c] transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>ENTRAR</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 font-medium">Não tem uma conta?</p>
          <Link to="/signup" className="text-[#f97316] font-black hover:underline mt-2 inline-block">
            CRIAR CONTA AGORA
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center space-y-4">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Ou entrar com</p>
          <button className="flex items-center space-x-3 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-bold text-gray-600">Google Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
