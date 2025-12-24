import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const footerLinks = [
    {
      title: 'Pages',
      links: [
        { name: t('navigation.home'), url: '/' },
        { name: t('navigation.products'), url: '/products' },
        { name: t('navigation.about'), url: '/about' },
        { name: t('navigation.contact'), url: '/contact' }
      ]
    },
    {
      title: t('footer.about'),
      links: [
        { name: t('footer.shipping'), url: '/shipping' },
        { name: t('footer.returns'), url: '/returns' },
        { name: t('footer.terms'), url: '/terms' },
        { name: t('footer.privacy'), url: '/privacy' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-6 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Agro</span>
              <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mr-1">Help</span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Consulting</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('site.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:contact@agrohelp.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.url} 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t('footer.newsletter')}</h3>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
                >
                  {t('footer.subscribe')}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;