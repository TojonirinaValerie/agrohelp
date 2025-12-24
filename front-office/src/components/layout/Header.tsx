import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const cartItemsCount = getCartItemsCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const navItems = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.products'), path: '/products' },
    { name: t('navigation.about'), path: '/about' },
    { name: t('navigation.contact'), path: '/contact' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <img src="/logo.png" width={100} alt="logo" />
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Agro</span>
            <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">Help</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${
                  location.pathname === item.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Search button */}
            <button 
              onClick={toggleSearch} 
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Search size={20} />
            </button>

            {/* Language toggle */}
            <button 
              onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Globe size={20} />
              <span className="sr-only">{t('navigation.language')}</span>
            </button>

            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span className="sr-only">
                {theme === 'dark' ? t('navigation.lightMode') : t('navigation.darkMode')}
              </span>
            </button>

            {/* Cart link with count */}
            <Link 
              to="/cart" 
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('products.searchPlaceholder')}
                    className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-base font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${
                      location.pathname === item.path
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/account"
                  className="text-base font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.account')}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;