import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import * as orderService from '../services/OrderService';
import { Check, ChevronLeft, ListOrdered } from 'lucide-react';

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const handleDownload = async () => {
    const res = await orderService.getInvoice(id!); 
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setStep(2);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link 
          to="/cart" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          <ChevronLeft size={20} className="mr-1" />
          {t('checkout.backToCart')}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('order.title')}</h1>
      
      {/* Checkout steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step > 1 
                ? 'bg-primary-600 text-white' 
                : step === 1 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600'
            }`}>
              {step > 1 ? <Check size={20} /> : 1}
            </div>
            <span className="text-sm font-medium">{t('order.getOrderInfo')}</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step > 1 ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
          
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step > 2 
                ? 'bg-primary-600 text-white' 
                : step === 2 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600'
            }`}>
              {step > 2 ? <Check size={20} /> : 2}
            </div>
            <span className="text-sm font-medium">{t('order.orderInfo')}</span>
          </div> 
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {/* Main content */}
        <div className="md:w-3/3">
          {/* Step 1: Shipping Information */}
          
          {/* Step 2: Payment Information Mvola */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <ListOrdered size={36} className="text-green-600 dark:text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {language === 'fr' ? 'Ma Facture' : 'My Invoice'}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {language === 'fr' 
                  ? 'Vous pouvez consulter ou télécharger votre facture au format PDF en cliquant sur le bouton ci-dessous:' 
                  : 'You can view or download your invoice in PDF format by clicking the button below:'}
              </p>
              
              <div className="flex justify-center">
                <Link to="/">
                  <Button variant="primary" onClick={() => handleDownload()}>
                    {language === 'fr' ? 'Télécharger Ma Facture' : 'Download Your Invoice'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Confirmation */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check size={36} className="text-green-600 dark:text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Merci pour votre commande !' : 'Thank you for your order!'}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {language === 'fr' 
                  ? 'Veuillez trouver ci-dessous les détails de votre facture.' 
                  : 'Please find your invoice details below.'}
              </p>
              
              <div className="flex justify-center">
                <Link to="/">
                  <Button variant="primary">
                    {language === 'fr' ? 'Retour à l\'accueil' : 'Return to home'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
        
        
      </div>
    </div>
  );
};

export default OrderPage;