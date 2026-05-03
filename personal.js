const body = document.body;

const navLinks = [...document.querySelectorAll('.topbar .nav-link')];
const dropdownParents = [...document.querySelectorAll('[data-select]')];
const languageLabel = document.querySelector('[data-language-label]');
const floatingTabs = document.getElementById('floatingTabs');
const footerShell = document.querySelector('.footer-shell');
const footerPanel = document.querySelector('.footer-panel');

const footerBackgroundImages = [
  'https://cdn.imgtree.co/images/LB9TMHbh.jpg',
  'https://cdn.imgtree.co/images/hd1EfeuZ.jpg',
  'https://cdn.imgtree.co/images/XMAgcwdK.jpg',
  'https://cdn.imgtree.co/images/VH5uB3ez.jpg',
];

const footerBackgroundPreloads = footerBackgroundImages.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

let footerBackgroundIndex = 0;
let footerBackgroundTimer = null;

const letterModal = document.getElementById('letter-modal');
const letterForm = document.getElementById('letterForm');
const letterMessage = document.getElementById('letterMessage');
const openLetterButton = document.querySelector('[data-open-letter]');
const letterCloseButton = document.querySelector('[data-letter-close]');
const letterCancelButton = document.querySelector('[data-letter-cancel]');

const componentModal = document.getElementById('component-modal');
const componentCards = [...document.querySelectorAll('[data-component-card]')];
const componentCategory = document.querySelector('[data-component-category]');
const componentTitle = document.querySelector('#component-modal-title');
const componentSummary = document.querySelector('[data-component-summary]');
const componentDetails = document.querySelector('[data-component-details]');
const componentCounter = document.querySelector('[data-component-counter]');
const componentCloseButton = document.querySelector('[data-component-close]');
const componentPrevButton = document.querySelector('[data-component-prev]');
const componentNextButton = document.querySelector('[data-component-next]');

const openGalleryTermsButton = document.querySelector('[data-open-gallery-terms]');
const galleryTermsModal = document.getElementById('gallery-terms-modal');
const galleryTermsCheckbox = document.querySelector('[data-gallery-agree]');
const galleryModal = document.getElementById('gallery-modal');
const galleryCards = [...document.querySelectorAll('[data-gallery-card]')];
const galleryImagesModal = document.getElementById('gallery-images-modal');
const galleryImagesGrid = document.querySelector('[data-gallery-images-grid]');
const galleryImagesCloseButton = document.querySelector('[data-gallery-images-close]');

const CONTACT_EMAIL = 'omangimeshack@gmail.com';
const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const LANGUAGE_CODES = {
  English: 'en',
  Swahili: 'sw',
  Spanish: 'es',
  Japanese: 'ja',
};

const letterTitle = document.querySelector('.write-letter-title');
const letterIdentity = document.querySelector('.write-letter-identity');
const letterSubtitle = document.querySelector('.write-letter-subtitle');
const letterIdentityStrong = letterIdentity ? letterIdentity.querySelector('strong') : null;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let subtitleTimer = null;
let galleryAgreed = false;
let activeGalleryKey = 'saint';
let selectedLanguage = 'English';
let activeComponentIndex = 0;

const galleryData = [
  {
    key: 'saint',
    hue: 152,
    images: [
      'https://cdn.imgtree.co/images/_EJTkpxS.jpg',
      'https://cdn.imgtree.co/images/7eWShQEm.jpg',
      'https://cdn.imgtree.co/images/7bfCk3AD.jpg',
      'https://cdn.imgtree.co/images/yWgaFGdm.jpg',
      'https://cdn.imgtree.co/images/lNf-E6H4.jpg',
      'https://cdn.imgtree.co/images/0ulb6oVj.png',
    ],
  },
  {
    key: 'west-coast',
    hue: 208,
    images: [
      'https://cdn.imgtree.co/images/oZYrc-s_.jpg',
      'https://cdn.imgtree.co/images/bdAD7zjR.jpg',
      'https://cdn.imgtree.co/images/SmmiC0pf.jpg',
      'https://cdn.imgtree.co/images/HiWeccv_.jpg',
      'https://cdn.imgtree.co/images/P9WrGmsR.jpg',
      'https://cdn.imgtree.co/images/CZxndc8J.jpg',
      'https://cdn.imgtree.co/images/FxmpQDsX.jpg',
      'https://cdn.imgtree.co/images/UBrSyPGP.jpg',
      'https://cdn.imgtree.co/images/O1E6ppRj.jpg',
      'https://cdn.imgtree.co/images/Pd9dlBxf.jpg',
      'https://cdn.imgtree.co/images/oj8ZGwX7.jpg',
      'https://cdn.imgtree.co/images/4F19VdBZ.jpg',
    ],
  },
  {
    key: 'blackbird',
    hue: 18,
    images: [
      'https://cdn.imgtree.co/images/Poxlj1od.jpg',
      'https://cdn.imgtree.co/images/kqANPn5I.jpg',
      'https://cdn.imgtree.co/images/3vjZ_9h8.jpg',
      'https://cdn.imgtree.co/images/Th8PklsI.jpg',
      'https://cdn.imgtree.co/images/xFltuxKM.jpg',
      'https://cdn.imgtree.co/images/jcdAYTQ9.jpg',
      'https://cdn.imgtree.co/images/LXq4LnHK.jpg',
      'https://cdn.imgtree.co/images/lQ_Cibso.png',
      'https://cdn.imgtree.co/images/-CmQOx87.png',
    ],
  },
];

const translations = {
  English: {
    documentTitle: '</.kiboma> Personal',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'English',

    letter: {
      title: 'Hello again?',
      identityPrefix: 'My sobriquet is',
      identityName: 'Saint',
      subtitleLines: [
        'Saint is Curious.',
        'Saint is Modest.',
        'Saint is Peaceful.',
        'Saint is Persistent.',
        'Saint is Clever.',
        'Saint is Disciplined.',
      ],
      button: 'Write a Letter',
      galleryButtonTitle: 'Click me',
      galleryButtonAria: 'Open gallery terms',
      modalKicker: 'Write a letter to Saint!',
      placeholder: 'Say hi, ask stuff, or overshare 👀. Only Saint can see this',
      cancel: 'Cancel',
      send: 'Send',
      subject: 'Letter from the personal page',
      bodyPrefix: 'Hello Meshack,',
      bodySuffix: '— Sent from the personal page',
      srLabel: 'Your message',
    },

    hobbies: {
      headingHTML: "<strong>Saint's</strong> Hobbies",
      intro: 'I like to stay active. New hobbies are added almost every year.',
      label: 'Hobbies',
      items: [
        'Morning Working Out',
        'Vibe Coding',
        'Hiking',
        'Swimming',
        'Watching Formula 1',
        'Watching Soccer',
        'Playing Video Games',
      ],
    },

    components: {
      headingHTML: "Components of <strong>Saint's</strong> Life",
      cards: [
        'Computer & IT',
        'Fitness',
        'Foreign Languages',
        'Gaming',
        'Formula 1',
        'Family & Friends',
      ],
      modalTitle: 'Interest, Work',
      prevAria: 'Previous component',
      nextAria: 'Next component',
      items: [
        {
          title: 'Interest, Work',
          summary:
            'I have been passionate about computers since I was 16. Most of what I know started with YouTube tutorials, which played a huge role in building my skills. Creating my first website was one of the happiest moments of my life. I later enrolled in a certified course to turn a hobby into a career. Since then, I have worked on many projects, learned through hands-on experience, and grown more confident in my abilities.',
          details: [
            'I prefer Python and C# over most other languages, even though I am fluent in many of them.',
            'I prefer freelancing, but I am open to on-site jobs.',
            'I want to grow further in software development and cryptography.',
          ],
        },
        {
          title: 'Sports, Gym',
          summary:
            'Staying active helps keep my life in balance. Training, swimming, hiking, and long walks give me the energy, focus, and consistency I need to keep building and giving my best in everything else I do.',
          details: ['Weight: 60kg', 'Height: 5"8', 'Squat: 100kg x 10', 'Bench press: 70 x 11', 'Deadlift: 90kg x 8', 'Pull-ups: 17'],
        },
        {
          title: 'Foreign Languages',
          summary:
            'Languages open doors to people, stories, and new opportunities. I enjoy learning new words, listening closely, and becoming better at communicating across cultures. Every new phrase feels like a small connection, and every conversation teaches me something meaningful.',
          details: [
            'English is the main daily language for work and communication.',
            'Swahili keeps me rooted. (#Roots run deep(Lol))',
            'Spanish and Japanese keep my curiosity alive and remind me how exciting it is to keep learning.',
            'I enjoy language learning because it feels like building a new bridge.',
            'Each time it brings me closer to people, ideas, and cultures I might never have reached otherwise.',
          ],
        },
        {
          title: 'Gaming',
          summary:
            'I have always had a strong passion for gaming. What started as a hobby quickly became something I truly enjoy and spend a lot of time doing. Gaming helps me relax, stay creative, and connect with others. Best games so far:',
          details: [
            'God of War',
            'The Witcher 3: Wild Hunt',
            'Red Dead Redemption 2',
            'Need for Speed: Hot Pursuit',
            'The Legend of Zelda: Breath of the Wild',
            'Modern Warfare III (2023)',
          ],
        },
        {
          title: 'Formula 1',
          summary:
            'I have always been passionate about speed, and Formula 1 is something I truly love. Watching the cars fly past at unbelievable speed, with everything changing in seconds, is incredible. I enjoy the adrenaline, excitement, and intensity of the sport. It has always been my dream to attend a race in person, especially at Suzuka Circuit in Japan. Here are my preferences:',
          details: [
            'Team constructor: Mercedes-AMG PETRONAS',
            'Drivers: Max Verstappen, Fernando Alonso',
            'Best car: Red Bull Racing RB19',
            'Best track: Suzuka Circuit',
          ],
        },
        {
          title: 'Family & Friends',
          summary:
            'My family and friends have always been a very important part of my life. They have supported me through different stages of my journey, encouraged me when things were difficult, and celebrated my progress with me. Their belief in me has helped me stay motivated and keep moving forward.',
          details: [
            'My family and friends keep me grounded and remind me what really matters.',
            'They bring comfort, laughter, and strength into my life, and I am grateful for the support they have given me along the way.',
            'Their presence makes the journey lighter, and their encouragement pushes me to keep growing and becoming better every day.',
          ],
        },
      ],
    },

    profile: {
      title: 'Profile',
      futureTitle: 'Future plan',
      routineTitle: 'Daily routine',
      musicTitle: 'Current Music Loop',
      stats: [
        'Coding Hrs',
        'Animes watched',
        'Movies watched',
        'Music Genre',
        'Games played',
        'Projects Built',
        'Hackathons Joined',
        'Certificates Earned',
        'Books Read',
        'Challenges Completed',
      ],
      futurePlans: [
        'Enroll in CyberSecurity.',
        'Master Python.',
        'Master C#.',
        'Expand knowledge on C ++.',
        'Deploy 10+ more projects.',
        'Climb Mt. Longonot.',
        'Visit Shella Beach.',
        'Visit Nairobi Snake Park.',
        'Climb Ngong Hills.',
        'Climb Kijabe Hills.',
        'Visit Manda Beach.',
        'Visit Kiwayu Island to see the archipelago.',
        'Visit Diamonds Malindi.',
        'Participate in 25+ hackathon events.',
        'Be happy.',
      ],
      routineRows: [
        ['6:00 AM', 'Wake up'],
        ['8:00 AM', 'School/Work'],
        ['5:00 PM', 'Gym'],
        ['6:00 PM', 'Code'],
        ['12:00 PM', 'Music & Anime'],
        ['13:00 PM', 'Sleep'],
      ],
    },

    footer: {
      headingHTML: 'For visiting my profile<br /><span>Thank you.</span>',
      signoff: '© Meshack Kiboma @2026',
    },

    galleryTerms: {
      kicker: 'Gallery Terms & Conditions',
      text: 'By accessing the gallery, you agree to view these personal images respectfully. They are not to be shared without permission.',
      agree: 'I agree to the terms.',
    },

    gallery: {
      title: 'Gallery',
      imagesTitle: 'Images',
      closeAria: 'Close gallery images popup',
      cards: ['Saint', 'West Coast', 'Galerie'],
      alts: ['Saint cover image', 'West Coast cover image', 'BlackBird cover image'],
      coverCaption: 'Cover',
    },
  },

  Swahili: {
    documentTitle: '</.kiboma> Binafsi',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'Swahili',

    letter: {
      title: 'Jambo tena?',
      identityPrefix: 'Jina langu la utani ni',
      identityName: 'Saint',
      subtitleLines: [
        'Saint ni Mdadisi.',
        'Saint ni Mnyenyekevu.',
        'Saint ni Mtulivu.',
        'Saint ni Mvumilivu.',
        'Saint ni Mwerevu.',
        'Saint ni Mwenye Nidhamu.',
      ],
      button: 'Andika Barua',
      galleryButtonTitle: 'Bofya hapa',
      galleryButtonAria: 'Fungua masharti ya ghala',
      modalKicker: 'Andikia Saint barua!',
      placeholder: 'Salimia, uliza kitu, au uliza vya ndani 👀. Ni Saint pekee anayeweza kuona hili',
      cancel: 'Ghairi',
      send: 'Tuma',
      subject: 'Barua kutoka ukurasa wa binafsi',
      bodyPrefix: 'Jambo Meshack,',
      bodySuffix: '— Imetumwa kutoka ukurasa wa binafsi',
      srLabel: 'Ujumbe wako',
    },

    hobbies: {
      headingHTML: "<strong>Hobi za Saint</strong>",
      intro: 'Napenda kuwa mchangamfu. Hobi mpya huongezwa karibu kila mwaka.',
      label: 'Hobi',
      items: [
        'Mazoezi ya Asubuhi',
        'Kusimba kwa Hali ya Uhalisia',
        'Kupanda Milima',
        'Kuogelea',
        'Kuangalia Formula 1',
        'Kuangalia Soka',
        'Kucheza Michezo ya Video',
      ],
    },

    components: {
      headingHTML: "Vipengele vya <strong>Maisha ya Saint</strong>",
      cards: [
        'Kompyuta na TEHAMA',
        'Afya ya Mwili',
        'Lugha za Kigeni',
        'Michezo',
        'Formula 1',
        'Familia na Marafiki',
      ],
      modalTitle: 'Maslahi, Kazi',
      prevAria: 'Kipengele kilichotangulia',
      nextAria: 'Kipengele kinachofuata',
      items: [
        {
          title: 'Maslahi, Kazi',
          summary:
            'Nimekuwa na shauku ya kompyuta tangu nilipokuwa na miaka 16. Niliianza safari yangu kupitia mafunzo ya YouTube, ambayo yalichangia sana kujenga ujuzi wangu. Kutengeneza tovuti yangu ya kwanza kulikuwa miongoni mwa nyakati za furaha zaidi maishani mwangu. Baadaye niliingia kwenye kozi ya kitaaluma ili kubadilisha hobi kuwa taaluma.',
          details: [
            'Napendelea Python na C# kuliko lugha nyingi nyingine, ingawa nina ufasaha katika nyingi.',
            'Napendelea kufanya kazi kwa uhuru, lakini niko tayari pia kwa kazi za ofisini.',
            'Nataka kuendelea kukua katika uhandisi wa programu na cryptography.',
          ],
        },
        {
          title: 'Michezo, Gym',
          summary:
            'Kuwa hai hunisaidia kuweka maisha yangu katika mizani. Mazoezi, kuogelea, kupanda milima, na matembezi marefu hunipa nguvu, umakini, na uthabiti ninaohitaji kuendelea kujenga na kutoa bora yangu.',
          details: ['Uzito: 60kg', 'Urefu: 5"8', 'Squat: 100kg x 10', 'Bench press: 70 x 11', 'Deadlift: 90kg x 8', 'Pull-ups: 17'],
        },
        {
          title: 'Lugha za Kigeni',
          summary:
            'Lugha hufungua milango ya kuwasiliana na watu, kusikia hadithi, na kupata fursa mpya. Napenda kujifunza maneno mapya, kusikiliza kwa makini, na kuwa bora zaidi katika kuwasiliana kati ya tamaduni.',
          details: [
            'Kiingereza ndicho lugha kuu ya kila siku kwa kazi na mawasiliano.',
            'Kiswahili hunifanya nibaki na mizizi yangu. (#Roots run deep(Lol))',
            'Kihispania na Kijapani huhifadhi hamu yangu ya kujifunza.',
            'Ninapenda kujifunza lugha kwa sababu huhisi kama kujenga daraja jipya.',
            'Kila mara hunileta karibu zaidi na watu, mawazo, na tamaduni ambazo huenda nisingewahi kuzifikia.',
          ],
        },
        {
          title: 'Michezo ya Video',
          summary:
            'Nimekuwa na shauku kubwa ya michezo ya video. Kilichoanza kama hobi kiligeuka kuwa kitu ninachokipenda sana na kutumia muda mwingi kukifanya. Michezo hunisaidia kupumzika, kubaki mbunifu, na kuwasiliana na wengine. Michezo bora hadi sasa:',
          details: [
            'God of War',
            'The Witcher 3: Wild Hunt',
            'Red Dead Redemption 2',
            'Need for Speed: Hot Pursuit',
            'The Legend of Zelda: Breath of the Wild',
            'Modern Warfare III (2023)',
          ],
        },
        {
          title: 'Formula 1',
          summary:
            'Nimekuwa nikivutiwa sana na kasi, na Formula 1 ni kitu ninachokipenda kweli. Kuona magari yakipita kwa kasi ya ajabu, huku kila kitu kikibadilika ndani ya sekunde, ni jambo la kushangaza. Ndoto yangu ni kushuhudia mbio moja moja, hasa Suzuka Circuit nchini Japani. Haya ndiyo mapendeleo yangu:',
          details: [
            'Timu: Mercedes-AMG PETRONAS',
            'Madereva: Max Verstappen, Fernando Alonso',
            'Gari bora: Red Bull Racing RB19',
            'Njia bora: Suzuka Circuit',
          ],
        },
        {
          title: 'Familia na Marafiki',
          summary:
            'Familia na marafiki wangu wamekuwa sehemu muhimu sana ya maisha yangu. Wamenisaidia katika hatua tofauti za safari yangu, wamenitia moyo nilipokutana na changamoto, na kusherehekea mafanikio yangu pamoja nami.',
          details: [
            'Familia na marafiki hunikumbusha yale muhimu zaidi maishani.',
            'Hunitia faraja, furaha, na nguvu, na ninashukuru kwa msaada wao.',
            'Uwepo wao hufanya safari kuwa nyepesi zaidi, na moyo wao wa kunihimiza hunifanya niendelee kukua kila siku.',
          ],
        },
      ],
    },

    profile: {
      title: 'Wasifu',
      futureTitle: 'Mpango wa baadaye',
      routineTitle: 'Ratiba ya kila siku',
      musicTitle: 'Muziki wa sasa',
      stats: [
        'Saa za coding',
        'Anime zilizotazamwa',
        'Filamu zilizotazamwa',
        'Aina za muziki',
        'Michezo iliyochezwa',
        'Miradi iliyojengwa',
        'Hackathon zilizohudhuria',
        'Vyeti vilivyopatikana',
        'Vitabu vilivyosomwa',
        'Changamoto zilizokamilika',
      ],
      futurePlans: [
        'Jiandikishe kwa Usalama wa Mtandao.',
        'Umiliki Python.',
        'Umiliki C#.',
        'Panua uelewa kuhusu C ++.',
        'Zindua miradi 10+ zaidi.',
        'Panda Mlima Longonot.',
        'Tembelea Shella Beach.',
        'Tembelea Nairobi Snake Park.',
        'Panda Ngong Hills.',
        'Panda Kijabe Hills.',
        'Tembelea Manda Beach.',
        'Tembelea Kisiwa cha Kiwayu kuona visiwa.',
        'Tembelea Diamonds Malindi.',
        'Shiriki katika hafla 25+ za hackathon.',
        'Kuwa mwenye furaha.',
      ],
      routineRows: [
        ['6:00 AM', 'Amka'],
        ['8:00 AM', 'Shule/Kazi'],
        ['5:00 PM', 'Gym'],
        ['6:00 PM', 'Kusimba'],
        ['12:00 PM', 'Muziki na Anime'],
        ['13:00 PM', 'Lala'],
      ],
    },

    footer: {
      headingHTML: 'Kwa kutembelea wasifu wangu<br /><span>Asante.</span>',
      signoff: '© Meshack Kiboma @2026',
    },

    galleryTerms: {
      kicker: 'Masharti na Kanuni za Ghala',
      text: 'Kwa kufungua ghala, unakubali kutazama picha hizi binafsi kwa heshima. Hazipaswi kushirikiwa bila ruhusa.',
      agree: 'Nakubali masharti.',
    },

    gallery: {
      title: 'Ghala',
      imagesTitle: 'Picha',
      closeAria: 'Funga dirisha la picha za ghala',
      cards: ['Saint', 'Pwani ya Magharibi', 'Galerie'],
      alts: ['Picha ya jalada ya Saint', 'Picha ya jalada ya West Coast', 'Picha ya jalada ya BlackBird'],
      coverCaption: 'Jalada',
    },
  },

  Spanish: {
    documentTitle: '</.kiboma> Personal',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'Spanish',

    letter: {
      title: '¿Hola otra vez?',
      identityPrefix: 'Mi sobrenombre es',
      identityName: 'Saint',
      subtitleLines: [
        'Saint tiene curiosidad.',
        'Saint es modesto.',
        'Saint es tranquilo.',
        'Saint es persistente.',
        'Saint es inteligente.',
        'Saint es disciplinado.',
      ],
      button: 'Escribir una carta',
      galleryButtonTitle: 'Haz clic aquí',
      galleryButtonAria: 'Abrir términos de la galería',
      modalKicker: '¡Escribe una carta a Saint!',
      placeholder: 'Saluda, pregunta algo o cuenta de más 👀. Solo Saint puede ver esto',
      cancel: 'Cancelar',
      send: 'Enviar',
      subject: 'Carta desde la página personal',
      bodyPrefix: 'Hola Meshack,',
      bodySuffix: '— Enviado desde la página personal',
      srLabel: 'Tu mensaje',
    },

    hobbies: {
      headingHTML: "<strong>Hobbies de Saint</strong>",
      intro: 'Me gusta mantenerme activo. Cada año agrego nuevas aficiones.',
      label: 'Aficiones',
      items: [
        'Entrenar por la mañana',
        'Programar con estilo',
        'Senderismo',
        'Natación',
        'Ver Fórmula 1',
        'Ver fútbol',
        'Jugar videojuegos',
      ],
    },

    components: {
      headingHTML: "Componentes de <strong>la vida de Saint</strong>",
      cards: [
        'Computación y TI',
        'Acondicionamiento físico',
        'Idiomas extranjeros',
        'Videojuegos',
        'Fórmula 1',
        'Familia y amigos',
      ],
      modalTitle: 'Intereses, trabajo',
      prevAria: 'Componente anterior',
      nextAria: 'Componente siguiente',
      items: [
        {
          title: 'Intereses, trabajo',
          summary:
            'Me han apasionado las computadoras desde los 16 años. Gran parte de lo que sé empezó con tutoriales de YouTube, que jugaron un papel enorme en la construcción de mis habilidades. Crear mi primera página web fue uno de los momentos más felices de mi vida. Más tarde me inscribí en un curso certificado para convertir un pasatiempo en una carrera.',
          details: [
            'Prefiero Python y C# por encima de la mayoría de los demás lenguajes, aunque domino varios.',
            'Prefiero el trabajo independiente, pero estoy abierto a trabajos presenciales.',
            'Quiero seguir creciendo en desarrollo de software y criptografía.',
          ],
        },
        {
          title: 'Deporte y gimnasio',
          summary:
            'Mantenerme activo ayuda a equilibrar mi vida. Entrenar, nadar, hacer senderismo y caminar largas distancias me dan la energía, el enfoque y la constancia que necesito para seguir construyendo y dar lo mejor de mí en todo lo demás.',
          details: ['Peso: 60kg', 'Altura: 5"8', 'Sentadilla: 100kg x 10', 'Press de banca: 70 x 11', 'Peso muerto: 90kg x 8', 'Dominadas: 17'],
        },
        {
          title: 'Idiomas extranjeros',
          summary:
            'Los idiomas abren puertas a personas, historias y nuevas oportunidades. Disfruto aprender nuevas palabras, escuchar con atención y mejorar poco a poco mi comunicación entre culturas. Cada nueva frase se siente como una pequeña conexión.',
          details: [
            'El inglés es el idioma principal del día a día para el trabajo y la comunicación.',
            'El suajili me mantiene arraigado. (#Roots run deep(Lol))',
            'El español y el japonés mantienen viva mi curiosidad y me recuerdan lo emocionante que es seguir aprendiendo.',
            'Disfruto aprender idiomas porque se siente como construir un nuevo puente.',
            'Cada vez me acerca más a personas, ideas y culturas a las que quizá nunca habría llegado.',
          ],
        },
        {
          title: 'Videojuegos',
          summary:
            'Siempre he tenido una fuerte pasión por los videojuegos. Lo que empezó como un pasatiempo se convirtió en algo que realmente disfruto y en lo que paso mucho tiempo. Los videojuegos me ayudan a relajarme, mantenerme creativo y conectar con otras personas. Mis mejores juegos hasta ahora:',
          details: [
            'God of War',
            'The Witcher 3: Wild Hunt',
            'Red Dead Redemption 2',
            'Need for Speed: Hot Pursuit',
            'The Legend of Zelda: Breath of the Wild',
            'Modern Warfare III (2023)',
          ],
        },
        {
          title: 'Fórmula 1',
          summary:
            'Siempre me ha apasionado la velocidad, y la Fórmula 1 es algo que de verdad amo. Ver pasar los coches a una velocidad increíble, con todo cambiando en segundos, es asombroso. Disfruto la adrenalina, la emoción y la intensidad del deporte. Aquí están mis preferencias:',
          details: [
            'Equipo constructor: Mercedes-AMG PETRONAS',
            'Pilotos: Max Verstappen, Fernando Alonso',
            'Mejor coche: Red Bull Racing RB19',
            'Mejor pista: Suzuka Circuit',
          ],
        },
        {
          title: 'Familia y amigos',
          summary:
            'Mi familia y mis amigos siempre han sido una parte muy importante de mi vida. Me han apoyado en distintas etapas de mi camino, me han animado cuando las cosas eran difíciles y han celebrado mis avances conmigo.',
          details: [
            'Mi familia y mis amigos me mantienen con los pies en la tierra y me recuerdan lo que realmente importa.',
            'Aportan consuelo, risas y fuerza a mi vida, y les agradezco el apoyo que me han dado.',
            'Su presencia hace el camino más ligero, y su ánimo me impulsa a seguir creciendo cada día.',
          ],
        },
      ],
    },

    profile: {
      title: 'Perfil',
      futureTitle: 'Plan futuro',
      routineTitle: 'Rutina diaria',
      musicTitle: 'Bucle musical actual',
      stats: [
        'Horas de código',
        'Animes vistos',
        'Películas vistas',
        'Géneros musicales',
        'Juegos jugados',
        'Proyectos construidos',
        'Hackatones realizados',
        'Certificados obtenidos',
        'Libros leídos',
        'Retos completados',
      ],
      futurePlans: [
        'Inscribirme en Ciberseguridad.',
        'Dominar Python.',
        'Dominar C#.',
        'Ampliar conocimientos de C ++.',
        'Desplegar 10+ proyectos más.',
        'Buscar trabajo.',
        'Subir al Monte Longonot.',
        'Visitar Shella Beach.',
        'Visitar Nairobi Snake Park.',
        'Subir Ngong Hills.',
        'Subir Kijabe Hills.',
        'Visitar Manda Beach.',
        'Visitar la isla Kiwayu para ver el archipiélago.',
        'Visitar Diamonds Malindi.',
        'Participar en más de 25 eventos de hackathon.',
        'Ser feliz.',
      ],
      routineRows: [
        ['6:00 AM', 'Despertar'],
        ['8:00 AM', 'Escuela/Trabajo'],
        ['5:00 PM', 'Gimnasio'],
        ['6:00 PM', 'Programar'],
        ['12:00 PM', 'Música y anime'],
        ['13:00 PM', 'Dormir'],
      ],
    },

    footer: {
      headingHTML: 'Gracias por visitar mi perfil<br /><span>Gracias.</span>',
      signoff: '© Meshack Kiboma @2026',
    },

    galleryTerms: {
      kicker: 'Términos y condiciones de la galería',
      text: 'Al acceder a la galería, aceptas ver estas imágenes personales con respeto. No deben compartirse sin permiso.',
      agree: 'Acepto los términos.',
    },

    gallery: {
      title: 'Galería',
      imagesTitle: 'Imágenes',
      closeAria: 'Cerrar ventana de imágenes de la galería',
      cards: ['Saint', 'Costa Oeste', 'Galerie'],
      alts: ['Imagen de portada de Saint', 'Imagen de portada de West Coast', 'Imagen de portada de BlackBird'],
      coverCaption: 'Portada',
    },
  },

  Japanese: {
    documentTitle: '</.kiboma> パーソナル',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'Japanese',

    letter: {
      title: 'またこんにちは？',
      identityPrefix: '私のあだ名は',
      identityName: 'Saint',
      subtitleLines: [
        'Saint は好奇心旺盛です。',
        'Saint は控えめです。',
        'Saint は穏やかです。',
        'Saint は粘り強いです。',
        'Saint は賢いです。',
        'Saint は規律正しいです。',
      ],
      button: '手紙を書く',
      galleryButtonTitle: 'ここをクリック',
      galleryButtonAria: 'ギャラリーの規約を開く',
      modalKicker: 'Saint へ手紙を書こう！',
      placeholder: '挨拶、質問、なんでもどうぞ 👀。Saint だけが見られます',
      cancel: 'キャンセル',
      send: '送信',
      subject: 'パーソナルページからの手紙',
      bodyPrefix: 'Meshack へ、',
      bodySuffix: '— パーソナルページから送信',
      srLabel: 'あなたのメッセージ',
    },

    hobbies: {
      headingHTML: "<strong>Saint の</strong> 趣味",
      intro: '私はいつも活動的でいるのが好きです。新しい趣味はほぼ毎年増えます。',
      label: '趣味',
      items: [
        '朝のワークアウト',
        '雰囲気コーディング',
        'ハイキング',
        '水泳',
        'F1観戦',
        'サッカー観戦',
        'ゲームをすること',
      ],
    },

    components: {
      headingHTML: "Saint の人生の <strong>要素</strong>",
      cards: [
        'コンピュータとIT',
        'フィットネス',
        '外国語',
        'ゲーム',
        'F1',
        '家族と友人',
      ],
      modalTitle: '興味、仕事',
      prevAria: '前の要素',
      nextAria: '次の要素',
      items: [
        {
          title: '興味、仕事',
          summary:
            '16歳の頃からコンピュータに強い関心を持ってきました。私が知っていることの多くはYouTubeのチュートリアルから始まりました。最初の自分のウェブサイトを作った時は、人生で最も嬉しい瞬間のひとつでした。のちに認定コースに進み、趣味をキャリアへと変えました。',
          details: [
            '私は多くの言語を扱えますが、特に Python と C# を好みます。',
            '私はフリーランスを好みますが、常勤の仕事にも前向きです。',
            'ソフトウェア開発と暗号技術の分野でさらに成長したいです。',
          ],
        },
        {
          title: 'スポーツとジム',
          summary:
            '活動的でいることは、私の生活のバランスを保つのに役立ちます。トレーニング、水泳、ハイキング、長い散歩が、私にエネルギーと集中力、継続力を与えてくれます。',
          details: ['体重: 60kg', '身長: 5"8', 'スクワット: 100kg x 10', 'ベンチプレス: 70 x 11', 'デッドリフト: 90kg x 8', '懸垂: 17'],
        },
        {
          title: '外国語',
          summary:
            '言語は人、物語、新しい機会への扉を開きます。新しい言葉を学び、注意深く耳を傾け、文化を越えて伝える力を少しずつ高めることが好きです。新しい表現は小さなつながりのように感じます。',
          details: [
            '英語は仕事とコミュニケーションのための主な日常言語です。',
            'スワヒリ語は私の土台を支えてくれます。 (#Roots run deep(Lol))',
            'スペイン語と日本語は好奇心を保ち、学び続ける楽しさを思い出させてくれます。',
            '言語学習は、新しい橋を架けるような感覚があるので好きです。',
            'そのたびに、人や考え方、文化へとこれまで以上に近づけてくれます。',
          ],
        },
        {
          title: 'ゲーム',
          summary:
            '私は昔からゲームに強い情熱を持っています。趣味として始まったものが、今では本当に楽しみ、長い時間を費やすものになりました。ゲームは私をリラックスさせ、創造性を保ち、人ともつながらせてくれます。今のところのベストゲームは次の通りです。',
          details: [
            'God of War',
            'The Witcher 3: Wild Hunt',
            'Red Dead Redemption 2',
            'Need for Speed: Hot Pursuit',
            'The Legend of Zelda: Breath of the Wild',
            'Modern Warfare III (2023)',
          ],
        },
        {
          title: 'F1',
          summary:
            '私はスピードに強い情熱を持っており、F1が本当に大好きです。信じられない速さでマシンが通り過ぎ、数秒で状況が変わるのを見るのは素晴らしい体験です。特に日本の鈴鹿サーキットで実際にレースを観るのが夢です。私の好みは次の通りです。',
          details: [
            'コンストラクター: Mercedes-AMG PETRONAS',
            'ドライバー: Max Verstappen, Fernando Alonso',
            '最高の車: Red Bull Racing RB19',
            '最高のコース: Suzuka Circuit',
          ],
        },
        {
          title: '家族と友人',
          summary:
            '家族と友人は、私の人生でとても大切な存在です。さまざまな時期に支えてくれ、困難な時には励まし、進歩を一緒に喜んでくれました。彼らの存在は私の原動力です。',
          details: [
            '家族と友人は、私を地に足のついた状態に保ち、本当に大切なことを思い出させてくれます。',
            '彼らは私の人生に安心感、笑い、力をもたらしてくれます。',
            'その存在のおかげで旅路は軽くなり、励ましが毎日の成長を後押ししてくれます。',
          ],
        },
      ],
    },

    profile: {
      title: 'プロフィール',
      futureTitle: '将来の計画',
      routineTitle: '日課',
      musicTitle: '現在の音楽ループ',
      stats: [
        'コーディング時間',
        '見たアニメ',
        '見た映画',
        '音楽ジャンル',
        '遊んだゲーム',
        '作成したプロジェクト',
        '参加したハッカソン',
        '取得した証明書',
        '読んだ本',
        '達成した課題',
      ],
      futurePlans: [
        'サイバーセキュリティに登録する。',
        'Python を極める。',
        'C# を極める。',
        'C ++ の知識を広げる。',
        'さらに10以上のプロジェクトを公開する。',
        '仕事を探す。',
        'ロントノ山に登る。',
        'シェラビーチを訪れる。',
        'ナイロビ・スネークパークを訪れる。',
        'ンゴングヒルズに登る。',
        'キジャベヒルズに登る。',
        'マンダビーチを訪れる。',
        'キワユ島で群島を見るために訪れる。',
        'ダイヤモンズ・マリンディを訪れる。',
        '25件以上のハッカソンイベントに参加する。',
        '幸せでいる。',
      ],
      routineRows: [
        ['6:00 AM', '起床'],
        ['8:00 AM', '学校/仕事'],
        ['5:00 PM', 'ジム'],
        ['6:00 PM', 'コードを書く'],
        ['12:00 PM', '音楽とアニメ'],
        ['13:00 PM', '睡眠'],
      ],
    },

    footer: {
      headingHTML: 'プロフィールをご覧いただき<br /><span>ありがとうございます。</span>',
      signoff: '© Meshack Kiboma @2026',
    },

    galleryTerms: {
      kicker: 'ギャラリー利用規約',
      text: 'ギャラリーに入ることで、これらの個人的な画像を敬意を持って閲覧することに同意したものとみなされます。許可なく共有しないでください。',
      agree: '規約に同意します。',
    },

    gallery: {
      title: 'ギャラリー',
      imagesTitle: '画像',
      closeAria: 'ギャラリー画像ポップアップを閉じる',
      cards: ['Saint', 'ウェストコースト', 'Galerie'],
      alts: ['Saint のカバー画像', 'West Coast のカバー画像', 'BlackBird のカバー画像'],
      coverCaption: '表紙',
    },
  },
};

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getTextNode(element) {
  if (!element) return null;
  return (
    [...element.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0,
    ) || null
  );
}

async function typeChunks(node, chunks, delay = 200) {
  if (!node) return;

  node.textContent = '';

  for (let i = 0; i < chunks.length; i += 1) {
    node.textContent += chunks[i];
    if (i < chunks.length - 1) {
      await sleep(delay);
    }
  }
}

function getPage(language = selectedLanguage) {
  return translations[language] || translations.English;
}

function getGalleryItem(key) {
  return galleryData.find((item) => item.key === key) || galleryData[0];
}

function getLocalizedGalleryTitle(key, language = selectedLanguage) {
  const page = getPage(language);
  const map = {
    saint: page.gallery.cards[0],
    'west-coast': page.gallery.cards[1],
    blackbird: page.gallery.cards[2],
  };
  return map[key] || page.gallery.cards[0];
}

function getLocalizedGalleryAlt(key, language = selectedLanguage) {
  const page = getPage(language);
  const map = {
    saint: page.gallery.alts[0],
    'west-coast': page.gallery.alts[1],
    blackbird: page.gallery.alts[2],
  };
  return map[key] || page.gallery.alts[0];
}

function renderSubtitle(line, animate = true) {
  if (!letterSubtitle) return;

  const applyLine = () => {
    letterSubtitle.innerHTML = `${line}<br />`;
  };

  if (!animate || reducedMotionQuery.matches) {
    letterSubtitle.style.transition = 'none';
    letterSubtitle.style.opacity = '1';
    letterSubtitle.style.transform = 'none';
    applyLine();
    return;
  }

  letterSubtitle.style.transition = 'opacity 180ms ease, transform 180ms ease';
  letterSubtitle.style.opacity = '0';
  letterSubtitle.style.transform = 'translateY(4px)';

  window.setTimeout(() => {
    applyLine();
    letterSubtitle.style.opacity = '1';
    letterSubtitle.style.transform = 'translateY(0)';
  }, 180);
}

function startSubtitleRotation() {
  if (!letterSubtitle) return;

  if (subtitleTimer) {
    window.clearInterval(subtitleTimer);
    subtitleTimer = null;
  }

  const page = getPage();
  const lines = page.letter.subtitleLines;

  let index = 0;
  renderSubtitle(lines[index], false);

  subtitleTimer = window.setInterval(() => {
    index = (index + 1) % lines.length;
    renderSubtitle(lines[index], true);
  }, 1000);
}

function applyLocalizedPageTranslations(language) {
  const page = getPage(language);

  document.documentElement.lang = LANGUAGE_CODES[language] || 'en';
  document.title = page.documentTitle;

  if (languageLabel) languageLabel.textContent = page.languageLabel;

  navLinks.forEach((link) => {
    if (link.dataset.tab === 'professional') link.textContent = page.navProfessional;
    if (link.dataset.tab === 'personal') link.textContent = page.navPersonal;
    if (link.dataset.tab === 'contact') link.textContent = page.navContact;
  });

  document.querySelectorAll('.language-select .dropdown-item').forEach((option) => {
    option.classList.toggle('is-selected', option.dataset.language === language);
  });

  const writeTitleTextNode = getTextNode(letterTitle);
  const identityTextNode = getTextNode(letterIdentity);
  const writeButton = openLetterButton;
  const galleryButton = openGalleryTermsButton;
  const messageLabel = document.querySelector('label[for="letterMessage"]');
  const modalKicker = document.querySelector('#letter-modal .modal-kicker');
  const submitButton = letterForm ? letterForm.querySelector('button[type="submit"]') : null;

  if (writeTitleTextNode) writeTitleTextNode.textContent = page.letter.title;
  if (identityTextNode) identityTextNode.textContent = `${page.letter.identityPrefix} `;
  if (letterIdentityStrong) letterIdentityStrong.textContent = page.letter.identityName;
  if (writeButton) writeButton.textContent = page.letter.button;
  if (galleryButton) {
    galleryButton.title = page.letter.galleryButtonTitle;
    galleryButton.setAttribute('aria-label', page.letter.galleryButtonAria);
  }
  if (letterSubtitle) renderSubtitle(page.letter.subtitleLines[0], false);
  if (messageLabel) messageLabel.textContent = page.letter.srLabel;
  if (modalKicker) modalKicker.textContent = page.letter.modalKicker;
  if (letterMessage) letterMessage.placeholder = page.letter.placeholder;
  if (letterCancelButton) letterCancelButton.textContent = page.letter.cancel;
  if (submitButton) submitButton.textContent = page.letter.send;

  const hobbiesTitle = document.querySelector('.hobbies-title');
  const hobbiesIntro = document.querySelector('.hobbies-section .section-heading > p');
  const hobbiesLabel = document.querySelector('.future-plan-label');
  const hobbyItems = [...document.querySelectorAll('.hobbies-list li')];

  if (hobbiesTitle) hobbiesTitle.innerHTML = page.hobbies.headingHTML;
  if (hobbiesIntro) hobbiesIntro.textContent = page.hobbies.intro;
  if (hobbiesLabel) hobbiesLabel.textContent = page.hobbies.label;
  hobbyItems.forEach((li, index) => {
    if (page.hobbies.items[index]) li.textContent = page.hobbies.items[index];
  });

  const componentsTitle = document.querySelector('.components-title');
  const componentCardsMeta = [...document.querySelectorAll('.component-card-meta')];
  if (componentsTitle) componentsTitle.innerHTML = page.components.headingHTML;
  componentCardsMeta.forEach((el, index) => {
    if (page.components.cards[index]) el.textContent = page.components.cards[index];
  });

  const profileTitle = document.querySelector('#profile-title');
  const futureTitle = document.querySelector('#future-title');
  const routineTitle = document.querySelector('#routine-title');
  const musicTitle = document.querySelector('.music-title');

  if (profileTitle) profileTitle.textContent = page.profile.title;
  if (futureTitle) futureTitle.textContent = page.profile.futureTitle;
  if (routineTitle) routineTitle.textContent = page.profile.routineTitle;
  if (musicTitle) musicTitle.textContent = page.profile.musicTitle;

  document.querySelectorAll('.profile-stats .stat-chip span').forEach((span, index) => {
    if (page.profile.stats[index]) span.textContent = page.profile.stats[index];
  });

  document.querySelectorAll('.plan-list li').forEach((li, index) => {
    if (page.profile.futurePlans[index]) li.textContent = page.profile.futurePlans[index];
  });

  document.querySelectorAll('.routine-row').forEach((row, index) => {
    const strong = row.querySelector('strong');
    const span = row.querySelector('span');
    if (page.profile.routineRows[index]) {
      if (strong) strong.textContent = page.profile.routineRows[index][0];
      if (span) span.textContent = page.profile.routineRows[index][1];
    }
  });

  const footerTitle = document.querySelector('.footer-title');
  const footerSignoff = document.querySelector('.footer-signoff');
  if (footerTitle) footerTitle.innerHTML = page.footer.headingHTML;
  if (footerSignoff) footerSignoff.textContent = page.footer.signoff;

  if (componentTitle) componentTitle.textContent = page.components.modalTitle;
  if (componentCategory) componentCategory.textContent = page.components.items[activeComponentIndex]?.title || page.components.modalTitle;
  if (componentPrevButton) componentPrevButton.setAttribute('aria-label', page.components.prevAria);
  if (componentNextButton) componentNextButton.setAttribute('aria-label', page.components.nextAria);
  if (componentCloseButton) componentCloseButton.setAttribute('aria-label', language === 'Japanese' ? 'コンポーネントのポップアップを閉じる' : language === 'Spanish' ? 'Cerrar ventana de componentes' : language === 'Swahili' ? 'Funga dirisha la vipengele' : 'Close components popup');

  const galleryTermsKicker = document.querySelector('#gallery-terms-modal .modal-kicker');
  const galleryTermsText = document.querySelector('.gallery-terms-text');
  const galleryTermsAgree = document.querySelector('.gallery-terms-check span');
  const galleryTitle = document.querySelector('#gallery-title');
  const galleryImagesTitle = document.querySelector('#gallery-images-title');

  if (galleryTermsKicker) galleryTermsKicker.textContent = page.galleryTerms.kicker;
  if (galleryTermsText) galleryTermsText.textContent = page.galleryTerms.text;
  if (galleryTermsAgree) galleryTermsAgree.textContent = page.galleryTerms.agree;
  if (galleryTitle) galleryTitle.textContent = page.gallery.title;
  if (galleryImagesTitle) galleryImagesTitle.textContent = page.gallery.imagesTitle;
  if (galleryImagesCloseButton) galleryImagesCloseButton.setAttribute('aria-label', page.gallery.closeAria);

  document.querySelectorAll('.gallery-card-title').forEach((el, index) => {
    if (page.gallery.cards[index]) el.textContent = page.gallery.cards[index];
  });

  document.querySelectorAll('.gallery-card img').forEach((img, index) => {
    if (page.gallery.alts[index]) img.alt = page.gallery.alts[index];
  });

  renderComponent(activeComponentIndex);
  populateGalleryCovers();
  if (galleryImagesModal && galleryImagesModal.classList.contains('is-open')) {
    renderGalleryImages(activeGalleryKey);
  }
  startSubtitleRotation();
}

function setLanguage(language) {
  selectedLanguage = translations[language] ? language : 'English';

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
  } catch {
    // ignore storage failures
  }

  applyLocalizedPageTranslations(selectedLanguage);
}

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored && translations[stored] ? stored : 'English';
  } catch {
    return 'English';
  }
}

function populateGalleryCovers() {
  galleryCards.forEach((card) => {
    const key = card.dataset.galleryKey || 'saint';
    const item = getGalleryItem(key);
    const img = card.querySelector('[data-gallery-cover]');
    if (!item || !img) return;

    img.src = createGalleryImageData(
      getLocalizedGalleryTitle(key),
      getPage().gallery.coverCaption,
      item.hue,
      0,
      540,
      680,
    );
    img.alt = getLocalizedGalleryAlt(key);
  });
}

function createGalleryImageData(title, caption, hue, variant = 0, width = 640, height = 780) {
  const accent = (hue + variant * 17) % 360;
  const accent2 = (accent + 44) % 360;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="hsl(${accent} 52% 24%)" />
          <stop offset="100%" stop-color="hsl(${accent2} 58% 14%)" />
        </linearGradient>
        <linearGradient id="shine" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.24)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="${Math.round(Math.min(width, height) * 0.05)}" fill="url(#g)" />
      <rect width="${width}" height="${height}" rx="${Math.round(Math.min(width, height) * 0.05)}" fill="url(#shine)" opacity="0.25" />
      <circle cx="${width * 0.78}" cy="${height * 0.2}" r="${Math.min(width, height) * 0.14}" fill="rgba(255,255,255,0.08)" />
      <circle cx="${width * 0.2}" cy="${height * 0.82}" r="${Math.min(width, height) * 0.18}" fill="rgba(0,0,0,0.14)" />
      <text x="50%" y="46%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(width * 0.08)}" font-weight="700" fill="white">${title}</text>
      <text x="50%" y="57%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(width * 0.03)}" font-weight="600" letter-spacing="2" fill="rgba(255,255,255,0.86)">${caption}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderGalleryImages(key) {
  const item = getGalleryItem(key);
  if (!galleryImagesGrid || !item) return;

  const images = Array.isArray(item.images) ? item.images : [];
  const title = getLocalizedGalleryTitle(key);

  galleryImagesGrid.innerHTML = images.length
    ? images
        .map((src, index) => {
          return `
            <figure class="gallery-image-tile">
              <img src="${src}" alt="${title} image ${index + 1}" loading="lazy" />
            </figure>
          `;
        })
        .join('')
    : '';
}

function renderComponent(index) {
  const page = getPage();
  const data = page.components.items[index] || page.components.items[0];
  if (!data) return;

  if (componentCategory) componentCategory.textContent = data.title;
  if (componentTitle) componentTitle.textContent = data.title;
  if (componentSummary) componentSummary.textContent = data.summary;

  if (componentDetails) {
    componentDetails.innerHTML = data.details.map((item) => `<li>${item}</li>`).join('');
  }

  if (componentCounter) {
    componentCounter.textContent = `${index + 1} / ${page.components.items.length}`;
  }

  componentCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === index;
    card.classList.toggle('is-active', isActive);
    card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function normalizeIndex(index) {
  const total = getPage().components.items.length;
  return ((index % total) + total) % total;
}

function moveComponent(step) {
  activeComponentIndex = normalizeIndex(activeComponentIndex + step);
  renderComponent(activeComponentIndex);

  if (componentModal && !componentModal.classList.contains('is-open')) {
    openComponentModal(activeComponentIndex);
  }
}

function setActiveTab(tab) {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.tab === tab);
    if (link.dataset.tab === tab) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (!floatingTabs) return;

  [...floatingTabs.querySelectorAll('.floating-tab')].forEach((link) => {
    link.classList.toggle('is-active', link.dataset.tab === tab);
    if (link.dataset.tab === tab) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function openDropdown(selectEl) {
  const trigger = selectEl.querySelector('.language-trigger');
  const dropdown = selectEl.querySelector('.dropdown');
  if (!trigger || !dropdown) return;

  dropdown.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
}

function closeDropdown(selectEl) {
  const trigger = selectEl.querySelector('.language-trigger');
  const dropdown = selectEl.querySelector('.dropdown');
  if (!trigger || !dropdown) return;

  dropdown.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
}

function closeAllDropdowns(except = null) {
  dropdownParents.forEach((selectEl) => {
    if (selectEl !== except) closeDropdown(selectEl);
  });
}

function bindDropdownInteractions() {
  dropdownParents.forEach((selectEl) => {
    const trigger = selectEl.querySelector('.language-trigger');
    const dropdown = selectEl.querySelector('.dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.contains('is-open');
      closeAllDropdowns(selectEl);
      if (!isOpen) openDropdown(selectEl);
    });

    dropdown.addEventListener('click', (event) => {
      const item = event.target.closest('.dropdown-item');
      if (!item) return;

      const language = item.dataset.language;
      if (language) setLanguage(language);

      closeDropdown(selectEl);
    });
  });
}

function bindOutsideClicks() {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-select]')) closeAllDropdowns();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllDropdowns();

      if (galleryImagesModal && galleryImagesModal.classList.contains('is-open')) {
        closeGalleryImages();
        return;
      }

      if (galleryTermsModal && galleryTermsModal.classList.contains('is-open')) {
        closeGalleryTerms();
        return;
      }

      if (galleryModal && galleryModal.classList.contains('is-open')) {
        closeGallery();
        return;
      }

      closeLetterModal();
      closeComponentModal();
    }
  });
}

function initFloatingTabs() {
  if (!floatingTabs) return;

  const header = document.querySelector('.topbar');
  if (!header) return;

  const pageToTab = {
    '': 'personal',
    'index.html': 'professional',
    'personal.html': 'personal',
    'contact.html': 'contact',
  };

  const currentPage = window.location.pathname.split('/').pop() || '';
  const activeTab = pageToTab[currentPage] || 'personal';

  const updateVisibility = () => {
    const rect = header.getBoundingClientRect();
    const headerVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    floatingTabs.hidden = headerVisible;
  };

  let rafId = 0;
  const onScroll = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      updateVisibility();
      rafId = 0;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateVisibility);

  updateVisibility();
  setActiveTab(activeTab);
}

function applyFooterBackground() {
  if (!footerShell || !footerBackgroundImages.length) return;

  const nextBackground = footerBackgroundImages[footerBackgroundIndex];

  footerShell.style.backgroundImage = `url("${nextBackground}")`;
  footerShell.style.backgroundPosition = 'center';
  footerShell.style.backgroundSize = 'cover';
  footerShell.style.backgroundRepeat = 'no-repeat';
  footerShell.style.backgroundColor = '#111';
}

function initFooterBackgroundRotation() {
  if (!footerShell || footerBackgroundTimer) return;

  if (footerPanel) {
    footerPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
    footerPanel.style.borderRadius = '30px';
  }

  applyFooterBackground();

  footerBackgroundTimer = window.setInterval(() => {
    footerBackgroundIndex = (footerBackgroundIndex + 1) % footerBackgroundImages.length;
    applyFooterBackground();
  }, 1000);
}

function openLetterModal() {
  if (!letterModal) return;
  letterModal.classList.add('is-open');
  letterModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');

  window.setTimeout(() => {
    if (letterMessage) letterMessage.focus();
  }, 0);
}

function closeLetterModal() {
  if (!letterModal) return;
  letterModal.classList.remove('is-open');
  letterModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function openComponentModal(index = 0) {
  activeComponentIndex = normalizeIndex(index);
  renderComponent(activeComponentIndex);

  if (!componentModal) return;
  componentModal.classList.add('is-open');
  componentModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeComponentModal() {
  if (!componentModal) return;
  componentModal.classList.remove('is-open');
  componentModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function openGalleryTerms() {
  if (galleryAgreed) {
    openGallery();
    return;
  }

  if (!galleryTermsModal) return;

  if (galleryImagesModal) {
    galleryImagesModal.classList.remove('is-open');
    galleryImagesModal.setAttribute('aria-hidden', 'true');
  }

  if (galleryModal) {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
  }

  body.classList.remove('modal-open');

  galleryTermsModal.classList.add('is-open');
  galleryTermsModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');

  if (galleryTermsCheckbox) {
    galleryTermsCheckbox.checked = false;
    window.setTimeout(() => galleryTermsCheckbox.focus(), 0);
  }
}

function closeGalleryTerms() {
  if (!galleryTermsModal) return;
  galleryTermsModal.classList.remove('is-open');
  galleryTermsModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function openGallery() {
  if (!galleryModal) return;
  if (galleryImagesModal && galleryImagesModal.classList.contains('is-open')) {
    galleryImagesModal.classList.remove('is-open');
    galleryImagesModal.setAttribute('aria-hidden', 'true');
  }

  galleryCards.forEach((card) => {
    card.classList.toggle('is-active', card.dataset.galleryKey === activeGalleryKey);
  });

  galleryModal.classList.add('is-open');
  galleryModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
  closeGalleryTerms();
}

function closeGallery() {
  if (!galleryModal) return;
  galleryModal.classList.remove('is-open');
  galleryModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function openGalleryImages(key) {
  const item = getGalleryItem(key);
  if (!item || !galleryImagesModal) return;

  activeGalleryKey = item.key;
  renderGalleryImages(activeGalleryKey);

  if (galleryModal) {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
  }

  galleryImagesModal.classList.add('is-open');
  galleryImagesModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeGalleryImages() {
  if (!galleryImagesModal) return;
  galleryImagesModal.classList.remove('is-open');
  galleryImagesModal.setAttribute('aria-hidden', 'true');

  if (galleryModal) {
    openGallery();
  } else {
    body.classList.remove('modal-open');
  }
}

function handleLetterSubmit(event) {
  event.preventDefault();

  const message = String(letterMessage?.value || '').trim();
  if (!message) {
    if (letterMessage) letterMessage.reportValidity();
    return;
  }

  const page = getPage();
  const subject = page.letter.subject;
  const bodyText = [
    page.letter.bodyPrefix,
    '',
    message,
    '',
    page.letter.bodySuffix,
  ].join('\n');

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  closeLetterModal();
  window.location.href = mailto;
}

function bindModalInteractions() {
  if (openLetterButton) openLetterButton.addEventListener('click', openLetterModal);
  if (openGalleryTermsButton) openGalleryTermsButton.addEventListener('click', openGalleryTerms);
  if (letterCloseButton) letterCloseButton.addEventListener('click', closeLetterModal);
  if (letterCancelButton) letterCancelButton.addEventListener('click', closeLetterModal);

  if (letterModal) {
    letterModal.addEventListener('click', (event) => {
      if (event.target === letterModal) closeLetterModal();
    });
  }

  if (letterForm) {
    letterForm.addEventListener('submit', handleLetterSubmit);
  }

  if (galleryTermsCheckbox) {
    galleryTermsCheckbox.addEventListener('change', () => {
      if (!galleryTermsCheckbox.checked) return;
      galleryAgreed = true;
      closeGalleryTerms();
      openGallery();
    });
  }

  if (galleryTermsModal) {
    galleryTermsModal.addEventListener('click', (event) => {
      if (event.target === galleryTermsModal) closeGalleryTerms();
    });
  }

  if (galleryCards.length) {
    galleryCards.forEach((card) => {
      card.addEventListener('click', () => {
        const key = card.dataset.galleryKey || 'saint';
        activeGalleryKey = key;
        openGalleryImages(key);
      });
    });
  }

  if (galleryImagesCloseButton) {
    galleryImagesCloseButton.addEventListener('click', closeGalleryImages);
  }

  if (galleryImagesModal) {
    galleryImagesModal.addEventListener('click', (event) => {
      if (event.target === galleryImagesModal) closeGalleryImages();
    });
  }

  if (componentCloseButton) {
    componentCloseButton.addEventListener('click', closeComponentModal);
  }

  if (componentModal) {
    componentModal.addEventListener('click', (event) => {
      if (event.target === componentModal) closeComponentModal();
    });
  }

  if (componentPrevButton) {
    componentPrevButton.addEventListener('click', () => moveComponent(-1));
  }

  if (componentNextButton) {
    componentNextButton.addEventListener('click', () => moveComponent(1));
  }

  componentCards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = Number(card.dataset.componentIndex || 0);
      openComponentModal(index);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!componentModal.classList.contains('is-open') && !letterModal.classList.contains('is-open')) return;

    if (event.key === 'ArrowLeft' && componentModal.classList.contains('is-open')) {
      moveComponent(-1);
    }

    if (event.key === 'ArrowRight' && componentModal.classList.contains('is-open')) {
      moveComponent(1);
    }
  });
}

function bindNavFeedback() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => setActiveTab(link.dataset.tab || 'personal'));
  });
}

async function animateWriteLetterIntro() {
  if (!letterTitle || !letterIdentity) return;

  const page = getPage();
  const titleNode = getTextNode(letterTitle);
  const identityNode = getTextNode(letterIdentity);

  letterTitle.style.opacity = '1';
  if (letterSubtitle) letterSubtitle.style.opacity = '1';

  if (reducedMotionQuery.matches) {
    if (titleNode) titleNode.textContent = page.letter.title;
    if (identityNode) identityNode.textContent = `${page.letter.identityPrefix} `;
    if (letterIdentityStrong) {
      letterIdentityStrong.style.opacity = '1';
      letterIdentityStrong.textContent = page.letter.identityName;
    }
    renderSubtitle(page.letter.subtitleLines[0], false);
    return;
  }

  if (titleNode) titleNode.textContent = '';
  if (identityNode) identityNode.textContent = '';
  if (letterIdentityStrong) letterIdentityStrong.style.opacity = '0';

  await typeChunks(titleNode, [...page.letter.title], 120);
  await typeChunks(identityNode, [...`${page.letter.identityPrefix} `], 90);

  if (letterIdentityStrong) {
    letterIdentityStrong.textContent = page.letter.identityName;
    letterIdentityStrong.style.opacity = '1';
  }
}


/* ===================== CURTAIN TRANSITION ===================== */
function createCurtain() {
  if (document.querySelector('.curtain-transition')) return;

  const curtain = document.createElement('div');
  curtain.className = 'curtain-transition closed';

  const left = document.createElement('div');
  left.className = 'curtain-panel left';

  const right = document.createElement('div');
  right.className = 'curtain-panel right';

  const seam = document.createElement('div');
  seam.className = 'curtain-seam';

  curtain.appendChild(left);
  curtain.appendChild(right);
  curtain.appendChild(seam);

  document.body.appendChild(curtain);

  requestAnimationFrame(() => {
    curtain.classList.remove('closed');
    curtain.classList.add('open');
  });

  setTimeout(() => {
    curtain.remove();
  }, 750);
}

function closeCurtainAndNavigate(url) {
  const curtain = document.createElement('div');
  curtain.className = 'curtain-transition closed';

  const left = document.createElement('div');
  left.className = 'curtain-panel left';

  const right = document.createElement('div');
  right.className = 'curtain-panel right';

  const seam = document.createElement('div');
  seam.className = 'curtain-seam';

  curtain.appendChild(left);
  curtain.appendChild(right);
  curtain.appendChild(seam);

  document.body.appendChild(curtain);

  requestAnimationFrame(() => {
    curtain.classList.add('closed');
  });

  setTimeout(() => {
    window.location.href = url;
  }, 700);
}

function bindCurtainNavigation() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      if (!url) return;

      e.preventDefault();
      closeCurtainAndNavigate(url);
    });
  });

  const languageButtons = document.querySelectorAll('[data-language]');
  languageButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        closeCurtainAndNavigate(window.location.href);
      }, 20);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createCurtain();
  bindCurtainNavigation();
});
/* ===================== END CURTAIN TRANSITION ===================== */
function init() {
  bindDropdownInteractions();
  bindOutsideClicks();
  bindNavFeedback();
  initFloatingTabs();
  initFooterBackgroundRotation();
  bindModalInteractions();
  populateGalleryCovers();
  renderComponent(0);

  const savedLanguage = getStoredLanguage();
  setLanguage(savedLanguage);
  setActiveTab('personal');
  animateWriteLetterIntro();
}

init();
