import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ShippingDetails } from '../types';
import Button from '../components/ui/Button';
import * as orderService from '../services/OrderService';
import * as paymentService from '../services/PaymentService';

const CITY_LIST = [
  "Antananarivo","Toamasina","Antsirabe","Mahajanga","Fianarantsoa","Toliara","Antsiranana",
  "Ambovombe","Antanifotsy","Ambilobe","Amparafaravola","Tôlanaro","Ambatondrazaka","Mananara",
  "Soavinandriana","Mahanoro","Soanierana Ivongo","Faratsiho","Nosy Varika","Vavatenina",
  "Morondava","Amboasary","Manakara","Antalaha","Ikongo","Antsohimbondrona","Manjakandriana",
  "Sambava","Fandriana","Marovoay","Betioky","Ambanja","Ambositra","Tsiombe","Betafo","Moramanga",
  "Ambatolampy","Ambalavao","Sahavato","Mananjary","Mitsinjo","Morafenobe","Morombe","Sainte‑Marie",
  "Sakaraha","Soalala","Vangaindrano","Vatomandry","Vohemar","Vohibinany","Vohipeno","Vondrozo"];

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingDetails>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>();
  const [inputCityValue, setInputCityValue] = useState('');
  const [suggestionsCity, setSuggestionsCity] = useState<string[]>([]);

  const shipping = cartItems.length > 0 ? 5000 : 0;
  const tax = getCartTotal() * 0;
  const total = getCartTotal() + shipping;
  
  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) {
    return null; // Prevent render while redirecting
  }

  
  const onSubmitShipping = (data: ShippingDetails) => {
    // Move to payment step
    setShippingDetails(prev => ({
      ...prev,
      ...data
    }));

    if(step === 1)
      setStep(2);

  };
  
  
  const handlePayment = async (data: ShippingDetails) => {
    setIsSubmitting(true);

    const completeShipping: ShippingDetails = {
      ...shippingDetails!,
      phoneNumberPay: data.phoneNumberPay, // ✅ get phoneNumberPay from form
    };
    
    if(completeShipping !== undefined) {
      const ord = await orderService.createOrder( completeShipping, cartItems );
      if(ord.success && ord.data.order.id) {
        const orderId = ord.data.order.id; 
        const payed = await paymentService.initiatePayment({
          orderId: orderId,
          correlationId: orderId,
          customerNumber: completeShipping.phoneNumberPay,
          amount: total,
          descriptionText: "Order Payment"
        });
        // Success
       
        if(payed.data.response.status === 'pending') {
          setStep(3);
          setIsSubmitting(false);
          
          clearCart();
        }
      }
    }
  };

  const handleCityChange = (e: any) => {
    const val = e.target.value;
    setInputCityValue(val);

    const filteredCity = CITY_LIST.filter(city =>
      city.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestionsCity(filteredCity);
  };

  const handleCitySelect = (city: string) => {
    setInputCityValue(city);
    if(city !== '') {
      setSuggestionsCity([]);
    } else {
      setSuggestionsCity(['']);
    }
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
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('checkout.title')}</h1>
      
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
            <span className="text-sm font-medium">{t('checkout.shippingInfo')}</span>
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
            <span className="text-sm font-medium">{t('checkout.paymentInfo')}</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step > 2 ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
          
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step === 3 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600'
            }`}>
              3
            </div>
            <span className="text-sm font-medium">{t('checkout.confirmation')}</span>
          </div>
        </div>
      </div>
      
      <div className="md:flex md:space-x-6">
        {/* Main content */}
        <div className="md:w-2/3">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('checkout.shippingInfo')}</h2>
              
              <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.fullName')} *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('fullName', { required: true })}
                      className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{t('errors.required')}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                      className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.type === 'required' 
                          ? t('errors.required') 
                          : t('errors.invalidEmail')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout.phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register('phoneNumber', { required: true, pattern: /^(?:\+261(32|33|34|38)|0(32|33|34|38))\d{7}$/})}
                    className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber.type === 'required' && t('errors.required')}
                      {errors.phoneNumber.type === 'pattern' && language === 'fr' ? 'Numéro De Téléphone Invalide' : 'Invalid Malagasy Phone Number'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout.address')} *
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address', { required: true })}
                    className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{t('errors.required')}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className='relative'>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.city')} *
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register('city', { required: true })}
                      value={inputCityValue}
                      onChange={handleCityChange}
                      className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      }`}
                      placeholder="Start typing your city..."
                      autoComplete="off"
                    />

                    {suggestionsCity.length > 0 && (
                      <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md max-h-48 overflow-auto">
                        {suggestionsCity.map(city => (
                          <li
                            key={city}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleCitySelect(city)}
                          >
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}

                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {t('formErrors.required')}
                      </p>
                    )}
                    
                  </div>            
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.postalCode')} *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      {...register('postalCode', { required: true, pattern: /^[0-9]{3,5}$/ })}
                      className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text- white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.postalCode.type === 'required' && t('errors.required')}
                        {errors.postalCode.type === 'pattern' && (language === 'fr' 
                          ? 'Code postal invalide (3 à 5 chiffres requis)' 
                          : 'Invalid postal code (3 to 5 digits required)')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout.notes')}
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    {...register('notes')}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full md:w-auto" 
                    rightIcon={<ArrowRight size={18} />}
                  >
                    {/*{t('checkout.continue')*/}
                    {t('Continue')}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
          
          {/* Step 2: Payment Information Mvola */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('checkout.paymentInfo')}</h2>
              
              <div className="mb-6">
                <div className="flex items-center p-4 border border-primary-200 dark:border-primary-800 rounded-lg bg-primary-50 dark:bg-primary-900/30">
                  <CreditCard size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-800 dark:text-primary-200">
                      {language === 'fr' ? 'Paiement sécurisé' : 'Secure Payment'}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {language === 'fr' 
                        ? 'Vos informations de paiement sont chiffrées et sécurisées.' 
                        : 'Your payment information is encrypted and secure.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <form onSubmit={handleSubmit(onSubmitShipping)}>
                  <div>
                    <label htmlFor="phoneNumberPay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.phoneNumber')} {t('checkout.mvola')}
                    </label>
                    <input
                      type="text"
                      id="phoneNumberPay"
                      placeholder="034 35 000 03"
                      {...register('phoneNumberPay', { required: true, pattern: /^(?:\+261(32|33|34|38)|0(32|33|34|38))\d{7}$/ })}
                      className={`w-full p-2 border ${errors.phoneNumberPay ? 'border-red-500' : 'border-gray-300 dark:border-gray-700' } rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phoneNumber.type === 'required' && t('errors.required')}
                        {errors.phoneNumber.type === 'pattern' && language === 'fr' ? 'Numéro De Téléphone Invalide' : 'Invalid Malagasy Phone Number'}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                    >
                      {/*{t('checkout.back')}*/}
                      {t('Back')}
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      onClick={handleSubmit(handlePayment)} 
                      isLoading={isSubmitting}
                      rightIcon={!isSubmitting && <ArrowRight size={18} />}
                    >
                      {t('checkout.placeOrder')}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
          {/* Step 2: Payment Information */}
          {/*step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('checkout.paymentInfo')}</h2>
              
              <div className="mb-6">
                <div className="flex items-center p-4 border border-primary-200 dark:border-primary-800 rounded-lg bg-primary-50 dark:bg-primary-900/30">
                  <CreditCard size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-800 dark:text-primary-200">
                      {language === 'fr' ? 'Paiement sécurisé' : 'Secure Payment'}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {language === 'fr' 
                        ? 'Vos informations de paiement sont chiffrées et sécurisées.' 
                        : 'Your payment information is encrypted and secure.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout.cardNumber')}
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout.nameOnCard')}
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.expiryDate')}
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder="MM / YY"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout.cvv')}
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                  >
                    {/*{t('checkout.back')}*//*}
                    {t('Back')}
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    onClick={handlePayment} 
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting && <ArrowRight size={18} />}
                  >
                    {t('checkout.placeOrder')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )*/}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check size={36} className="text-green-600 dark:text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Merci pour votre commande !' : 'Thank you for your order!'}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {language === 'fr' 
                  ? 'Votre commande a été traitée avec succès. Vous recevrez bientôt un email de confirmation.' 
                  : 'Your order has been successfully processed. You will receive a confirmation email shortly.'}
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
        
        {/* Order summary */}
        <div className="md:w-1/3 mt-6 md:mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('checkout.orderSummary')}</h2>
            
            <div className="max-h-60 overflow-y-auto mb-4">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map((item) => {
                  const productName = language === 'fr' ? item.product.name : item.product.nameEn;
                  
                  return (
                    <li key={item.product.id} className="py-3 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <img
                          src={item.product.image}
                          alt={productName}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-3 flex flex-1 flex-col">
                        <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                          <h3 className="line-clamp-1">{productName}</h3>
                          <p className="ml-1">{(item.product.consumer_price * item.quantity)} Ar</p>
                        </div>
                        <div className="flex items-end justify-between text-xs">
                          <p className="text-gray-500 dark:text-gray-400">{t('cart.quantity')}: {item.quantity}</p>
                          <p className="text-gray-500 dark:text-gray-400">{item.product.consumer_price} Ar / unité</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <p>{t('cart.subtotal')}</p>
                <p>{getCartTotal()} Ar</p>
              </div>
              
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <p>{t('cart.shipping')}</p>
                <p>{shipping} Ar</p>
              </div>
              
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <p>{t('cart.tax')}</p>
                <p>{tax} Ar</p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                  <p>{t('cart.total')}</p>
                  <p>{total} Ar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;