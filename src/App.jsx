import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Section from './components/Section';
import Carousel from './components/Carousel';
import InfoCard from './components/animata/card/InfoCard';
import MobileCardCarousel from './components/MobileCardCarousel';
import image1 from './assets/1.webp';
import image2 from './assets/2.webp';
import image3 from './assets/3.webp';
import image4 from './assets/4.webp';
import surrImage from './assets/surr.webp';
import eggImage from './assets/egg.webp';

function App() {
  const [activeSection, setActiveSection] = useState('');

  const carouselImages = React.useMemo(() => [image1, image2, image3, image4], []);
  const carouselTitles = React.useMemo(() => [
    "Premium Pay Package",
    "Full Privacy Protection", 
    "Caring and Supportive Culture",
    "Excellent Facilities and Attention"
  ], []);

  const cardData = React.useMemo(() => [
    {
      title: "Benefits for You",
      content: (
        <div>
          <p className="text-lg leading-relaxed mb-4">
            Safety and comfort are our top priorities. After consultation and diagnostics, candidates are added to our database and become immediately available to future parents.
          </p>
          <p className="text-lg leading-relaxed">
            We offer above-market compensation and the best conditions for women helping infertile couples.
          </p>
        </div>
      ),
      delay: 0.2
    },
    {
      title: "Our Approach",
      content: (
        <div>
          <p className="text-lg leading-relaxed mb-4">
            All contracts are legally certified and registered at the House of Justice with lawyer participation.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Our core values are a family environment, comfortable conditions, and care for each party. The well-being of donors and surrogate mothers determines our success.
          </p>
          <p className="text-lg leading-relaxed">
            Through our services, childless couples become happy parents, while donors and surrogate mothers significantly improve their financial situation.
          </p>
        </div>
      ),
      delay: 0.4
    },
    {
      title: "Our Partners",
      content: (
        <div>
          <p className="text-lg leading-relaxed mb-4">
            SurrCare collaborates with Georgia's best reproductive clinics: Zhordania, Inova, Karaps Medline, and Reproart. These facilities have qualified specialists and modern equipment ensuring high-quality IVF procedures.
          </p>
          <p className="text-lg leading-relaxed">
            We also work with international reproductive clinics, providing higher remuneration through global programs.
          </p>
        </div>
      ),
      delay: 0.6
    }
  ], []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg-light">
      <Header activeSection={activeSection} />

      <main>
        <Section id="about" className="bg-white !p-0 !pt-0 !justify-start">
          {/* First div - Carousel (Full Width) */}
          <div className="w-screen h-[50vh] md:h-[80vh] mx-auto">
            <Carousel images={carouselImages} titles={carouselTitles} interval={5000} />
          </div>

          {/* Second div - Content */}
          <div className="w-[90%] mx-auto px-8 py-12">
            <div className="w-full mx-auto space-y-8">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-black"
              >
                SurrCare is one of the leading centers in Georgia. The center has been providing services in the field of surrogacy for more than 15 years. A parallel line of business is egg donation. Productive long-term relationships with future parents and surrogate mothers are based on professionalism, trust, an individual approach and legal coordination of all aspects of cooperation.
              </motion.p>
              
              <MobileCardCarousel cards={cardData} />
            </div>
          </div>
        </Section>

        <Section id="surrogacy" className="bg-gray-50 py-20 !justify-start">
          <div className="w-[90%] mx-auto space-y-8">
            {/* Section Title */}
            <h2 className="text-3xl font-bold text-primary text-center mb-4">
              What does SurrCare offer to those interested in surrogacy?
            </h2>
            
            {/* First Row - Text Content */}
            <div className="w-full">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700"
              >
                SurrCare's experienced team in Georgia's surrogacy field provides surrogate mother candidates with exceptional financial rewards and efficient matching with intended parents seeking assistance.
              </motion.p>
            </div>

            {/* Second Row - Two Divs */}
            <div className="w-full bg-white p-6 rounded-lg shadow-md grid md:grid-cols-2 gap-6">
              {/* First Div - Services List */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold  text-primary mb-4">OUR SERVICE INCLUDE</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>Legal execution of the cooperation agreement.</span>
                  </li>
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>Performing the necessary diagnostic procedures.</span>
                  </li>
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>Reimbursement of travel expenses.</span>
                  </li>
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>Provision of accommodation (if necessary).</span>
                  </li>
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>Services of a personal assistant who will accompany and support the surrogate mother throughout the pregnancy, schedule the necessary diagnostic examinations, visits to the doctor.</span>
                  </li>
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>He will also make sure that the surrogate mother or egg donor receives the full compensation provided for in the contract.</span>
                  </li>
                  <li className="flex items-start text-xl self-center">
                    <span className="text-accent mr-2">•</span>
                    <span>Childbirth in the Hera Clinic under the patronage of Dr. Teona Baghaturia.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Second Div - Image */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center rounded-lg justify-center"
              >
                <img 
                  src={surrImage} 
                  alt="Surrogacy services" 
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </motion.div>
            </div>

            {/* Third Row - Conditions */}
            <div className="w-full bg-white text-center p-6 py-16 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-12">Necessary conditions for participation in the surrogacy program</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Age Condition */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#eab2bb' }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-primary">Age from 20 to 39 years.</p>
                </motion.div>

                {/* Health Condition */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#eab2bb' }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-primary">Optimal physical and mental health.</p>
                </motion.div>

                {/* Birth History Condition */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#eab2bb' }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-primary">History of childbirth</p>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="egg-donation" title="Egg Donation" className="bg-white [&>h2]:mt-6 [&>h2]:md:mt-0">
          <div className="w-[90%] mx-auto grid md:grid-cols-2 gap-8 mt-2 py-8 md:py-0">
            {/* First Div - Text Content */}
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-6"
              >
                Surrcare connects potential egg donors quickly with intended parents, including international clients.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-6"
              >
                By joining this program, you'll help couples struggling with infertility achieve parenthood while receiving substantial financial compensation. We prioritize each donor's well-being and ensure premium payment for quality eggs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-6"
              >
                <h3 className="text-xl font-bold text-primary mb-4">Program participants receive:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Legally certified contracts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Complimentary diagnostic testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Dedicated personal coordinator for ongoing support</span>
                  </li>
                </ul>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-6"
              >
                Previous parenthood is not required to become an egg donor.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-4"
              >
                Surrcare offers the industry's highest compensation rates and creates an environment where every donor feels secure and valued.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg font-semibold text-primary"
              >
                Complete confidentiality assured.
              </motion.p>
            </div>

            {/* Second Div - Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center justify-center"
            >
              <img 
                src={eggImage} 
                alt="Egg donation services" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </Section>

        <Section id="contact" title="Contact" className="bg-primary text-white">
          <p className="text-gray-300">Get in touch with us to start your journey.</p>
        </Section>
      </main>
    </div>
  );
}

export default App;
