import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {language === 'fr' ? 'À propos d\'AgroHelp' : 'About AgroHelp'}
        </h1>
      </motion.div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-center">
              <img 
                src="/logo.png" 
                alt="Agriculture field"
                className="w-full max-w-[20rem] object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-lg text-gray-700 text-justify dark:text-gray-300 mb-6">
                {t('home.heroText1')}
              </p>
              <p className="text-lg text-gray-700 text-justify dark:text-gray-300 mb-6">
                {t('home.heroText2')}
              </p>
              <p className="text-lg text-gray-700 text-justify dark:text-gray-300 mb-6">
                {language === 'fr' 
                  ? 'AGROHELP CONSULTING est au service du monde rural fondé en 2019, des paysans et des coopératives agricoles existants et futurs, pour renforcer leur capacité entreprenarial et commercial.' 
                  : 'AgroHelp was born from a passion for sustainable agriculture and a desire to directly connect local producers with consumers. Our mission is to promote healthy eating and support farmers who grow with respect for the environment.'}
              </p>
              <p className="text-lg text-gray-700 text-justify dark:text-gray-300 mb-6">
                {language === 'fr' 
                  ? 'Permettre un développement socio-économique durable à travers l\'entreprenariat paysanne pour sortir de la pauvreté et de l\'assistanat perpetuel.' 
                  : 'Founded in 2022, our company is committed to offering the highest quality agricultural products, freshly harvested and delivered directly to your door.'}
              </p>
              <p className='text-lg text-gray-700 text-justify dark:text-gray-300'>
                  {language === 'fr'
                    ? 'Nous avons une équipe multidisciplinaire, qui peut intervenir sur tout Madagascar. En partenariat avec des institutions et des organismes nationaux pour garantir une maturité de travail et de compétence.'
                    : 'We have a multidisciplinary team that can operate throughout Madagascar, in partnership with national institutions and organizations to ensure a high level of professionalism and expertise.'
                  }
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'fr' ? 'Nos Offres Et Services' : 'Supply And Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600 dark:text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Nos services' : 'Our services'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-left">
                <li>
                  {language === 'fr'
                    ? 'Des formations spéciales en agriculture et élevage.'
                    : 'Special training in agriculture and livestock.'}
                </li>

                <li>
                  {language === 'fr'
                    ? 'Des accompagnements spécifiques en entrepreneuriat agricole.'
                    : 'Targeted support in agricultural entrepreneurship.'}
                </li>

                <li>
                  {language === 'fr'
                    ? 'Des analyses et études de terrain, montage de projet.'
                    : 'Field analysis, studies, and project development.'}
                </li>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600 dark:text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Produits' : 'Product'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-left">
                <li>
                  {language === 'fr' 
                    ? 'Des intrants agricoles naturels: en alternative des produits chimiques: '
                      + 'B-NIMO (biopesticides), '
                      + 'Engrais organique, '
                      + 'Semences cumas'
                    : 'Natural agricultural inputs as alternatives to chemical products: '
                      + 'B-NIMO (biopesticides), '
                      + 'Organic fertilizers, '
                      + 'CUMAS seeds'}
                </li>
                
                <li>
                  {language === 'fr' 
                    ? 'Des manuels de formations et techniques.' 
                    : 'Training and technical manuals.'}
                </li>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600 dark:text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Formation' : 'Professional Training'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-left">
                <li>
                  {language === 'fr' 
                    ? 'Formation et accompagnement des paysans.' 
                    : 'Training and support for farmers.'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Renforcement des compétences techniques et entrepreneuriales des paysans.'  
                    : 'Strengthening farmers\' technical and entrepreneurial skills.'}
                </li>
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img 
                src="/img/1742971571508.jpg" 
                alt="Team member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'fr' ? 'Holy Harinoro Raoelinarivo ' : 'Holy Harinoro Raoelinarivo '}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">
                  {language === 'fr' ? 'Fondatrice & CEO' : 'Founder & CEO'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Passionnée d\'agriculture biologique avec plus de '+(new Date().getFullYear() - 2019)+' ans d\'expérience dans le secteur agricole.' 
                    : 'Passionate about organic farming with over '+(new Date().getFullYear() - 2019)+' years of experience in the agricultural sector.'}
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img 
                src="/img/6493898453421610709.jpg" 
                alt="Team member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'fr' ? 'Joëlison Razanajatovomanana ' : 'Joëlison Razanajatovomanana '}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">
                  {language === 'fr' ? 'Directeur des Opérations' : 'Operations Director'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Expert en logistique et supply chain qui veille à ce que vos produits arrivent frais et à temps.' 
                    : 'Logistics and supply chain expert who ensures your products arrive fresh and on time.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;