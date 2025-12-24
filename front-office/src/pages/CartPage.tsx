import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  const shipping = cartItems.length > 0 ? 5000 : 0;
  const tax = getCartTotal() * 0;
  const total = getCartTotal() + shipping;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('cart.title')}</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ShoppingBag size={36} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('cart.empty')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {language === 'fr' 
                ? 'Votre panier est vide. Ajoutez des produits pour continuer vos achats.' 
                : 'Your cart is empty. Add some products to continue shopping.'}
            </p>
            <Link to="/products">
              <Button variant="primary">
                {t('cart.continueShopping')}
              </Button>
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="md:flex md:space-x-6">
          {/* Cart items */}
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 md:mb-0">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const productName = language === 'fr' ? item.product.name : item.product.nameEn;
                    
                    return (
                      <motion.li 
                        key={item.product.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex py-6 px-4 sm:px-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                            <img
                              src={item.product.image}
                              alt={productName}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                <h3 className="line-clamp-2">
                                  <Link to={`/products/${item.product.id}`}>{productName}</Link>
                                </h3>
                                <p className="ml-4">{(item.product.consumer_price * item.quantity)} Ar</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.product.consumer_price} Ar / unité
                              </p>
                            </div>
                            
                            <div className="flex flex-1 items-end justify-between text-sm mt-4">
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="mx-2 w-8 text-center text-gray-700 dark:text-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.quantity}
                                  className="p-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="font-medium text-red-600 hover:text-red-500 flex items-center"
                              >
                                <Trash2 size={16} className="mr-1" />
                                {t('cart.remove')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          </div>

          {/* Order summary */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>{t('cart.subtotal')}</p>
                  <p>{getCartTotal()} Ar</p>
                </div>
                
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>{t('cart.shipping')}</p>
                  <p>{shipping} Ar</p>
                </div>
                
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>{t('cart.tax')}</p>
                  <p>{tax} Ar</p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <p>{t('cart.total')}</p>
                    <p>{total} Ar</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/checkout">
                  <Button 
                    variant="primary" 
                    rightIcon={<ArrowRight size={18} />} 
                    className="w-full"
                  >
                    {t('cart.checkout')}
                  </Button>
                </Link>
                
                <div className="mt-4">
                  <Link 
                    to="/products" 
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 flex items-center justify-center"
                  >
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;