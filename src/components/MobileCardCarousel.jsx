import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import InfoCard from "./animata/card/InfoCard";
import ExpandingCard from "./animata/card/ExpandingCard";

export default function MobileCardCarousel({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const cardObserverRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Observer for individual cards in mobile view
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.dataset.cardIndex);
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardIndex]));
          }
        });
      },
      {
        threshold: 0.5,
        root: scrollRef.current
      }
    );

    // Observe each card
    if (cardObserverRefs.current.length > 0) {
      cardObserverRefs.current.forEach((ref) => {
        if (ref) cardObserver.observe(ref);
      });
    }

    return () => cardObserver.disconnect();
  }, [cards]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);


  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef}>
      {/* Desktop View - Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <ExpandingCard
            key={index}
            title={card.title}
            content={card.content}
            isVisible={isVisible}
            delay={card.delay}
          />
        ))}
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={el => cardObserverRefs.current[index] = el}
              data-card-index={index}
              className="flex-none w-full snap-center min-h-[600px]"
            >
              <ExpandingCard
                title={card.title}
                content={card.content}
                isVisible={visibleCards.has(index)}
                delay={0}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex justify-center gap-2 mt-4"
        >
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-accent/90 scale-110'
                  : 'bg-primary/90 hover:bg-primary'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}