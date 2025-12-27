
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';

interface SignupPageProps {
  onSignup: (email: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onSignup(email);
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 text-[#f97316] rounded-3xl mb-4">
            <UserPlus size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase">Criar Conta</h2>
          <p className="text-gray-500 font-medium">Junte-se à melhor experiência de Angola</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              required
              placeholder="Nome Completo"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#f97316] outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="E-mail Válido"
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
              placeholder="Escolha uma Palavra-passe"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#f97316] outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500 px-2">
            <CheckCircle size={14} className="text-green-500" />
            <span>Concordo com os Termos e Condições da Loja Online.</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f97316] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#ea580c] transition-all shadow-lg active:scale-95 uppercase tracking-tighter"
          >
            Registar Agora
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 font-medium">Já tem uma conta?</p>
          <Link to="/login" className="text-[#f97316] font-black hover:underline mt-2 inline-block">
            FAZER LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
