import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { Product, ProductType } from '../types';
import * as productService from '../services/ProductService';
import * as categoryService from '../services/CategoryService';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [types, allProducts] = await Promise.all([
          categoryService.getProductTypes(),
          selectedCategory === 'tous'
            ? productService.getProducts()
            : productService.getProductsByCategory(selectedCategory)
        ]);
        setCategories(types);
        setProducts(allProducts);

        // Now apply search filtering
        let result = allProducts;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          result = allProducts.filter(product => {
            const name = language === 'fr' ? product.name : product.nameEn;
            const description = language === 'fr' ? product.description : product.descriptionEn;
            return name?.toLowerCase().includes(query) || description?.toLowerCase().includes(query);
          });
        }

        setFilteredProducts(result);
      } catch (error) {
        console.error('Error loading products or categories:', error);
        // Optionally show error to user (e.g. toast or alert)
      }
    };

    fetchData();
  }, [selectedCategory, searchQuery, language]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('products.title')}</h1>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {/* Filter button (mobile) */}
          <Button
            variant="outline"
            leftIcon={<Filter size={18} />}
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            {t('products.filter')}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters (desktop) */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{t('products.filter')}</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {language === 'fr' ? category.name : category.nameEn}
                </button>
              ))}
            </div>
          </div>
        </aside>
        
        {/* Filters (mobile) */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full mb-4 overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{t('products.filter')}</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {language === 'fr' ? category.name : category.nameEn}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Products grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map(product => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                {language === 'fr' 
                  ? 'Aucun produit ne correspond à votre recherche.' 
                  : 'No products match your search.'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('tous');
                }}
              >
                {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;