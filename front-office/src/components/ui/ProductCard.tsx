import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const productName = language === 'fr' ? product.name : product.nameEn;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-0 right-0 bg-secondary-500 text-white text-xs font-bold px-2 py-1">
              {t('products.featured')}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating?.toFixed(1)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">({product.reviews} {t('products.reviews')})</span>
            </div>
            <span className="text-primary-600 dark:text-primary-400 font-bold">
              {product.consumer_price} Ar
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{productName}</h3>
          
          <div className="mt-4 flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="mr-2 flex-grow"
            >
              {t('products.viewDetails')}
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              leftIcon={<ShoppingCart size={16} />}
              className="flex-shrink-0"
            >
              {t('products.addToCart')}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;