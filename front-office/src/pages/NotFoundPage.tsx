import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary-500 dark:text-primary-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {language === 'fr' ? 'Page non trouvée' : 'Page Not Found'}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          {language === 'fr' 
            ? 'La page que vous recherchez n\'existe pas ou a été déplacée.' 
            : 'The page you are looking for doesn\'t exist or has been moved.'}
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            {language === 'fr' ? 'Retour à l\'accueil' : 'Return to Home'}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;