import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Section from './components/Section';
import Carousel from './components/Carousel';
import InfoCard from './components/animata/card/InfoCard';
import MobileCardCarousel from './components/MobileCardCarousel';
import FAQItem from './components/FAQItem';
import Footer from './components/Footer';
import image1 from './assets/1.webp';
import image2 from './assets/2.webp';
import image3 from './assets/3.webp';
import image4 from './assets/4.webp';
import surrImage from './assets/surr.webp';
import eggImage from './assets/egg.webp';

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');
  
  // Contact Form State
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    comment: '',
    honeypot: '' // bot trap
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ type: '', message: '' });

  const carouselImages = React.useMemo(() => [image1, image2, image3, image4], []);

  const carouselTranslations = React.useMemo(() => ({
    ENG: [
      "High Pay",
      "Full confidentiality",
      "Caring and friendly environment",
      "Best conditions and constant attention"
    ],
    GEO: [
      "მაღალი ანაზღაურება",
      "სრული კონფიდენციალურობა",
      "მზრუნველი და მეგობრული გარემო",
      "საუკეთესო პირობები და მუდმივი ყურადღება"
    ],
    RUS: [
      "Высокая зарплата",
      "Полная конфиденциальность",
      "Заботливая и дружелюбная атмосфера",
      "Лучшие условия и постоянное внимание"
    ]
  }), []);

  const translations = React.useMemo(() => ({
    ENG: {
      mainDescription: "SurrCare is a leading surrogacy center in Georgia. For over 15 years, the center has been providing services in surrogacy and egg donation. The foundation of our success is professionalism, trust, an individual approach, and full legal support at every stage of cooperation. We build long-term and strong relationships with both intended parents and surrogate mothers.",
      surrogacyDescription: "The experienced SurrCare team provides surrogate mothers with competitive compensation and helps them quickly find families who are seeking assistance to have a child.",
      servicesTitle: "OUR SERVICE INCLUDE",
      services: [
        "Legal execution of the cooperation agreement.",
        "Performing the necessary diagnostic procedures.",
        "Reimbursement of travel expenses.",
        "Provision of accommodation (if necessary).",
        "Services of a personal assistant who will accompany and support the surrogate mother throughout the pregnancy, schedule the necessary diagnostic examinations, visits to the doctor.",
        "He will also make sure that the surrogate mother or egg donor receives the full compensation provided for in the contract.",
        "Childbirth in the Hera Clinic under the patronage of Dr. Teona Baghaturia."
      ],
      conditionsTitle: "Necessary conditions for participation in the surrogacy program",
      conditions: [
        "Age from 20 to 39 years.",
        "Optimal physical and mental health.",
        "History of childbirth"
      ],
      eggDonationTitle: "Egg Donation",
      eggDonationParagraphs: [
        "By joining this program, you'll help couples struggling with infertility achieve parenthood while receiving substantial financial compensation. We prioritize each donor's well-being and ensure premium payment for quality eggs.",
        "Previous parenthood is not required to become an egg donor.",
        "Surrcare offers the industry's highest compensation rates and creates an environment where every donor feels secure and valued.",
        "Complete confidentiality assured."
      ],
      eggDonationBenefitsTitle: "Program participants receive:",
      eggDonationBenefits: [
        "Complimentary diagnostic testing",
        "Dedicated personal coordinator for ongoing support"
      ],
      contactTitle: "Contact us",
      contactSubtitle: "Get In Touch",
      faqTitle: "Frequently Asked Questions",
      faq: [
        {
          question: "Who can become a surrogate mother?",
          answer: "Women aged 20-38 with optimal physical and mental health who have a history of childbirth can become surrogate mothers."
        },
        {
          question: "How long does the surrogacy process take?",
          answer: "The entire process typically takes 12-15 months, including medical examinations, matching with intended parents, pregnancy, and delivery."
        },
        {
          question: "Who can become an egg donor?",
          answer: "A healthy woman aged 18-28 who has no serious chronic or genetic diseases and passes the necessary medical examinations can become an egg donor."
        },
        {
          question: "How long does the egg donation process take?",
          answer: "The complete egg donation process typically takes 2-4 weeks, including preliminary examinations, hormonal preparation, and the procedure itself."
        },
        {
          question: "What compensation can I expect?",
          answer: "We offer above-market compensation packages. The exact amount depends on various factors and will be discussed during your consultation. All compensation is legally certified in the contract."
        },
        {
          question: "Is the process confidential?",
          answer: "Yes, complete confidentiality is assured. We prioritize your privacy and all personal information is protected according to legal standards."
        },
        {
          question: "What medical examinations are required?",
          answer: "We perform comprehensive diagnostic procedures including physical examinations, blood tests, ultrasounds, and psychological evaluations. All examinations are provided free of charge."
        }
      ],
      form: {
        firstName: "First Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        selectSubject: "Select Subject",
        subjectOptions: {
          surrogacy: "Surrogacy",
          eggDonation: "Egg Donation",
          general: "General"
        },
        comment: "Comment",
        submit: "Send Message"
      },
      formValidation: {
        fillAllFields: "Please fill in all required fields",
        emailSent: "Message sent successfully!",
        emailError: "Failed to send message. Please try again later.",
        sending: "Sending..."
      }
    },
    GEO: {
      mainDescription: "SurrCare საქართველოს წამყვანი ცენტრია სუროგაციის სფეროში. ცენტრი 15 წელზე მეტი ხნის განმავლობაში უზრუნველყოფს მომსახურებას სუროგაციისა და კვერცხუჯრედის დონაციის მიმართულებით. ჩვენი წარმატების საფუძველია პროფესიონალიზმი, ნდობა, ინდივიდუალური მიდგომა და თანამშრომლობის ყველა ასპექტის სრული იურიდიული თანხლება. ჩვენ ვქმნით გრძელვადიან და მყარ ურთიერთობებს როგორც მომავალ მშობლებთან, ასევე სუროგატ დედებთან.",
      surrogacyTitle: "რას სთავაზობს SurrCare სუროგაციით დაინტერესებულებს?",
      surrogacyDescription: "SurrCare-ის გამოცდილი გუნდი უზრუნველყოფს სუროგატ დედებს კონკურენტულ ანაზღაურებას და ეხმარება მათ სწრაფად იპოვონ ის ოჯახები, რომლებიც ეძებენ დახმარებას შვილის გაჩენაში.",
      servicesTitle: "ჩვენი მომსახურება მოიცავს",
      services: [
        "თანამშრომლობის ხელშეკრულების იურიდიული მხარდაჭერა",
        "ყველა საჭირო სამედიცინო გამოკვლევის უზრუნველყოფა",
        "სამგზავრო ხარჯების ანაზღაურება",
        "საცხოვრებელი ფართის უზრუნველყოფა (საჭიროების შემთხვევაში)",
        "პერსონალური თანხმებლი, რომელიც ორსულობის მთელი პერიოდის განმავლობაში თან ახლავს და უჭერს მხარს სუროგატ დედას - აწყობს ექიმთან ვიზიტებს და დიაგნოსტიკურ გამოკვლევებს",
        "პერსონალური თანმხლები ასევე უზრუნველყოფს, რომ სუროგატმა დედამ ან დონორმა ხელშეკრულებით გათვალისწინებული სრული ანაზღაურება მიიღოს",
        "მშობიარობა Hera კლინიკაში დოქტორ თეონა ბაღათურიას პატრონაჟით"
      ],
      conditionsTitle: "სუროგაციის პროგრამაში მონაწილეობისთვის საჭირო პირობები",
      conditions: [
        "ასაკი 20-დან 38 წლამდე.",
        "ოპტიმალური ფიზიკური და მენტალური ჯანმრთელობა.",
        "მშობიარობის ისტორია"
      ],
      eggDonationTitle: "კვერცხუჯრედის დონაცია",
      eggDonationParagraphs: [
        "ამ პროგრამაში მონაწილეობით თქვენ დაეხმარებით იმ წყვილებს, რომლებსაც უშვილობის პრობლემა აქვთ და ამავდროულად მიიღებთ მნიშვნელოვან ფინანსურ ანაზღაურებას. ჩვენთვის პრიორიტეტია თითოეული დონორის კეთილდღეობა და ვუზრუნველყოფთ პრემიუმ ანაზღაურებას ხარისხიანი კვერცხუჯრედებისთვის.",
        "კვერცხუჯრედის დონორად გახდომისთვის არ არის საჭირო, რომ თქვენ უკვე გყავდეთ შვილი.",
        "Surrcare გთავაზობთ ინდუსტრიაში ყველაზე მაღალ ანაზღაურებას და ქმნის გარემოს, სადაც ყოველი დონორი გრძნობს თავს უსაფრთხოდ და ღირსეულად.",
        "სრული კონფიდენციალურობის გარანტია"
      ],
      eggDonationBenefitsTitle: "პროგრამის მონაწილეები მიიღებენ:",
      eggDonationBenefits: [
        "უფასო დიაგნოსტიკური გამოკვლევა",
        "პირადი კოორდინატორი მუდმივი მხარდაჭერისთვის"
      ],
      contactTitle: "დაგვიკავშირდით",
      contactSubtitle: "საკონტაქტო ინფორმაცია",
      faqTitle: "ხშირად დასმული კითხვები",
      faq: [
        {
          question: "ვინ შეიძლება გახდეს სუროგატი დედა?",
          answer: "ქალები 20-38 წლის ასაკის, ოპტიმალური ფიზიკური და მენტალური ჯანმრთელობით, რომლებსაც აქვთ მშობიარობის ისტორია."
        },
        {
          question: "რამდენ ხანს გრძელდება სუროგაციის პროცესი?",
          answer: "მთელი პროცესი, როგორც წესი, გრძელდება 10-12 თვე, მათ შორის სამედიცინო გამოკვლევები."
        },
        {
          question: "ვინ შეიძლება გახდეს კვერცხუჯრედის დონორი?",
          answer: "კვერცხუჯრედის დონორი შეიძლება გახდეს ჯანმრთელი ქალი, 18–28 წლის, რომელსაც არ აქვს სერიოზული ქრონიკული ან გენეტიკური დაავადებები და გადის საჭირო სამედიცინო შემოწმებებს."
        },
        {
          question: "რამდენ ხანს გრძელდება კვერცხუჯრედის დონაციის პროცესი?",
          answer: "კვერცხუჯრედის დონაციის სრული პროცესი საშუალოდ გრძელდება 2–4 კვირა, რაც მოიცავს წინასწარ გამოკვლევებს, ჰორმონალურ მომზადებას და თავად პროცედურას."
        },
        {
          question: "რა ოდენობის ანაზღაურებას მივიღებ?",
          answer: "ჩვენ გთავაზობთ ბაზარზე არსებულზე მაღალ ანაზღაურებას. კონკრეტული თანხა დამოკიდებულია სხვადასხვა ფაქტორზე და დეტალურად განვიხილავთ კონსულტაციის დროს. მთელი ანაზღაურება იურიდიულად დაცულია ხელშეკრულებით.",
        },
        {
          question: "პროცესი კონფიდენციალურია?",
          answer: "დიახ, სრული კონფიდენციალურობის გარანტია გაქვთ. თქვენი პირადი ცხოვრება ჩვენთვის პრიორიტეტია და ყველა პირადი ინფორმაცია დაცულია კანონის შესაბამისად."
        },
        {
          question: "რა სამედიცინო გამოკვლევებია საჭირო?",
          answer: "ჩვენ ვატარებთ ყოვლისმომცველ დიაგნოსტიკურ პროცედურებს, მათ შორის ფიზიკურ გამოკვლევებს, სისხლის ანალიზებს, ულტრაბგერით გამოკვლევას და ფსიქოლოგიურ შეფასებას. ყველა გამოკვლევა უფასოა."
        }
      ],
      form: {
        firstName: "სახელი",
        email: "ელ.ფოსტა",
        phone: "ტელეფონი",
        subject: "თემა",
        selectSubject: "აირჩიეთ თემა",
        subjectOptions: {
          surrogacy: "სუროგაცია",
          eggDonation: "კვერცხუჯრედის დონაცია",
          general: "ზოგადი"
        },
        comment: "კომენტარი",
        submit: "გაგზავნა"
      },
      formValidation: {
        fillAllFields: "გთხოვთ შეავსოთ ყველა სავალდებულო ველი",
        emailSent: "შეტყობინება წარმატებით გაიგზავნა!",
        emailError: "შეტყობინების გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.",
        sending: "იგზავნება..."
      }
    },
    RUS: {
      mainDescription: "SurrCare — ведущий центр в области суррогатного материнства в Грузии. Более 15 лет центр предоставляет услуги по суррогатному материнству и донорству яйцеклеток. Основой нашего успеха являются профессионализм, доверие, индивидуальный подход и полное юридическое сопровождение на всех этапах сотрудничества. Мы выстраиваем долгосрочные и надежные отношения как с будущими родителями, так и с суррогатными матерями.",
      surrogacyDescription: "Опытная команда SurrCare в области суррогатного материнства в Грузии предоставляет кандидатам в суррогатные матери исключительное финансовое вознаграждение и эффективный подбор пар с будущими родителями, нуждающимися в помощи.",
      servicesTitle: "НАШИ УСЛУГИ ВКЛЮЧАЮТ",
      services: [
        "Полное юридическое сопровождение договора",
        "Все необходимые медицинские обследования",
        "Компенсация транспортных расходов",
        "Проживание (при необходимости)",
        "Персональный ассистент на весь период беременности - визиты к врачу, обследования, поддержка",
        "Гарантия получения полной компенсации по договору",
        "Роды в клинике Hera под наблюдением доктора Теоны Багатурия"
      ],
      conditionsTitle: "Необходимые условия для участия в программе суррогатного материнства",
      conditions: [
        "Возраст от 20 до 39 лет.",
        "Оптимальное физическое и психическое здоровье.",
        "История родов"
      ],
      eggDonationTitle: "Донорство яйцеклеток",
      eggDonationParagraphs: [
        "Участвуя в этой программе, вы поможете парам, сталкивающимся с проблемой бесплодия, стать родителями и при этом получите существенную финансовую компенсацию. Для нас приоритетом является благополучие каждого донора, и мы обеспечиваем премиальное вознаграждение за качественные яйцеклетки",
        "Для того чтобы стать донором яйцеклеток, не требуется наличие собственных детей",
        "Surrcare предлагает самые высокие ставки компенсации в индустрии и создаёт среду, в которой каждый донор чувствует себя защищённым и ценным",
        "Гарантия полной конфиденциальности"
      ],
      eggDonationBenefitsTitle: "Участники программы получают:",
      eggDonationBenefits: [
        "Бесплатное диагностическое тестирование",
        "Выделенный личный координатор для постоянной поддержки"
      ],
      contactTitle: "Свяжитесь с нами",
      contactSubtitle: "Связаться с нами",
      faqTitle: "Часто задаваемые вопросы",
      faq: [
        {
          question: "Кто может стать суррогатной матерью?",
          answer: "Женщины в возрасте 20-38 лет с оптимальным физическим и психическим здоровьем, имеющие историю родов, могут стать суррогатными матерями."
        },
        {
          question: "Сколько времени занимает процесс суррогатного материнства?",
          answer: "Весь процесс обычно занимает 12-15 месяцев, включая медицинские обследования, подбор пары с будущими родителями, беременность и роды."
        },
        {
          question: "Кто может стать донором яйцеклеток?",
          answer: "Донором яйцеклеток может стать здоровая женщина в возрасте 18-28 лет, не имеющая серьезных хронических или генетических заболеваний и прошедшая необходимые медицинские обследования."
        },
        {
          question: "Сколько времени занимает процесс донорства яйцеклеток?",
          answer: "Полный процесс донорства яйцеклеток обычно занимает 2-4 недели, включая предварительные обследования, гормональную подготовку и саму процедуру."
        },
        {
          question: "Какую компенсацию я могу ожидать?",
          answer: "Мы предлагаем пакеты компенсации выше рыночных. Точная сумма зависит от различных факторов и будет обсуждаться во время консультации. Вся компенсация юридически закреплена в договоре."
        },
        {
          question: "Является ли процесс конфиденциальным?",
          answer: "Да, полная конфиденциальность обеспечена. Мы уделяем приоритетное внимание вашей частной жизни, и вся личная информация защищена в соответствии с правовыми стандартами."
        },
        {
          question: "Какие медицинские обследования требуются?",
          answer: "Мы проводим комплексные диагностические процедуры, включая физические обследования, анализы крови, УЗИ и психологические оценки. Все обследования предоставляются бесплатно."
        }
      ],
      form: {
        firstName: "Имя",
        email: "Эл. почта",
        phone: "Телефон",
        subject: "Тема",
        selectSubject: "Выберите тему",
        subjectOptions: {
          surrogacy: "Суррогатное материнство",
          eggDonation: "Донорство яйцеклеток",
          general: "Общие вопросы"
        },
        comment: "Комментарий",
        submit: "Отправить"
      },
      formValidation: {
        fillAllFields: "Пожалуйста, заполните все обязательные поля",
        emailSent: "Сообщение успешно отправлено!",
        emailError: "Не удалось отправить сообщение. Попробуйте позже.",
        sending: "Отправляется..."
      }
    }
  }), []);

  const carouselTitles = carouselTranslations[selectedLanguage] || carouselTranslations.ENG;
  const currentTranslations = translations[selectedLanguage] || translations.ENG;

  // Contact Form Functions
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - check required fields
    if (!formData.firstName || !formData.email || !formData.comment) {
      setPopupMessage({
        type: 'error',
        message: currentTranslations.formValidation.fillAllFields
      });
      setShowPopup(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          message: `
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject || 'General'}

Message:
${formData.comment}
          `.trim(),
          honeypot: formData.honeypot
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPopupMessage({
          type: 'success',
          message: currentTranslations.formValidation.emailSent
        });
        // Reset form
        setFormData({
          firstName: '',
          email: '',
          phone: '',
          subject: '',
          comment: '',
          honeypot: ''
        });
      } else {
        setPopupMessage({
          type: 'error',
          message: data.error || currentTranslations.formValidation.emailError
        });
      }
    } catch (error) {
      setPopupMessage({
        type: 'error',
        message: currentTranslations.formValidation.emailError
      });
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage({ type: '', message: '' });
  };

  const cardData = React.useMemo(() => {
    if (selectedLanguage === 'GEO') {
      return [
        {
          title: "სარგებელი თქვენთვის",
          content: (
            <div>
              <p className="text-lg leading-relaxed mb-4">
                თქვენი უსაფრთხოება და კომფორტი ჩვენი მთავარი პრიორიტეტია. კონსულტაციისა და დიაგნოსტიკის შემდეგ კანდიდატები ემატებიან ჩვენს ბაზაში და ხდებიან ხელმისაწვდომები მომავალი მშობლებისთვის.
              </p>
              <p className="text-lg leading-relaxed">
                ჩვენ გთავაზობთ საშუალოზე მაღალ ანაზღაურებას და საუკეთესო პირობებს იმ ქალბატონებს, რომლებიც ეხმარებიან უშვილო წყვილებს.
              </p>
            </div>
          ),
          delay: 0.2
        },
        {
          title: "ჩვენი მიდგომა",
          content: (
            <div>
              <p className="text-lg leading-relaxed mb-4">
                ყველა ხელშეკრულება იურიდიულად გამართულია.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                ჩვენი ძირითადი ღირებულებებია: ოჯახური გარემო, კომფორტული პირობები და ზრუნვა თითოეული მხარისთვის. დონორებისა და სუროგატი დედების კეთილდღეობა განსაზღვრავს  წარმატებას.
              </p>
              <p className="text-lg leading-relaxed">
                ჩვენი მომსახურებით უშვილო წყვილები ხდებიან ბედნიერი მშობლები, ხოლო დონორები და სუროგატი დედები მნიშვნელოვნად აუმჯობესებენ თავიანთ ფინანსურ მდგომარეობას.
              </p>
            </div>
          ),
          delay: 0.4
        },
        {
          title: "ჩვენი პარტნიორები",
          content: (
            <div>
              <p className="text-lg leading-relaxed mb-4">
                SurrCare თანამშრომლობს საქართველოს საუკეთესო რეპროდუქციულ კლინიკებთან: ჟორდანია, ინოვა, კარაპს მედლაინი, GGRC, ევროპული კლინიკა და სხვა წამყვანი კლინიკები საქართველოში. ამ დაწესებულებებს ჰყავთ კვალიფიციური სპეციალისტები და აქვთ თანამედროვე აღჭურვილობა, რაც უზრუნველყოფს IVF პროცედურების მაღალ ხარისხს.
              </p>
              <p className="text-lg leading-relaxed">
                ასევე ვთანამშრომლობთ საერთაშორისო რეპროდუქციულ კლინიკებთან, რაც საშუალებას გვაძლევს შევთავაზოთ უფრო მაღალი ანაზღაურება გლობალური პროგრამების ფარგლებში.
              </p>
            </div>
          ),
          delay: 0.6
        }
      ];
    } else if (selectedLanguage === 'RUS') {
      return [
        {
          title: "Преимущества для Вас",
          content: (
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Безопасность и комфорт — наши главные приоритеты. После консультации и диагностики кандидаты добавляются в нашу базу данных и становятся немедленно доступными для будущих родителей.
              </p>
              <p className="text-lg leading-relaxed">
                Мы предлагаем компенсацию выше рыночной и лучшие условия для женщин, помогающих бесплодным парам.
              </p>
            </div>
          ),
          delay: 0.2
        },
        {
          title: "Наш подход",
          content: (
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Все договоры юридически заверены и зарегистрированы в Доме Юстиции с участием юристов.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Наши основные ценности — семейная среда, комфортные условия и забота о каждой стороне. Благополучие доноров и суррогатных матерей определяет наш успех.
              </p>
              <p className="text-lg leading-relaxed">
                Благодаря нашим услугам бездетные пары становятся счастливыми родителями, а доноры и суррогатные матери значительно улучшают свое финансовое положение.
              </p>
            </div>
          ),
          delay: 0.4
        },
        {
          title: "Наши партнеры",
          content: (
            <div>
              <p className="text-lg leading-relaxed mb-4">
                SurrCare сотрудничает с лучшими репродуктивными клиниками Грузии: Жордания, Инова, Карапс Медлайн и Репроарт. Эти учреждения располагают квалифицированными специалистами и современным оборудованием, обеспечивающим высококачественные процедуры ЭКО.
              </p>
              <p className="text-lg leading-relaxed">
                Мы также работаем с международными репродуктивными клиниками, обеспечивая более высокое вознаграждение через глобальные программы.
              </p>
            </div>
          ),
          delay: 0.6
        }
      ];
    } else {
      return [
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
      ];
    }
  }, [selectedLanguage]);

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
    <div className="min-h-screen bg-bg-light overflow-x-hidden">
      <Header
        activeSection={activeSection}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <main className="overflow-x-hidden">
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
                {currentTranslations.mainDescription}
              </motion.p>

              <MobileCardCarousel cards={cardData} />
            </div>
          </div>
        </Section>

        <Section id="surrogacy" className="bg-gray-50 py-20 !justify-start">
          <div className="w-[90%] mx-auto space-y-8">
            {/* Section Title */}
            <h2 className="text-3xl font-bold text-primary text-center mb-4">
              {currentTranslations.surrogacyTitle}
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
                {currentTranslations.surrogacyDescription}
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
                <h3 className="text-2xl font-bold  text-primary mb-4">{currentTranslations.servicesTitle}</h3>
                <ul className="space-y-3 text-gray-700">
                  {currentTranslations.services.map((service, index) => (
                    <li key={index} className="flex items-start text-xl self-center">
                      <span className="text-accent mr-2">•</span>
                      <span>{service}</span>
                    </li>
                  ))}
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
              <h3 className="text-2xl font-bold text-primary mb-12">{currentTranslations.conditionsTitle}</h3>

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
                  <p className="text-lg font-medium text-primary">{currentTranslations.conditions[0]}</p>
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
                  <p className="text-lg font-medium text-primary">{currentTranslations.conditions[1]}</p>
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
                  <p className="text-lg font-medium text-primary">{currentTranslations.conditions[2]}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="egg-donation" title={currentTranslations.eggDonationTitle} className="bg-white [&>h2]:mt-6 [&>h2]:md:mt-0">
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
                {currentTranslations.eggDonationParagraphs[0]}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-6"
              >
                {currentTranslations.eggDonationParagraphs[1]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-6"
              >
                <h3 className="text-xl font-bold text-primary mb-4">{currentTranslations.eggDonationBenefitsTitle}</h3>
                <ul className="space-y-2 text-gray-700">
                  {currentTranslations.eggDonationBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-6"
              >
                {currentTranslations.eggDonationParagraphs[2]}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg leading-relaxed text-gray-700 mb-4"
              >
                {currentTranslations.eggDonationParagraphs[3]}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg font-semibold text-primary"
              >
                {currentTranslations.eggDonationParagraphs[4]}
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

        <Section id="contact" title={currentTranslations.contactTitle} className="bg-gray-50 py-20 !justify-start">
          <div className="w-[90%] mx-auto grid md:grid-cols-2 gap-8 mt-20">
            {/* First Div - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">{currentTranslations.contactSubtitle}</h3>

              {/* Contact Info at top of form */}
              <div className="mb-8 flex flex-wrap justify-start items-center gap-6">
                {/* Phone */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#eab2bb' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <a href="tel:+995599682740" className="text-base font-semibold text-primary hover:text-accent transition-colors">
                      +995 599 68 27 40
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center  space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#eab2bb' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <a href="mailto:surrcare@yahoo.com" className="text-base font-semibold text-primary hover:text-accent transition-colors">
                      surrcare@yahoo.com
                    </a>
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                {/* Honeypot field - hidden from users, visible to bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleFormChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="contact-firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    {currentTranslations.form.firstName} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="contact-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    {currentTranslations.form.email} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">{currentTranslations.form.phone}</label>
                  <input 
                    type="tel" 
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">{currentTranslations.form.subject}</label>
                  <select 
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">{currentTranslations.form.selectSubject}</option>
                    <option value="surrogacy">{currentTranslations.form.subjectOptions.surrogacy}</option>
                    <option value="eggDonation">{currentTranslations.form.subjectOptions.eggDonation}</option>
                    <option value="general">{currentTranslations.form.subjectOptions.general}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-comment" className="block text-sm font-medium text-gray-700 mb-1">
                    {currentTranslations.form.comment} <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    rows="4" 
                    id="contact-comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-all transform ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-opacity-90 hover:scale-[1.02]'
                  }`}
                >
                  {loading ? currentTranslations.formValidation.sending : currentTranslations.form.submit}
                </button>
              </form>
            </motion.div>

            {/* Second Div - FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">{currentTranslations.faqTitle}</h3>

              <div className="space-y-3">
                {currentTranslations.faq.map((item, index) => (
                  <FAQItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>

            </motion.div>
          </div>
        </Section>
      </main>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                popupMessage.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {popupMessage.type === 'success' ? (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <p className="text-gray-800 mb-6 text-lg">{popupMessage.message}</p>
              <button
                onClick={closePopup}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                {selectedLanguage === 'GEO' ? 'დახურვა' : selectedLanguage === 'RUS' ? 'Закрыть' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer activeSection={activeSection} selectedLanguage={selectedLanguage} />
    </div>
  );
}

export default App;
