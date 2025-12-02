import React, { useState, useEffect } from 'react';

const Carousel = ({ images, titles = [], interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;
        
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative w-full h-full overflow-hidden  shadow-lg">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    {titles[index] && (
                        <div 
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                                index === currentIndex 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-4'
                            }`}
                        >
                            <h2 className="text-2xl md:text-5xl font-bold drop-shadow-lg text-white px-4 py-2 md:px-8 md:py-4 rounded-lg text-center" style={{backgroundColor: 'rgba(234, 178, 187, 0.8)'}}>
                                {titles[index]}
                            </h2>
                        </div>
                    )}
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-4 h-4 rounded-full transition-all ${index === currentIndex
                                ? 'bg-accent/90 scale-110'
                                : 'bg-primary/90 hover:bg-primary'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
