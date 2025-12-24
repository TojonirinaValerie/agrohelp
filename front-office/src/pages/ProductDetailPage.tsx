import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import * as productService from '../services/ProductService';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) fetch the main product
        const fetched = await productService.getProduct(id!);
        setProduct(fetched);

        // 2) fetch related by category, filter out self, take first 3
        const siblings = await productService.getProductsByCategory(fetched.typeId);
        setRelatedProducts(
          siblings.filter(p => p.id !== id).slice(0, 3)
        );

        setQuantity(1);
        window.scrollTo(0, 0);
      } catch (e) {
        console.error(e);
        setError(t('productDetails.loadError'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, t]);

  const incrementQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(q => q + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  if (loading) {
    return <div className="text-center py-16">{t('productDetails.loading')}</div>;
  }
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t('productDetails.notFound')}
        </h1>
        <p className="mb-8">{error || t('productDetails.notFoundMessage')}</p>
        <Link to="/products">
          <Button variant="primary">{t('productDetails.back')}</Button>
        </Link>
      </div>
    );
  }

  const name = language === 'fr' ? product.name : product.nameEn;
  const desc = language === 'fr' ? product.description : product.descriptionEn;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back */}
      <div className="mb-8">
        <Link to="/products" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
          <ChevronLeft size={20} className="mr-1" />
          {t('products.backToProducts')}
        </Link>
      </div>

      {/* Product */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden md:flex">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="md:w-1/2 h-96 md:h-auto">
          <img src={product.image} alt={name} className="w-full h-full object-cover" />
        </motion.div>
        <div className="md:w-1/2 p-6 md:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Rating */}
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="text-gray-700 dark:text-gray-300">{product.rating?.toFixed(1)}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({product.reviews} {t('products.reviews')})
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{name}</h1>
            <p className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">{product.consumer_price} Ar</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{desc}</p>
            {/* Stock badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.quantity > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              product.quantity > 0  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {product.quantity > 10
                ? t('productDetails.inStock')
                : product.quantity > 0
                ? t('productDetails.lowStock')
                : t('productDetails.outOfStock')}
            </span>
            {/* Quantity selector */}
            <div className="mt-6 mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('productDetails.quantity')}
              </label>
              <div className="flex items-center">
                <button onClick={decrementQuantity} disabled={quantity <= 1}
                  className="p-2 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-md bg-gray-50 dark:bg-gray-800 disabled:opacity-50">
                  <Minus size={16} />
                </button>
                <input type="number" id="quantity" min="1" max={product.quantity}
                  value={quantity} onChange={e => setQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
                  className="w-16 border-y border-gray-300 dark:border-gray-700 dark:text-white text-center bg-white dark:bg-gray-900" />
                <button onClick={incrementQuantity} disabled={quantity >= product.quantity}
                  className="p-2 border border-gray-300 dark:border-gray-700 dark:text-white rounded-r-md bg-gray-50 dark:bg-gray-800 disabled:opacity-50">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <Button variant="primary" leftIcon={<ShoppingCart size={20} />} onClick={handleAddToCart} disabled={product.quantity === 0}>
              {t('productDetails.addToCart')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('productDetails.relatedProducts')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
