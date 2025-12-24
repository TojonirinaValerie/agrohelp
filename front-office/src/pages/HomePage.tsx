import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, Leaf } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
//import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import * as productService from '../services/ProductService';
import { Product } from '../types';

const FadeInWhenVisible: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    productService.getFeaturedProducts().then(setProducts);
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-600 text-white py-20 overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-20"></div>
  <div className="container mx-auto px-4 relative z-10">

    {/* Flex container: Texte à gauche, image à droite */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-10">

      {/* Texte à gauche */}
      <div className="w-full md:w-1/2">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t('home.heroTitle')} 
        </motion.h1>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          {t('home.heroSubtitle')}
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.27 }}
          className="text-lg md:text-xl mb-4"
        >
          {t('home.heroText0')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Button 
            variant="secondary" 
            size="lg"
            leftIcon={<Leaf size={20} />}
            onClick={() => {
              document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('home.shopNow')}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-white border-white hover:bg-white/10"
            onClick={() => navigate('/about')}
          >
            {t('home.learnMore')}
          </Button>
        </motion.div>
      </div>

      {/* Image à droite */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full md:w-[35rem] flex justify-center md:justify-end me-0 sm:me-2 md:me-4 lg:me-10"
      >
        <img
          src="/img.jpg"
          alt="Hero Illustration"
          className="w-full max-w-[35rem] rounded-lg shadow-lg"
        />
      </motion.div>
    
    </div>
  </div>
</section>


      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('home.featuredProducts')}</h2>
              <Link 
                to="/products" 
                className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {t('home.viewAll')}
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <FadeInWhenVisible key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {language === 'fr' ? 'Pourquoi choisir AgroHelp ?' : 'Why choose AgroHelp?'}
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600 dark:text-primary-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'fr' ? 'Produits Frais' : 'Fresh Products'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Nous sélectionnons les meilleurs produits, fraîchement récoltés et livrés directement chez vous.' 
                    : 'We select the best products, freshly harvested and delivered directly to your door.'}
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600 dark:text-primary-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'fr' ? 'Livraison Rapide' : 'Fast Delivery'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Livraison en 24-48h pour garantir la fraîcheur de vos produits agricoles.' 
                    : '24-48h delivery to ensure the freshness of your agricultural products.'}
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600 dark:text-primary-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'fr' ? 'Qualité Garantie' : 'Quality Guaranteed'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Nous garantissons la qualité de nos produits ou nous vous remboursons intégralement.' 
                    : 'We guarantee the quality of our products or we will refund you in full.'}
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold mb-4">
              {language === 'fr' ? 'Prêt à découvrir nos produits ?' : 'Ready to discover our products?'}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Rejoignez des milliers de clients satisfaits et commencez à recevoir des produits frais chaque semaine.' 
                : 'Join thousands of satisfied customers and start receiving fresh products every week.'}
            </p>
            <Link to="/products">
              <Button variant="secondary" size="lg">
                {language === 'fr' ? 'Voir tous nos produits' : 'See all our products'}
              </Button>
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default HomePage;