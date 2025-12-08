import React, { useState } from 'react';
import logo from '../assets/logo.png';
import engFlag from '../assets/eng.png';
import geoFlag from '../assets/geo.png';
import rusFlag from '../assets/rus.png';

const Header = ({ activeSection, selectedLanguage, setSelectedLanguage }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const languages = [
        { code: 'ENG', label: 'English', flag: engFlag },
        { code: 'GEO', label: 'Georgian', flag: geoFlag },
        { code: 'RUS', label: 'Russian', flag: rusFlag },
    ];

    const translations = {
        ENG: {
            navItems: [
                { id: 'about', label: 'About us' },
                { id: 'surrogacy', label: 'Surrogacy' },
                { id: 'egg-donation', label: 'Egg Donation' },
                { id: 'contact', label: 'Contact' },
            ]
        },
        GEO: {
            navItems: [
                { id: 'about', label: 'ჩვენ შესახებ' },
                { id: 'surrogacy', label: 'სუროგაცია' },
                { id: 'egg-donation', label: 'კვერცხუჯრედის დონაცია' },
                { id: 'contact', label: 'კონტაქტი' },
            ]
        },
        RUS: {
            navItems: [
                { id: 'about', label: 'О нас' },
                { id: 'surrogacy', label: 'Суброгация' },
                { id: 'egg-donation', label: 'Донорство яйцеклеток' },
                { id: 'contact', label: 'Контакты' },
            ]
        }
    };

    const currentTranslation = translations[selectedLanguage] || translations.ENG;

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerHeight = 144; // Approximate header height
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLanguageChange = (langCode) => {
        setSelectedLanguage(langCode);
        setIsDropdownOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

    return (
        <header className="sticky top-0 z-50 bg-blue-50/95 backdrop-blur-md shadow-sm transition-all duration-300">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center">
                    <img src={logo} alt="SurrCare Logo" className="h-36 w-auto" />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    <ul className="flex space-x-8">
                        {currentTranslation.navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => handleClick(e, item.id)}
                                    className={`text-xl font-medium transition-colors duration-300 relative pb-1
                    ${activeSection === item.id ? 'text-accent' : 'text-primary hover:text-accent'}
                  `}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300
                    ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0'}
                  `}></span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Language Switcher - Desktop */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/50 hover:bg-white/80 transition-all duration-200 border border-primary/20"
                        >
                            <img src={currentLanguage.flag} alt={currentLanguage.code} className="w-5 h-5 object-cover rounded-sm" />
                            <span className="text-xs font-medium text-primary">{currentLanguage.code}</span>
                            <svg
                                className={`w-3 h-3 text-primary transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-primary/10 overflow-hidden z-50">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-blue-50 transition-colors duration-200 ${selectedLanguage === lang.code ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <img src={lang.flag} alt={lang.code} className="w-5 h-5 object-cover rounded-sm" />
                                        <span className="text-xs font-medium text-primary">{lang.code}</span>
                                        {selectedLanguage === lang.code && (
                                            <svg className="w-3 h-3 text-accent ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                        }`}></span>
                    <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                        }`}></span>
                    <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                        }`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed left-0 right-0 top-[144px] z-40 bg-blue-200 transform transition-all ${
                isMobileMenuOpen 
                    ? 'duration-700 ease-out translate-y-0 opacity-100 visible' 
                    : 'duration-500 ease-in-out -translate-y-full opacity-0 invisible'
            }`}>
                <nav className="container mx-auto px-6 py-8">
                    <ul className="space-y-6">
                        {currentTranslation.navItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`transform transition-all ${
                                    isMobileMenuOpen 
                                        ? 'duration-600 ease-out translate-y-0 opacity-100' 
                                        : 'duration-300 ease-in translate-y-6 opacity-0'
                                }`}
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${(index + 1) * 150}ms` : `${index * 50}ms`
                                }}
                            >
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => handleClick(e, item.id)}
                                    className={`text-2xl font-semibold transition-all duration-400 block py-3 px-4 rounded-lg ${
                                        activeSection === item.id 
                                            ? 'text-accent bg-white/20' 
                                            : 'text-primary hover:text-accent hover:bg-white/10'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Language Switcher - Mobile */}
                    <div className={`mt-8 pt-6 border-t border-primary/20 transform transition-all ${
                        isMobileMenuOpen 
                            ? 'duration-600 ease-out translate-y-0 opacity-100' 
                            : 'duration-300 ease-in translate-y-6 opacity-0'
                    }`}
                    style={{
                        transitionDelay: isMobileMenuOpen ? '600ms' : '200ms'
                    }}>
                        <div className="flex gap-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-400 ${
                                        selectedLanguage === lang.code
                                            ? 'bg-accent text-white shadow-md'
                                            : 'bg-white/20 text-primary hover:bg-white/30'
                                    }`}
                                >
                                    <img src={lang.flag} alt={lang.code} className="w-6 h-6 object-cover rounded" />
                                    <span className="text-sm font-medium">{lang.code}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
