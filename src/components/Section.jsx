import React from 'react';

const Section = ({ id, title, children, className = '' }) => {
    return (
        <section
            id={id}
            className={`min-h-screen flex flex-col justify-center items-center ${className}`}
        >
            {title && <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">{title}</h2>}
            <div className="w-full">
                {children}
            </div>
        </section>
    );
};

export default Section;
