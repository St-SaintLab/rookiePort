const body = document.body;
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
const navLinks = [...document.querySelectorAll('.topbar .nav-link')];
const heroName = document.querySelector('[data-hero-name]');
const nameUnderline = document.querySelector('.name-underline');
const statsRow = document.querySelector('.stats-row');
const statCards = [...document.querySelectorAll('[data-stat]')];
const languageSelect = document.querySelector('.language-select');
const cvSelect = document.querySelector('.cv-select');
const dropdownParents = [...document.querySelectorAll('[data-select]')];
const languageLabel = document.querySelector('[data-language-label]');
const languageCopy = document.querySelector('[data-language-copy]');
const cvModal = document.getElementById('cv-modal');
const cvTitle = document.getElementById('cv-title');
const cvPreview = document.getElementById('cv-preview');
const skillRows = [...document.querySelectorAll('.skill-row')];
const skillCards = [...document.querySelectorAll('.skill-card')];
const projectCards = [...document.querySelectorAll('.project-card')];
const journeySection = document.querySelector('.journey-section');
const journeyStage = document.querySelector('[data-journey-stage]');
const journeyCards = [...document.querySelectorAll('[data-report-card]')];
const skillAnimationTimers = new WeakMap();
let projectRotationTimer = null;
let journeyRafId = 0;
const skillModal = document.getElementById('skills-modal');
const skillModalTitle = document.getElementById('skills-modal-title');
const skillModalBody = document.querySelector('[data-skill-modal-body]');
const skillModalIcon = document.querySelector('[data-skill-modal-icon]');
const heroNameText = document.querySelector('.name');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroNameChunks = ['M', 'E', 'S', 'H', 'A', 'C', 'K ', 'K', 'I', 'B', 'O', 'M', 'A'];

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function typeChunks(element, chunks, delay = 200) {
  if (!element) return;
  element.textContent = '';
  for (let i = 0; i < chunks.length; i += 1) {
    element.textContent += chunks[i];
    if (i < chunks.length - 1) {
      await sleep(delay);
    }
  }
}

async function animateHeroName() {
  if (!heroNameText) return;
  heroNameText.style.opacity = '1';
  if (reducedMotionQuery.matches) {
    heroNameText.textContent = 'MESHACK KIBOMA';
    return;
  }
  await typeChunks(heroNameText, heroNameChunks, 200);
}

if (heroNameText) {
  heroNameText.textContent = '';
  heroNameText.style.opacity = '0';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateHeroName, { once: true });
} else {
  animateHeroName();
}

const state = {
  particles: [],
  dpr: Math.min(window.devicePixelRatio || 1, 2),
  width: 0,
  height: 0,
  activeTab: 'professional',
  selectedLanguage: 'English',
  selectedCv: 'English CV',
};

// CV content and file paths
const cvContent = {
  'English CV': {
    title: 'English Curriculum Vitae',
    body: `
      <h4>Meshack Kiboma</h4>
      <p>| Full-Stack Developer | Jr Software Engineer | Game Dev | Cryptographer |</p>
      <ul>
        <li>Experience: 2+ years</li>
        <li>Projects worked on: 19+</li>
        <li>Primary Focus: Backend Development</li>
      </ul>
      <p><strong>Core stack:</strong> Python, React, React Native, Node.js, Express, Python, Flask, C#, .NET, Blazor Server, SQL, REST APIs, Socket.IO, Git/GitHub, CI/CD, JavaScript, TypeScript, HTML, CSS.</p>
      <p><strong>Highlights:</strong> Responsive Interfaces, Maintainable Backend Services, Integrations, and Production Deployment Discipline.</p>
    `,
    files: {
      word: 'assets/EnglishCV.docx',
      pdf: 'assets/EnglishCV.pdf',
    },
  },
  'Swahili CV': {
    title: 'Swahili Curriculum Vitae',
    body: `
      <h4>Meshack Kiboma</h4>
      <p>| Msanidi wa Full-Stack | Mhandisi Mdogo wa Programu | Utengenezaji wa Michezo za video | Mtaalamu wa Usimbaji |</p>
      <ul>
        <li>Uzoefu: Zaidi ya miaka 2</li>
        <li>Miradi iliyofanyiwa kazi: Zaidi ya 19</li>
        <li>Lengo Kuu: Usanidi wa Backend</li>
      </ul>
      <p><strong>Teknolojia kuu:</strong> Python, React, React Native, Node.js, Express, Flask, C#, .NET, Blazor Server, SQL, REST APIs, Socket.IO, Git/GitHub, CI/CD, JavaScript, TypeScript, HTML, CSS.</p>
      <p><strong>Mambo muhimu:</strong> Miingiliano msikivu, huduma za backend zinazodumika kirahisi, uunganishaji wa mifumo, na nidhamu ya utoaji wa programu kwenye mazingira ya uzalishaji.</p>
    `,
    files: {
      word: 'assets/Swahili CV.docx',
      pdf: 'assets/Swahili CV.pdf',
    },
  },
  'Spanish CV': {
    title: 'Spanish Curriculum Vitae',
    body: `
      <h4>Meshack Kiboma</h4>
      <p>| Desarrollador Full-Stack | Ingeniero de Software Junior | Desarrollo de Videojuegos | Criptógrafo |</p>
      <ul>
        <li>Experiencia: más de 2 años</li>
        <li>Proyectos en los que ha trabajado: más de 19</li>
        <li>Enfoque principal: Desarrollo backend</li>
      </ul>
      <p><strong>Stack principal:</strong> Python, React, React Native, Node.js, Express, Flask, C#, .NET, Blazor Server, SQL, APIs REST, Socket.IO, Git/GitHub, CI/CD, JavaScript, TypeScript, HTML, CSS.</p>
      <p><strong>Fortalezas:</strong> Interfaces Responsivas, Servicios Backend Mantenibles, Integraciones y disciplina en despliegue a producción.</p>
    `,
    files: {
      word: 'assets/Spanish CV.docx',
      pdf: 'assets/Spanish CV.pdf',
    },
  },
  'Japanese CV': {
    title: 'Japanese Curriculum Vitae',
    body: `
      <h4>Meshack Kiboma</h4>
      <p>| フルスタック開発者 | ジュニアソフトウェアエンジニア | ゲーム開発者 | 暗号技術 |</p>
      <ul>
        <li>経験: 2年以上</li>
        <li>関わったプロジェクト: 19件以上</li>
        <li>主な注力分野: バックエンド開発</li>
      </ul>
      <p><strong>コアスタック:</strong> Python, React, React Native, Node.js, Express, Flask, C#, .NET, Blazor Server, SQL, REST API, Socket.IO, Git/GitHub, CI/CD, JavaScript, TypeScript, HTML, CSS.</p>
      <p><strong>実績:</strong> レスポンシブなUI、保守性の高いバックエンドサービス、各種連携機能、そして本番環境への安定したデプロイ運用</p>
    `,
    files: {
      word: 'assets/Japanese CV.docx',
      pdf: 'assets/Japanese CV.pdf',
    },
  },
};

const projectImageMap = {
  'novara estates': {
    src: 'https://cdn.imgtree.co/images/hpazr5U2.png',
    alt: 'Novara Estates image',
  },
  calc: {
    src: 'https://cdn.imgtree.co/images/9F8IWvth.png',
    alt: 'Calc image',
  },
  'dice arena': {
    src: 'https://cdn.imgtree.co/images/riTiCnN-.png',
    alt: 'Dice Arena image',
  },
  'endless runner': {
    src: 'https://cdn.imgtree.co/images/VassTYFz.png',
    alt: 'Endless Runner image',
  },
};

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const LANGUAGE_CODES = {
  English: 'en',
  Swahili: 'sw',
  Spanish: 'es',
  Japanese: 'ja',
};

const translations = {
  English: {
    documentTitle: '</.kiboma> Portfolio',
    heroSummary: '| Full-Stack Developer | Jr Software Engineer | Game Dev | Cryptographer |',
    heroParagraph:
      'I bring a detail-oriented mindset and a strong passion for building purposeful digital solutions. With a primary focus on backend development, I specialize in creating robust, efficient, and scalable systems that turn ideas into reality. Alongside my software engineering journey, I also bring foundational game development skills and a growing interest in designing interactive experiences that are both functional and memorable.',
    heroCta: 'View CV',
  },
  Swahili: {
    documentTitle: '</.kiboma> Portfolio',
    heroSummary: '| Msanidi wa Full-Stack | Mhandisi Mdogo wa Programu | Utengenezaji wa Michezo za video | Mtaalamu wa Usimbaji |',
    heroParagraph:
      'Ninaleta mtazamo wa umakini kwa maelezo na shauku kubwa ya kujenga suluhisho za kidijitali zenye maana. Kwa kuzingatia zaidi maendeleo ya backend, ninajikita katika kuunda mifumo imara, yenye ufanisi, na inayopanuka kirahisi ambayo hubadilisha mawazo kuwa ukweli. Sambamba na safari yangu ya uhandisi wa programu, pia nina ujuzi wa msingi wa game development na hamu inayokua ya kubuni uzoefu wa mwingiliano unaofanya kazi vizuri na kukumbukwa.',
    heroCta: 'Tazama CV',
  },
  Spanish: {
    documentTitle: '</.kiboma> Portfolio',
    heroSummary: '| Desarrollador Full-Stack | Ingeniero de Software Junior | Desarrollo de Videojuegos | Criptógrafo |',
    heroParagraph:
      'Aporto una mentalidad orientada al detalle y una fuerte pasión por construir soluciones digitales con propósito. Con un enfoque principal en el desarrollo backend, me especializo en crear sistemas robustos, eficientes y escalables que convierten ideas en realidad. Además de mi trayectoria en ingeniería de software, también cuento con habilidades básicas en desarrollo de videojuegos y un interés creciente en diseñar experiencias interactivas funcionales y memorables.',
    heroCta: 'Ver CV',
  },
  Japanese: {
    documentTitle: '</.kiboma> Portfolio',
    heroSummary: '| フルスタック開発者 | ジュニアソフトウェアエンジニア | ゲーム開発者 | 暗号技術 |',
    heroParagraph:
      '私は細部にこだわる姿勢と、目的のあるデジタルソリューションを構築する強い情熱を持っています。特にバックエンド開発に重点を置き、アイデアを現実に変える堅牢で効率的、かつ拡張性の高いシステムを作ることを得意としています。ソフトウェアエンジニアとしての学びに加えて、ゲーム開発の基礎スキルも持ち、機能的で記憶に残るインタラクティブな体験を設計することにも関心を深めています。',
    heroCta: 'CVを見る',
  },
};

const localizedPageTranslations = {
  Swahili: {
    heroTitle: 'Jambo Dunia!',
    heroLead: 'Naitwa',
    heroCta: 'Tazama CV',
    skillsHeading: 'USTADI',
    skillModalKicker: 'Mgawanyo wa Ujuzi',
    skillTitles: ['Lugha', 'Mifumo ya Seva', 'Mifumo ya Mbele', 'Zana na Muunganisho'],
    skillViewLabel: 'tazama',
    statLabels: ['Miaka ya uzoefu', 'Miradi niliyohusika', 'Miradi ya Backend', 'Miradi ya Frontend'],
    educationTitle: 'Elimu',
    degreeCards: [
      { badge: 'Imethibitishwa', title: 'Msanidi wa Full-Stack', score: 'Ubora' },
      { badge: 'Imethibitishwa', title: 'Usalama wa Mtandao', score: 'TBT' },
    ],
    certTitles: [
      'Python',
      'Foundational C# with Microsoft',
      'Relational Database',
      'JavaScript',
      'Responsive Web Design',
      'Legacy Responsive Web Design',
      'Cryptography & Neywork Security',
      'Descrete Structures',
      'Information Security',
      'Bitcoin For Developers',
      'Software Engineering',
      'Modern Database Sytems',
    ],
    projectsTitle: 'Miradi Iliyochaguliwa',
    projectKickers: ['Programu ya Wavuti', 'Mchezo wa Wavuti', 'Tovuti', 'Mchezo wa Wavuti'],
    projectDescriptions: [
      'Calc ni kikokotoo cha kisayansi cha full-stack chenye backend ya Flask na kiolesura kinachochorwa kwa canvas. Hukadiria misemo kwa usalama kwa kutumia parser ya AST iliyobinafsishwa, ikisaidia trigonometry, vipande, na ubadilishaji wa uandishi. Kiolesura kina nafasi za kumbukumbu za kipindi, saa ya moja kwa moja, na hali za vitufe zenye hisia ya kugusa - yote yamejengwa kwa JavaScript na Python ya kawaida kuonyesha ukokotoaji salama wa hisabati na muundo maridadi, msikivu ndani ya kipande kifupi cha wasifu.',
      'Mchezo wa kete wa casino wa Blazor Server wenye kete za 3D canvas, hali tatu za kucheza, kijenzi maalum cha kete, ubao wa viongozi, na sauti ya kuzama ndani.',
      'Novara Estates ni mradi wa kisasa wa mali isiyohamishika ulioundwa kuonyesha nyumba za hadhi kupitia kiolesura safi, msikivu, na matumizi rahisi ya mtumiaji. Ulitengenezwa kuwasilisha matangazo kitaalamu huku ukifanya uvinjari wa mali uwe rahisi, wa kuvutia, na wenye mvuto wa kuona kwa wateja watarajiwa.',
      'Mchezo wa wavuti wa endless runner unaovutia ulioundwa kwa kiolesura laini, msikivu, na mekanika za uchezaji zinazobadilika. Mradi huu unaangazia mwingiliano wa kasi, taswira safi, na uzoefu wa kufurahisha kwa watumiaji kwenye vifaa tofauti.',
    ],
    experienceTitleHtml: 'Mimi <span>Uzoefu</span>',
    experienceTitles: ['Mhandisi wa Frontend', 'Mhandisi wa Backend', 'Mwanatimu', 'Mtarajiwa wa DevOps'],
    experienceDescriptions: [
      'Niliiongoza utekelezaji wa miradi mingi kama kiongozi wa timu na nikatengeneza kiolesura cha mnada wa wakati halisi huku nikiendelea kuboresha uzoefu wa mtumiaji na pia kukuza ujuzi wangu.',
      'Nilibuni na kujenga mifumo ya monolithic na microservices salama kulingana na ISO ambapo biashara zimekuwa zikiendeshwa.',
      'Nilifanya kazi na wadau kuendeleza mifumo ya kubadilishana. Niliiongoza timu ya maendeleo, na nikatekeleza miradi kwa mafanikio.',
      'Nimehudumia mifumo mingi katika uzalishaji na kwa sasa ninajiandaa kwa vyeti vya Red Hat na AWS Solutions Architect.',
    ],
    journeyTitle: 'Ripoti ya Safari Yangu',
    journeyDescription:
      'Nimepata fursa ya kutengeneza programu katika mazingira mbalimbali - kuanzia miradi midogo ya ziada hadi kampuni kubwa, hasa nikijenga mifumo ya kifedha. Huu ndio mstari wa muda wa safari yangu.',
    journeyYears: ['Mapema 2026', 'Mwisho wa 2025', 'Katikati ya 2025', 'Mapema 2025', 'Kabla ya 2025'],
    journeyTexts: [
      'Niliweka mkazo katika kujenga msingi imara wa kiufundi kwa kukuza ujuzi wa msingi wa utengenezaji wa michezo na kujiandikisha katika kozi ya Certified Cybersecurity. Pia nilishiriki katika maendeleo ya miradi ya backend na kuhudhuria hackathon, jambo lililonisaidia kupata uzoefu wa vitendo, kuboresha uwezo wangu wa kutatua matatizo, na kuimarisha kazi ya pamoja katika mazingira halisi ya kiufundi.',
      'Nilipanua maarifa yangu kwa kujiandikisha katika kozi mpya, ikiwemo C# with Microsoft, ili kuimarisha msingi wangu wa upangaji programu. Pia nilishiriki katika kujenga miradi ya backend na kuchunguza utengenezaji wa michezo, nikipata uzoefu wa vitendo katika maeneo mbalimbali ya maendeleo ya programu.',
      'Niliweka mkazo katika kupanua msingi wangu wa kiufundi kwa kujiandikisha katika kozi kama Python, Relational Databases, na Back-End Development and APIs. Wakati huohuo, nilitoa miradi ya backend, nikipata uzoefu wa vitendo katika kujenga na kuwasilisha suluhisho za upande wa seva zinazotegemeka. Kipindi hiki kiliimarisha maarifa yangu na uwezo wangu wa kuyatumia katika kazi halisi ya maendeleo.',
      'Niliweka mkazo katika kupanua ujuzi wangu wa kiufundi kwa kujiandikisha katika kozi kama Python na Back-End Development and APIs. Sambamba na kujifunza, nilitoa miradi ya backend, nikipata uzoefu wa vitendo katika kujenga na kuzindua mifumo inayofanya kazi. Kipindi hiki kiliimarisha uelewa wangu wa maendeleo ya programu na uwezo wangu wa kuyatumia katika miradi halisi. Pia niliweka mkazo katika kupanua ujuzi wangu wa frontend kwa kujiandikisha katika kozi kama JavaScript na Responsive Web Design, nikiongeza uelewa wangu wa maendeleo ya kisasa ya upande wa mbele. Wakati huohuo, nilitoa pia miradi kadhaa ya frontend, nikitumia nilichojifunza katika kazi halisi na kuboresha uwezo wangu wa kuunda miingiliano inayofanya kazi, msikivu, na rafiki kwa mtumiaji.',
      'Nimekuwa nikipenda sana kompyuta na upangaji programu kila wakati, hata kabla sijapata nafasi ya kupata cheti rasmi. Maarifa yangu mengi ya msingi yalitokana na kujisomea kupitia mafunzo ya YouTube, ambako nilijenga ufahamu thabiti wa misingi na kukuza shauku kubwa katika teknolojia na maendeleo ya programu.',
    ],
  },
  Spanish: {
    heroTitle: '¡Hola, mundo!',
    heroLead: 'Nombre ',
    heroCta: 'Ver CV',
    skillsHeading: 'HABILIDADES',
    skillModalKicker: 'Desglose de habilidades',
    skillTitles: ['Lenguajes', 'Frameworks de backend', 'Frameworks de frontend', 'Herramientas e integración'],
    skillViewLabel: 'ver',
    statLabels: ['Años de experiencia', 'Proyectos en los que participé', 'Proyectos de backend', 'Proyectos de frontend'],
    educationTitle: 'Educación',
    degreeCards: [
      { badge: 'Certificado', title: 'Desarrollador Full-Stack', score: 'Excelencia' },
      { badge: 'Certificado', title: 'Ciberseguridad', score: 'TBT' },
    ],
    certTitles: [
      'Python',
      'Foundational C# with Microsoft',
      'Relational Database',
      'JavaScript',
      'Responsive Web Design',
      'Legacy Responsive Web Design',
      'Cryptography & Neywork Security',
      'Descrete Structures',
      'Information Security',
      'Bitcoin For Developers',
      'Software Engineering',
      'Modern Database Sytems',
    ],
    projectsTitle: 'Proyectos seleccionados',
    projectKickers: ['Aplicación web', 'Juego web', 'Sitio web', 'Juego web'],
    projectDescriptions: [
      'Calc es una calculadora científica full-stack con backend de Flask e interfaz renderizada en canvas. Evalúa expresiones de forma segura mediante un analizador AST personalizado, con soporte para trigonometría, fracciones y conversión de notación. La interfaz incluye ranuras de memoria de sesión, un reloj en vivo y estados táctiles de botones, todo construido con JavaScript y Python vanilla para demostrar evaluación matemática segura y un diseño pulido y adaptable en una pieza compacta de portafolio.',
      'Juego de dados de casino en Blazor Server con dados 3D en canvas, tres modos, creador de dados personalizado, tabla de clasificación y audio inmersivo.',
      'Novara Estates es un proyecto inmobiliario moderno creado para mostrar propiedades premium mediante una interfaz limpia, adaptable e intuitiva. Se diseñó para presentar los listados de forma profesional, haciendo que la exploración de propiedades sea simple, atractiva y visualmente agradable para los clientes potenciales.',
      'Un atractivo juego web endless runner construido con una interfaz fluida y adaptable, y mecánicas de juego dinámicas. El proyecto se centra en la interacción rápida, las imágenes limpias y una experiencia agradable en distintos dispositivos.',
    ],
    experienceTitleHtml: 'Mi <span>Experiencia</span>',
    experienceTitles: ['Ingeniero Frontend', 'Ingeniero Backend', 'Compañero de equipo', 'Aspirante a DevOps'],
    experienceDescriptions: [
      'Lideré la implementación de múltiples proyectos como líder de equipo y desarrollé una interfaz de subastas en tiempo real mientras refinaba continuamente la experiencia de usuario y ampliaba mis habilidades.',
      'Diseñé y construí sistemas monolíticos y de microservicios seguros bajo ISO, donde se han ejecutado operaciones.',
      'Trabajé con las partes interesadas para desarrollar sistemas de intercambio. Lideré el equipo de desarrollo y desplegué proyectos con éxito.',
      'He mantenido múltiples sistemas en producción y actualmente me preparo para las certificaciones Red Hat y AWS Solutions Architect.',
    ],
    journeyTitle: 'Mi informe de trayectoria',
    journeyDescription:
      'He tenido la oportunidad de desarrollar software en una variedad de entornos, desde trabajos secundarios pequeños hasta grandes corporaciones, construyendo principalmente sistemas financieros. Esta es la línea de tiempo de mi recorrido.',
    journeyYears: ['Principios de 2026', 'Finales de 2025', 'Mitad de 2025', 'Principios de 2025', 'Antes de 2025'],
    journeyTexts: [
      'Me enfoqué en construir una base técnica sólida desarrollando habilidades básicas de desarrollo de videojuegos e inscribiéndome en un curso certificado de ciberseguridad. También participé en el desarrollo de proyectos de backend y asistí a hackathons, lo que me ayudó a adquirir experiencia práctica, mejorar mi capacidad de resolución de problemas y fortalecer mi trabajo en equipo en entornos técnicos reales.',
      'Amplié mis conocimientos inscribiéndome en nuevos cursos, incluido C# con Microsoft, para fortalecer mi base de programación. También participé en la construcción de proyectos backend y exploré el desarrollo de videojuegos, adquiriendo experiencia práctica en distintas áreas del desarrollo de software.',
      'Me centré en ampliar mi base técnica inscribiéndome en cursos como Python, bases de datos relacionales y desarrollo backend y APIs. Al mismo tiempo, desplegué proyectos backend, adquiriendo experiencia práctica en la construcción y entrega de soluciones confiables del lado del servidor. Este período fortaleció tanto mis conocimientos como mi capacidad para aplicarlos en el trabajo de desarrollo real.',
      'Me enfoqué en ampliar mis conocimientos técnicos inscribiéndome en cursos como Python y desarrollo backend y APIs. Al mismo tiempo, desplegué proyectos backend, adquiriendo experiencia práctica en construir y lanzar sistemas funcionales. Este período fortaleció tanto mi comprensión del desarrollo de software como mi capacidad para aplicarlo en proyectos reales. También me enfoqué en ampliar mis habilidades frontend inscribiéndome en cursos como JavaScript y diseño web adaptable, reforzando mi comprensión del desarrollo frontend moderno. Durante ese mismo periodo, también desplegué varios proyectos frontend, aplicando lo aprendido en construcciones reales y mejorando mi capacidad para crear interfaces funcionales, adaptables y amigables para el usuario.',
      'Siempre he sentido pasión por las computadoras y la programación, incluso antes de tener la oportunidad de obtener una certificación formal. La mayor parte de mis conocimientos fundamentales provino del autoaprendizaje a través de tutoriales de YouTube, donde construí una comprensión sólida de lo básico y desarrollé un gran interés por la tecnología y el desarrollo de software.',
    ],
  },
  Japanese: {
    heroTitle: 'こんにちは、',
    heroLead: '私は',
    heroCta: 'CVを見る',
    skillsHeading: 'スキル',
    skillModalKicker: 'スキルの内訳',
    skillTitles: ['言語', 'バックエンドフレームワーク', 'フロントエンドフレームワーク', 'ツールと統合'],
    skillViewLabel: '見る',
    statLabels: ['経験年数', '関わったプロジェクト', 'バックエンドプロジェクト', 'フロントエンドプロジェクト'],
    educationTitle: '学歴',
    degreeCards: [
      { badge: '認定済み', title: 'フルスタック開発者', score: '優秀' },
      { badge: '認定済み', title: 'サイバーセキュリティ', score: 'TBT' },
    ],
    certTitles: [
      'Python',
      'Foundational C# with Microsoft',
      'Relational Database',
      'JavaScript',
      'Responsive Web Design',
      'Legacy Responsive Web Design',
      'Cryptography & Neywork Security',
      'Descrete Structures',
      'Information Security',
      'Bitcoin For Developers',
      'Software Engineering',
      'Modern Database Sytems',
    ],
    projectsTitle: '選定した制作物',
    projectKickers: ['Webアプリ', 'Webゲーム', 'Webサイト', 'Webゲーム'],
    projectDescriptions: [
      'Calcは、Flaskバックエンドとcanvas描画のUIを備えたフルスタックの科学計算機です。カスタムASTパーサーを使って式を安全に評価し、三角関数、分数、表記変換をサポートします。画面にはセッションメモリ、ライブ時計、触覚的なボタン状態があり、すべてバニラJavaScriptとPythonで構築され、安全な数式評価と洗練されたレスポンシブデザインをコンパクトなポートフォリオ作品として示しています。',
      'Blazor Serverによるカジノのダイスゲームで、3D canvasダイス、3つのモード、カスタムダイスビルダー、リーダーボード、没入型オーディオを備えています。',
      'Novara Estatesは、洗練されたレスポンシブなインターフェースと直感的なユーザー体験で高級物件を紹介するために作られたモダンな不動産プロジェクトです。物件一覧をプロフェッショナルに見せながら、見込み客が簡単で魅力的に物件を探せるよう設計されています。',
      '滑らかでレスポンシブなインターフェースと動的なゲームプレイ機構で作られた魅力的なエンドレスランナーWebゲームです。このプロジェクトは、テンポの速い操作、洗練された見た目、そしてデバイスを問わず楽しい体験に重点を置いています。',
    ],
    experienceTitleHtml: '私の <span>経験</span>',
    experienceTitles: ['フロントエンドエンジニア', 'バックエンドエンジニア', 'チームメイト', 'DevOps志望'],
    experienceDescriptions: [
      'チームリーダーとして複数のプロジェクトの展開を主導し、リアルタイムのオークション画面を開発しました。同時にユーザー体験を継続的に改善し、スキルも広げています。',
      'ISO準拠の安全なモノリシックおよびマイクロサービスシステムを設計・構築し、取引が実行される環境を作りました。',
      '利害関係者と協力して交換システムを開発しました。開発チームを率い、プロジェクトを成功裏に展開しました。',
      '複数の本番システムを維持しており、現在はRed HatとAWS Solutions Architectの資格取得に向けて準備しています。',
    ],
    journeyTitle: '私の歩みレポート',
    journeyDescription:
      '小さな副業から大企業まで、さまざまな環境でソフトウェアを開発してきました。主に金融システムを構築してきた私の歩みを、ここにまとめています。',
    journeyYears: ['2026年初頭', '2025年末', '2025年 منتصف', '2025年初頭', '2025年以前'],
    journeyTexts: [
      'ゲーム開発の基礎スキルを伸ばしながら、認定サイバーセキュリティ講座に登録して、強固な技術基盤づくりに注力しました。さらにバックエンド開発プロジェクトやハッカソンにも参加し、実践経験を積み、問題解決力を高め、実世界の技術環境でチームワークを強化できました。',
      'C# with Microsoftを含む新しい講座を受講し、プログラミング基盤を強化しました。あわせてバックエンドプロジェクトの構築やゲーム開発にも取り組み、ソフトウェア開発のさまざまな分野で実践的な経験を積みました。',
      'Python、リレーショナルデータベース、Back-End Development and APIs などの講座を受講し、技術基盤の拡張に力を入れました。同時にバックエンドプロジェクトを展開し、信頼できるサーバーサイドソリューションを構築・提供する実践経験を得ました。この期間で知識と実務への応用力の両方が強化されました。',
      'PythonやBack-End Development and APIsなどの講座を受講し、技術知識の拡充に力を入れました。学習と並行してバックエンドプロジェクトを展開し、機能するシステムを構築して公開する実践経験を得ました。この期間でソフトウェア開発への理解と、現実のプロジェクトへ応用する力が強化されました。同時に、JavaScriptやResponsive Web Designなどの講座でフロントエンドのスキルも広げ、現代的なフロントエンド開発の理解を深めました。その間に複数のフロントエンドプロジェクトも展開し、学んだことを実践しながら、機能的でレスポンシブ、かつ使いやすいUIを作る力を高めました。',
      '正式な資格を取る機会がまだなかった頃から、ずっとコンピュータとプログラミングに情熱を持っていました。基礎知識の多くはYouTubeのチュートリアルでの独学から得ており、基本をしっかり理解し、テクノロジーとソフトウェア開発への強い関心を育てました。',
    ],
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resizeCanvas() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  canvas.width = Math.floor(state.width * state.dpr);
  canvas.height = Math.floor(state.height * state.dpr);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles() {
  const count = clamp(Math.floor((state.width * state.height) / 14500), 96, 154);
  state.particles = Array.from({ length: count }, () => ({
    x: random(0, state.width),
    y: random(0, state.height),
    r: random(1.1, 2.35),
    vx: random(-0.22, 0.22),
    vy: random(-0.18, 0.18),
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, state.width, state.height);
  const glow = ctx.createRadialGradient(
    state.width * 0.3,
    state.height * 0.22,
    20,
    state.width * 0.3,
    state.height * 0.22,
    Math.max(state.width, state.height) * 0.75
  );
  glow.addColorStop(0, 'rgba(205, 214, 255, 0.022)');
  glow.addColorStop(1, 'rgba(205, 214, 255, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, state.width, state.height);

  for (let i = 0; i < state.particles.length; i += 1) {
    const p = state.particles[i];
    for (let j = i + 1; j < state.particles.length; j += 1) {
      const q = state.particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      const threshold = 132;
      if (dist < threshold) {
        const alpha = (1 - dist / threshold) * 0.08;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(205, 214, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  }

  for (const p of state.particles) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(230, 234, 255, 0.48)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -12) p.x = state.width + 12;
    if (p.x > state.width + 12) p.x = -12;
    if (p.y < -12) p.y = state.height + 12;
    if (p.y > state.height + 12) p.y = -12;
  }

  requestAnimationFrame(drawParticles);
}

function setActiveTab(tab) {
  state.activeTab = tab;
  navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.tab === tab));
  const shouldUnderline = tab === 'professional' || tab === 'personal' || tab === 'contact';
  if (heroName) heroName.style.color = 'var(--text)';
  if (nameUnderline) nameUnderline.classList.toggle('is-visible', shouldUnderline);
}

function openDropdown(selectEl) {
  const trigger = selectEl.querySelector('button');
  const dropdown = selectEl.querySelector('.dropdown');
  if (!trigger || !dropdown) return;
  dropdown.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
}

function closeDropdown(selectEl) {
  const trigger = selectEl.querySelector('button');
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

function renderCv(cvName) {
  const cv = cvContent[cvName] || cvContent['English CV'];
  if (!cvTitle || !cvPreview) return;
  cvTitle.textContent = cv.title;
  cvPreview.innerHTML = cv.body;
  state.selectedCv = cvName;
  document.querySelectorAll('.cv-switch-dropdown .dropdown-item').forEach((item) => {
    item.classList.toggle('is-selected', item.dataset.cv === cvName);
  });
}

function openCvModal(cvName) {
  renderCv(cvName);
  cvModal.classList.add('is-open');
  cvModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeCvModal() {
  cvModal.classList.remove('is-open');
  cvModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function downloadFile(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function downloadCurrentCv(format) {
  const cv = cvContent[state.selectedCv];
  if (!cv || !cv.files) return;
  const fileUrl = format === 'word' ? cv.files.word : cv.files.pdf;
  if (fileUrl) downloadFile(fileUrl);
}

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored && translations[stored] ? stored : 'English';
  } catch {
    return 'English';
  }
}

function applyLocalizedPageTranslations(language) {
  const page = localizedPageTranslations[language];
  if (!page) return;

  const heroTitle = document.querySelector('.hero-title');
  const heroLead = document.querySelector('.eyebrov');
  const heroParagraph = document.querySelector('.hero .eyebrow');
  const heroCvButton = document.querySelector('.cv-trigger > span:first-child');
  const cvSwitchButton = document.querySelector('.cv-switch-trigger > span:first-child');
  const cvDownloadButton = document.querySelector('.cv-download-trigger > span:last-child');
  const cancelBtn = cvModal?.querySelector('[data-action="cancel"]');

  if (heroTitle) heroTitle.textContent = page.heroTitle;
  if (heroLead) heroLead.textContent = page.heroLead;
  if (languageCopy) languageCopy.textContent = translations[language].heroSummary;
  if (heroParagraph) heroParagraph.textContent = translations[language].heroParagraph;
  if (heroCvButton) heroCvButton.textContent = page.heroCta;
  if (cvSwitchButton) cvSwitchButton.textContent = language === 'Swahili' ? 'Badili CV' : language === 'Spanish' ? 'Cambiar CV' : 'CVを切り替え';
  if (cvDownloadButton) cvDownloadButton.textContent = language === 'Swahili' ? 'CV Kamili' : language === 'Spanish' ? 'CV completo' : '完全なCV';
  if (cancelBtn) cancelBtn.textContent = language === 'Swahili' ? 'Ghairi' : language === 'Spanish' ? 'Cancelar' : 'キャンセル';

  const skillsHeading = document.querySelector('.skills-head h3');
  const skillModalKicker = document.querySelector('.modal-kicker');
  if (skillsHeading) skillsHeading.textContent = page.skillsHeading;
  if (skillModalKicker) skillModalKicker.textContent = page.skillModalKicker;
  if (skillModalTitle && skillModalTitle.textContent === 'Languages') {
    skillModalTitle.textContent = page.skillTitles[0];
  }

  skillCards.forEach((card, index) => {
    const title = card.querySelector('.skill-name');
    const viewBtn = card.querySelector('[data-skill-view]');
    if (title && page.skillTitles[index]) title.textContent = page.skillTitles[index];
    if (viewBtn) viewBtn.textContent = page.skillViewLabel;
  });

  statCards.forEach((card, index) => {
    const span = card.querySelector('span');
    if (!span || !page.statLabels[index]) return;
    span.textContent = page.statLabels[index];
  });

  const educationTitle = document.querySelector('.education-header .section-title');
  if (educationTitle) educationTitle.textContent = page.educationTitle;

  const degreeCards = [...document.querySelectorAll('.education-grid .degree-card')];
  degreeCards.forEach((card, index) => {
    const t = page.degreeCards[index];
    if (!t) return;
    const badge = card.querySelector('.degree-badge');
    const title = card.querySelector('.degree-title');
    const score = card.querySelector('.degree-score');
    if (badge) badge.textContent = t.badge;
    if (title) title.textContent = t.title;
    if (score) score.textContent = t.score;
  });

  [...document.querySelectorAll('.education-section .cert-title')].forEach((el, index) => {
    if (page.certTitles[index]) el.textContent = page.certTitles[index];
  });

  const projectsTitle = document.querySelector('.projects-title');
  if (projectsTitle) projectsTitle.textContent = page.projectsTitle;

  projectCards.forEach((card, index) => {
    const kicker = card.querySelector('.project-kicker');
    const description = card.querySelector('.project-description');
    if (kicker && page.projectKickers[index]) kicker.textContent = page.projectKickers[index];
    if (description && page.projectDescriptions[index]) description.textContent = page.projectDescriptions[index];
  });

  const experienceTitle = document.querySelector('.experience-title');
  if (experienceTitle) experienceTitle.innerHTML = page.experienceTitleHtml;

  document.querySelectorAll('.experience-card .experience-copy h3').forEach((el, index) => {
    if (page.experienceTitles[index]) el.textContent = page.experienceTitles[index];
  });
  document.querySelectorAll('.experience-card .experience-copy p').forEach((el, index) => {
    if (page.experienceDescriptions[index]) el.textContent = page.experienceDescriptions[index];
  });

  const journeyTitle = document.querySelector('.journey-title');
  const journeyDescription = document.querySelector('.journey-description');
  if (journeyTitle) journeyTitle.textContent = page.journeyTitle;
  if (journeyDescription) journeyDescription.textContent = page.journeyDescription;

  document.querySelectorAll('.journey-section .report-card').forEach((card, index) => {
    const year = card.querySelector('.report-year');
    const text = card.querySelector('.report-text');
    if (year && page.journeyYears[index]) year.textContent = page.journeyYears[index];
    if (text && page.journeyTexts[index]) text.textContent = page.journeyTexts[index];
  });
}

function applyLanguage(language) {
  const selected = translations[language] ? language : 'English';
  const t = translations[selected];
  state.selectedLanguage = selected;

  if (languageLabel) languageLabel.textContent = selected;
  document.documentElement.lang = LANGUAGE_CODES[selected] || 'en';

  const options = [...document.querySelectorAll('.language-select .dropdown-item')];
  options.forEach((option) => option.classList.toggle('is-selected', option.dataset.language === selected));

  if (languageCopy) languageCopy.textContent = t.heroSummary;
  const heroParagraph = document.querySelector('.hero .eyebrow');
  if (heroParagraph) heroParagraph.textContent = t.heroParagraph;
  if (t.documentTitle) document.title = t.documentTitle;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  if (selected !== 'English') {
    applyLocalizedPageTranslations(selected);
  }

  if (cvModal.classList.contains('is-open')) {
    renderCv(`${selected} CV`);
  }
}

function setLanguage(language) {
  const selected = translations[language] ? language : 'English';
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selected);
  } catch {
    // ignore storage failures
  }
  window.location.reload();
}

function restartSkillBars(root) {
  if (!root) return;
  const rows = [...root.querySelectorAll('.skill-row')];
  const previousTimers = skillAnimationTimers.get(root) || [];
  previousTimers.forEach((timerId) => window.clearTimeout(timerId));
  rows.forEach((row) => {
    const percent = Number(row.dataset.percent || 0);
    row.style.setProperty('--percent', String(percent));
    row.classList.remove('is-animated');
  });
  void root.offsetWidth;
  const nextTimers = [];
  window.requestAnimationFrame(() => {
    rows.forEach((row, index) => {
      const timerId = window.setTimeout(() => row.classList.add('is-animated'), 20 + index * 40);
      nextTimers.push(timerId);
    });
    skillAnimationTimers.set(root, nextTimers);
  });
}

function animateSkillBars() {
  skillCards.forEach((card) => restartSkillBars(card));
}

function hydrateSkillBars(root) {
  restartSkillBars(root);
}

function openSkillModal(card) {
  if (!card || !skillModal || !skillModalBody || !skillModalTitle || !skillModalIcon) return;
  const title = card.querySelector('.skill-name')?.textContent?.trim() || 'Skills';
  const iconMarkup = card.querySelector('.skill-icon')?.innerHTML || '';
  const list = card.querySelector('.skill-list')?.cloneNode(true);
  if (!list) return;
  skillModalTitle.textContent = title;
  skillModalIcon.innerHTML = iconMarkup;
  list.classList.add('skill-modal-list');
  skillModalBody.replaceChildren(list);
  hydrateSkillBars(list);
  skillModal.classList.add('is-open');
  skillModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeSkillModal() {
  if (!skillModal) return;
  skillModal.classList.remove('is-open');
  skillModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function bindSkillInteractions() {
  skillCards.forEach((card) => {
    const button = card.querySelector('[data-skill-view]');
    card.addEventListener('mouseenter', () => restartSkillBars(card));
    card.addEventListener('focusin', () => restartSkillBars(card));
    if (!button) return;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openSkillModal(card);
    });
  });
  if (skillModal) {
    skillModal.addEventListener('click', (event) => {
      if (event.target === skillModal) closeSkillModal();
    });
  }
  const closeButton = document.querySelector('[data-skill-modal-close]');
  if (closeButton) {
    closeButton.addEventListener('click', closeSkillModal);
  }
}

function bindDropdownInteractions() {
  dropdownParents.forEach((selectEl) => {
    const trigger = selectEl.querySelector('button');
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
      const cv = item.dataset.cv;
      const format = item.dataset.format;

      if (language) {
        setLanguage(language);
        return;
      }

      if (cv) {
        renderCv(cv);
        closeDropdown(selectEl);
      }

      if (format) {
        downloadCurrentCv(format);
        closeDropdown(selectEl);
      }

      if (cv && !cvModal.classList.contains('is-open')) {
        openCvModal(cv);
        closeDropdown(selectEl);
      }
    });
  });
}

function bindNav() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => setActiveTab(link.dataset.tab));
  });
  const sections = navLinks.map((link) => document.getElementById(link.dataset.tab));
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveTab(visible.target.id);
    },
    { threshold: [0.38, 0.5, 0.6] }
  );
  sections.forEach((section) => section && observer.observe(section));
}

function bindStatHover() {
  statCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      statsRow.classList.add('is-hovering');
      statCards.forEach((el) => el.classList.toggle('is-hovered', el === card));
    });
    card.addEventListener('mouseleave', () => {
      statsRow.classList.remove('is-hovering');
      statCards.forEach((el) => el.classList.remove('is-hovered'));
    });
  });
}

function bindModal() {
  cvModal.addEventListener('click', (event) => {
    if (event.target === cvModal) closeCvModal();
  });
  const cancelBtn = cvModal.querySelector('[data-action="cancel"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeCvModal);
  }
}

function bindOutsideClicks() {
  document.addEventListener('click', (event) => {
    const withinDropdown = event.target.closest('[data-select]');
    if (!withinDropdown) closeAllDropdowns();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllDropdowns();
      closeCvModal();
      closeSkillModal();
    }
  });
}

function initCertificateLinks() {
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach((card) => {
    const fullscreenBtn = card.querySelector('.cert-fullscreen');
    if (!fullscreenBtn) return;
    fullscreenBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const link = card.dataset.link?.trim();
      if (!link) return;
      window.location.assign(link);
    });
  });
}

function initFloatingTabs() {
  const header = document.querySelector('.topbar');
  const floatingTabs = document.getElementById('floatingTabs');
  if (!header || !floatingTabs) return;

  const updateVisibility = () => {
    const rect = header.getBoundingClientRect();
    const headerVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    floatingTabs.hidden = headerVisible;
  };

  const updateActiveTab = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageToTab = {
      '': 'professional',
      'index.html': 'professional',
      'personal.html': 'personal',
      'contact.html': 'contact',
    };
    const activeTab = pageToTab[currentPage] || 'professional';
    floatingTabs.querySelectorAll('.floating-tab').forEach((link) => {
      link.classList.toggle('is-active', link.dataset.tab === activeTab);
    });
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
  updateActiveTab();
}

function normalizeProjectTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

function setProjectImages() {
  projectCards.forEach((card) => {
    const image = card.querySelector('[data-project-image]');
    if (!image) return;
    const visibleTitle = card.querySelector('.project-title')?.textContent || card.dataset.projectTitle || '';
    const normalizedTitle = normalizeProjectTitle(visibleTitle);
    const match = projectImageMap[normalizedTitle];
    if (!match) return;
    image.src = match.src;
    image.alt = match.alt;
  });
}

function initProjects() {
  if (!projectCards.length) return;
  setProjectImages();
  const setProjectSlots = (activeIndex = 0) => {
    projectCards.forEach((card, index) => {
      const slot = (index - activeIndex + projectCards.length) % projectCards.length;
      card.dataset.slot = String(slot);
    });
  };
  let activeIndex = 0;
  setProjectSlots(activeIndex);
  if (projectRotationTimer) window.clearInterval(projectRotationTimer);
  projectRotationTimer = window.setInterval(() => {
    activeIndex = (activeIndex + 1) % projectCards.length;
    setProjectSlots(activeIndex);
  }, 2000);
}

function getJourneyMotionScale() {
  if (window.innerWidth <= 760) return 0.78;
  if (window.innerWidth <= 1180) return 0.9;
  return 1;
}

function updateJourneyStack() {
  if (!journeySection || !journeyStage || !journeyCards.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sectionTop = window.scrollY + journeySection.getBoundingClientRect().top;
  const availableScroll = Math.max(1, journeySection.offsetHeight - window.innerHeight);
  const localScroll = clamp(window.scrollY - sectionTop, 0, availableScroll);
  const progress = clamp(localScroll / availableScroll, 0, 1);
  const pageSpan = Math.max(1, journeyCards.length - 1);
  const pageFloat = progress * pageSpan;
  const activeIndex = Math.min(journeyCards.length - 1, Math.floor(pageFloat));
  const motionScale = getJourneyMotionScale();
  const horizontalStep = 18 * motionScale;
  const verticalStep = 7 * motionScale;

  journeyCards.forEach((card, index) => {
    const distance = index - pageFloat;
    const clampedDistance = clamp(distance, -1, 1);
    const absDistance = Math.abs(clampedDistance);
    let rotateY = clampedDistance * 180;
    let translateX = clampedDistance * horizontalStep;
    let translateY = absDistance * verticalStep;
    let translateZ = (1 - absDistance) * 120 - 60;
    let scale = 1 - absDistance * 0.08;
    let opacity = 0.12 + (1 - absDistance) * 0.88;
    let zIndex = 10 - index;

    if (reducedMotion) {
      const stackOffset = index - activeIndex;
      rotateY = stackOffset * -2;
      translateX = stackOffset * 8 * motionScale;
      translateY = Math.abs(stackOffset) * 4;
      translateZ = -Math.abs(stackOffset) * 18;
      scale = 1 - Math.abs(stackOffset) * 0.012;
      opacity = 1 - Math.abs(stackOffset) * 0.12;
      zIndex = 20 - Math.abs(stackOffset);
    } else {
      if (index === activeIndex) {
        zIndex = 40;
      } else if (index === activeIndex + 1) {
        zIndex = 30;
      } else if (index < activeIndex) {
        zIndex = 20 - (activeIndex - index);
      } else {
        zIndex = 10 - (index - activeIndex);
      }
    }

    card.style.setProperty('--journey-x', `${translateX}px`);
    card.style.setProperty('--journey-y', `${translateY}px`);
    card.style.setProperty('--journey-z', `${translateZ}px`);
    card.style.setProperty('--journey-rotate-y', `${rotateY}deg`);
    card.style.setProperty('--journey-scale', scale.toFixed(4));
    card.style.setProperty('--journey-opacity', opacity.toFixed(4));
    card.style.setProperty('--journey-z-index', String(zIndex));
  });
}

function scheduleJourneyUpdate() {
  if (journeyRafId) return;
  journeyRafId = window.requestAnimationFrame(() => {
    updateJourneyStack();
    journeyRafId = 0;
  });
}

function initJourneyReport() {
  if (!journeySection || !journeyStage || !journeyCards.length) return;
  journeyCards.forEach((card, index) => {
    card.style.position = 'absolute';
    card.style.top = '0';
    card.style.left = '50%';
    card.style.transformOrigin = 'center center';
    card.style.backfaceVisibility = 'hidden';
    card.style.transformStyle = 'preserve-3d';
    card.dataset.index = String(index);
  });
  updateJourneyStack();
  window.addEventListener('scroll', scheduleJourneyUpdate, { passive: true });
  window.addEventListener('resize', scheduleJourneyUpdate);
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
    curtain.classList.remove('open');
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
      if (!url || url.startsWith('#')) return;

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
  resizeCanvas();
  createParticles();
  drawParticles();
  animateSkillBars();
  bindDropdownInteractions();
  bindNav();
  bindStatHover();
  bindModal();
  bindSkillInteractions();
  bindOutsideClicks();
  initCertificateLinks();
  initProjects();
  initJourneyReport();
  initFloatingTabs();
  setActiveTab('professional');

  const savedLanguage = getStoredLanguage();
  renderCv(`${savedLanguage} CV`);
  applyLanguage(savedLanguage);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

init();