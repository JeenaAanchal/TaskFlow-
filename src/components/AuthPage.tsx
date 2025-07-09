import React, { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus, Sparkles } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        onLogin(formData.email, formData.password);
      } else {
        onRegister(formData.name, formData.email, formData.password);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="auth-logo animate-float">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            TaskFlow Pro
          </h1>
          <p className="text-gray-200 text-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Next-Generation Collaborative Workspace
          </p>
        </div>

        {/* Auth Form */}
        <div className="auth-card animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {isLogin ? 'Welcome Back' : 'Join the Future'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your workspace' : 'Create your collaborative account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="form-group animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="relative">
                  <User className="form-icon w-5 h-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
              </div>
            )}

            <div className="form-group animate-fade-in" style={{ animationDelay: isLogin ? '0.8s' : '1s' }}>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <Mail className="form-icon w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>

            <div className="form-group animate-fade-in" style={{ animationDelay: isLogin ? '1s' : '1.2s' }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <Lock className="form-icon w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="primary-button w-full flex flex-center space-x-3 animate-fade-in"
              style={{ animationDelay: isLogin ? '1.2s' : '1.4s' }}
            >
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              <span className="font-semibold">
                {isLogin ? 'Sign In to Workspace' : 'Create Account'}
              </span>
            </button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Demo Credentials
              </h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p className="font-medium">Email: alice@example.com</p>
                <p className="font-medium">Password: password</p>
              </div>
            </div>
          )}

          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover-text-blue-800 font-semibold text-sm transition-colors"
            >
              {isLogin ? "Don't have an account? Join now" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;