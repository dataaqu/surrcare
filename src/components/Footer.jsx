import React from 'react';
import logo from '../assets/SurrCare.png';

const Footer = ({ activeSection, selectedLanguage = 'ENG' }) => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const translations = {
        ENG: {
            navItems: [
                { id: 'about', label: 'About' },
                { id: 'surrogacy', label: 'Surrogacy' },
                { id: 'egg-donation', label: 'Egg Donation' },
                { id: 'contact', label: 'Contact' }
            ],
            copyright: 'All rights reserved.'
        },
        GEO: {
            navItems: [
                { id: 'about', label: 'ჩვენს შესახებ' },
                { id: 'surrogacy', label: 'სუროგაცია' },
                { id: 'egg-donation', label: 'კვერცხუჯრედის დონაცია' },
                { id: 'contact', label: 'კონტაქტი' }
            ],
            copyright: 'ყველა უფლება დაცულია.'
        },
        RUS: {
            navItems: [
                { id: 'about', label: 'О нас' },
                { id: 'surrogacy', label: 'Суброгация' },
                { id: 'egg-donation', label: 'Донорство яйцеклеток' },
                { id: 'contact', label: 'Контакты' }
            ],
            copyright: 'Все права защищены.'
        }
    };

    const currentTranslation = translations[selectedLanguage] || translations.ENG;

    return (
        <footer className="bg-primary text-white py-8">
            <div className="w-[90%] mx-auto">
                {/* Top Section - Logo and Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="SurrCare" className="h-36 w-auto" />
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-6">
                        {currentTranslation.navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-white/80 hover:text-white transition-colors duration-300"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 mb-4"></div>

                {/* Bottom Section - Copyright */}
                <div className="text-center text-white/70 text-sm">
                    <p>© {currentYear} SurrCare. {currentTranslation.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
