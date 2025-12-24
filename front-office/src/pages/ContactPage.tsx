import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import * as contactService from '../services/ContactService';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    subject: '',
    message: ''
  });

  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);

  const validatePhone = (value: string) => {
    const regex = /^(?:\+261(32|33|34|38)|0(32|33|34|38))\d{7}$/;
    setValid(regex.test(value));
    setPhone(value);
  };
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'tel') validatePhone(value);

  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    await contactService.createContact(formData.name, formData.email, phone, formData.subject, formData.message);

    setSubmitStatus('success');

    setFormData({
      name: '',
      email: '',
      tel: '',
      subject: '',
      message: ''
    });

    setSubmitStatus('idle');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
        </h1>
      </motion.div>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Contact Info */}
            <div className="md:w-1/3 bg-primary-600 dark:bg-primary-800 text-white p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'fr' ? 'Informations de contact' : 'Contact Information'}
                </h2>
                
                <p className="text-primary-100 mb-8">
                  {language === 'fr' 
                    ? 'Vous avez des questions ou des suggestions ? N\'hésitez pas à nous contacter !' 
                    : 'Do you have questions or suggestions? Don\'t hesitate to contact us!'}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-700 flex items-center justify-center mr-4 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </h3>
                      <p className="text-primary-100">+261 32 38 067 07</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-700 flex items-center justify-center mr-4 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {language === 'fr' ? 'Email' : 'Email'}
                      </h3>
                      <p className="text-primary-100">contact@agrohelp.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-700 flex items-center justify-center mr-4 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {language === 'fr' ? 'Adresse' : 'Address'}
                      </h3>
                      <p className="text-primary-100">
                        {language === 'fr' 
                          ? 'Tsiadana Antananarivo, ANTANANARIVO 101, Madagascar' 
                          : 'Tsiadana Antananarivo, ANTANANARIVO 101, Madagascar'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-semibold mb-4">
                    {language === 'fr' ? 'Horaires d\'ouverture' : 'Opening Hours'}
                  </h3>
                  <p className="text-primary-100 mb-2">
                    {language === 'fr' ? 'Du lundi au vendredi : 9h - 18h' : 'Monday to Friday: 9am - 6pm'}
                  </p>
                  <p className="text-primary-100">
                    {language === 'fr' ? 'Samedi : 10h - 16h' : 'Saturday: 10am - 4pm'}
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 p-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                </h2>
                
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6"
                  >
                    <p className="font-medium">
                      {language === 'fr' 
                        ? 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.' 
                        : 'Your message has been sent successfully! We will get back to you as soon as possible.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'fr' ? 'Nom complet' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {language === 'fr' ? 'Numéro Téléphone' : 'Phone Number'} *
                        </label>
                        <input
                          type="tel"
                          id="tel"
                          name="tel"
                          value={formData.tel}
                          placeholder="e.g. 0341234567 or +261341234567"
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {valid === false && <p style={{ color: 'red' }}> {language === 'fr' ? 'Numéro De Téléphone Invalide' : 'Invalid Malagasy Phone Number' }</p>}
                        {valid === true && <p style={{ color: 'green' }}> {language === 'fr' ? 'Numéro Valide' : 'Valid Phone Number'} </p>}  
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                                        
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'fr' ? 'Sujet' : 'Subject'} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">{language === 'fr' ? 'Sélectionnez un sujet' : 'Select a subject'}</option>
                        <option value="order">{language === 'fr' ? 'Question sur une commande' : 'Order inquiry'}</option>
                        <option value="product">{language === 'fr' ? 'Information sur un produit' : 'Product information'}</option>
                        <option value="feedback">{language === 'fr' ? 'Commentaires' : 'Feedback'}</option>
                        <option value="partnership">{language === 'fr' ? 'Partenariat' : 'Partnership'}</option>
                        <option value="other">{language === 'fr' ? 'Autre' : 'Other'}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'fr' ? 'Message' : 'Message'} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        leftIcon={<Send size={18} />}
                        isLoading={submitStatus === 'submitting'}
                      >
                        {language === 'fr' ? 'Envoyer le message' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="aspect-w-16 aspect-h-9 h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63710.478178311196!2d47.50246427700385!3d-18.879190490136097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f081fc3d396dc9%3A0x616b9a418e6014df!2sAntananarivo%2C%20Madagascar!5e0!3m2!1sen!2sfr!4v1621536034966!5m2!1sen!2sfr" 
                className="w-full h-full rounded-lg"
                loading="lazy"
                title="map"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;