const navLinks = [...document.querySelectorAll('.topbar .nav-link')];
const languageSelect = document.querySelector('.language-select');
const dropdownParents = [...document.querySelectorAll('[data-select]')];
const languageLabel = document.querySelector('[data-language-label]');
const floatingTabs = document.getElementById('floatingTabs');
const contactForm = document.getElementById('contactForm');
const copyButton = document.querySelector('[data-copy-email]');
const copyStatus = document.querySelector('[data-copy-status]');

const CONTACT_EMAIL = 'omangimeshack@gmail.com';
const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const LANGUAGE_CODES = {
  English: 'en',
  Swahili: 'sw',
  Spanish: 'es',
  Japanese: 'ja',
};

const translations = {
  English: {
    documentTitle: '</.kiboma> Contact',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'English',

    contactTitle: 'Get In Touch',
    nameLabel: 'Name',
    emailLabel: 'Email Address',
    contentLabel: 'Content',
    namePlaceholder: 'Your secret identity',
    emailPlaceholder: "I promise I won't spam you",
    contentPlaceholder: 'Your message goes here. Ask me anything 👀',
    sendEmail: 'Send Email',

    emailBarLabel: 'Contact email',
    emailPrefix: 'Email:',
    copyAriaLabel: 'Copy email address',

    currentPositionTitle: 'Current<br />Position',
    currentPositionBody: 'Full-Stack Developer<br /><br />UoN Student@BEc, KE.',
    experienceTitle: 'Experience',
    experienceBody: '2+ years',
    fromTitle: 'From',
    fromBody: 'Nairobi, Kenya',
    freelanceTitle: 'Freelance',
    freelanceBody: 'Available for web builds',

    footerSecondary: 'Peer through my Personal Life',
    footerSignoff: '© Meshack Kiboma @2026',

    copyStatusCopied: 'Email copied to clipboard.',
    copyStatusFailed: 'Copy failed. Please copy omangimeshack@gmail.com manually.',
    submitSubjectPrefix: 'Portfolio message from',
    submitNameLabel: 'Name',
    submitEmailLabel: 'Email',
    defaultVisitor: 'Website visitor',
  },

  Swahili: {
    documentTitle: '</.kiboma> Wasiliana',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'Swahili',

    contactTitle: 'Wasiliana Nami',
    nameLabel: 'Jina',
    emailLabel: 'Anwani ya Barua Pepe',
    contentLabel: 'Yaliyomo',
    namePlaceholder: 'Utambulisho wako wa siri',
    emailPlaceholder: 'Naahidi sitakutumia spam',
    contentPlaceholder: 'Ujumbe wako hapa. Niulize chochote 👀',
    sendEmail: 'Tuma Barua Pepe',

    emailBarLabel: 'Barua pepe ya mawasiliano',
    emailPrefix: 'Barua pepe:',
    copyAriaLabel: 'Nakili anwani ya barua pepe',

    currentPositionTitle: 'Nafasi<br />ya Sasa',
    currentPositionBody: 'Mhandisi Mdogo wa Programu — Uendelezaji wa Backend<br /><br />Mwanafunzi wa UoN@BEc, KE.',
    experienceTitle: 'Uzoefu',
    experienceBody: 'Zaidi ya miaka 2',
    fromTitle: 'Kutoka',
    fromBody: 'Nairobi, Kenya',
    freelanceTitle: 'Kazi Huria',
    freelanceBody: 'Nipo tayari kwa ujenzi wa tovuti',

    footerSecondary: 'Pitia maisha yangu ya binafsi',
    footerSignoff: '© Meshack Kiboma @2026',

    copyStatusCopied: 'Barua pepe imenakiliwa kwenye ubao.',
    copyStatusFailed: 'Kunakili kumeshindikana. Tafadhali nakili omangimeshack@gmail.com mwenyewe.',
    submitSubjectPrefix: 'Ujumbe wa portfolio kutoka kwa',
    submitNameLabel: 'Jina',
    submitEmailLabel: 'Barua Pepe',
    defaultVisitor: 'Mgeni wa tovuti',
  },

  Spanish: {
    documentTitle: '</.kiboma> Contacto',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'Español',

    contactTitle: 'Ponte en contacto',
    nameLabel: 'Nombre',
    emailLabel: 'Correo electrónico',
    contentLabel: 'Contenido',
    namePlaceholder: 'Tu identidad secreta',
    emailPlaceholder: 'Prometo no enviarte spam',
    contentPlaceholder: 'Tu mensaje va aquí. Pregúntame lo que quieras 👀',
    sendEmail: 'Enviar correo',

    emailBarLabel: 'Correo de contacto',
    emailPrefix: 'Correo:',
    copyAriaLabel: 'Copiar dirección de correo',

    currentPositionTitle: 'Posición<br />actual',
    currentPositionBody: 'Ingeniero de software junior — desarrollo backend<br /><br />Estudiante de UoN@BEc, KE.',
    experienceTitle: 'Experiencia',
    experienceBody: 'Más de 2 años',
    fromTitle: 'De',
    fromBody: 'Nairobi, Kenya',
    freelanceTitle: 'Freelance',
    freelanceBody: 'Disponible para proyectos web',

    footerSecondary: 'Visita mi vida personal',
    footerSignoff: '© Meshack Kiboma @2026',

    copyStatusCopied: 'Correo copiado al portapapeles.',
    copyStatusFailed: 'No se pudo copiar. Copia manualmente omangimeshack@gmail.com.',
    submitSubjectPrefix: 'Mensaje del portfolio de',
    submitNameLabel: 'Nombre',
    submitEmailLabel: 'Correo',
    defaultVisitor: 'Visitante del sitio',
  },

  Japanese: {
    documentTitle: '</.kiboma> 連絡先',
    navProfessional: 'Professional',
    navPersonal: 'Personal',
    navContact: 'Contact',
    languageLabel: 'Japanese',

    contactTitle: 'お問い合わせ',
    nameLabel: '名前',
    emailLabel: 'メールアドレス',
    contentLabel: '内容',
    namePlaceholder: 'あなたの秘密の名前',
    emailPlaceholder: '迷惑メールは送りません',
    contentPlaceholder: 'ここにメッセージを書いてください。何でもどうぞ 👀',
    sendEmail: 'メールを送信',

    emailBarLabel: '連絡先メール',
    emailPrefix: 'メール:',
    copyAriaLabel: 'メールアドレスをコピー',

    currentPositionTitle: '現在の<br />役職',
    currentPositionBody: 'ジュニアソフトウェアエンジニア — バックエンド開発<br /><br />UoN@BEc, KE の学生。',
    experienceTitle: '経験',
    experienceBody: '2年以上',
    fromTitle: '出身',
    fromBody: 'Nairobi, Kenya',
    freelanceTitle: 'フリーランス',
    freelanceBody: 'ウェブ制作対応可',

    footerSecondary: 'パーソナルライフを見る',
    footerSignoff: '© Meshack Kiboma @2026',

    copyStatusCopied: 'メールをクリップボードにコピーしました。',
    copyStatusFailed: 'コピーに失敗しました。omangimeshack@gmail.com を手動でコピーしてください。',
    submitSubjectPrefix: 'ポートフォリオメッセージ：',
    submitNameLabel: '名前',
    submitEmailLabel: 'メール',
    defaultVisitor: 'サイト訪問者',
  },
};

function setActiveTab(tab) {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.tab === tab);
    if (link.dataset.tab === tab) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const floatingLinks = floatingTabs ? [...floatingTabs.querySelectorAll('.floating-tab')] : [];
  floatingLinks.forEach((link) => {
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

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored && translations[stored] ? stored : 'English';
  } catch {
    return 'English';
  }
}

function getPage(language = getStoredLanguage()) {
  return translations[language] || translations.English;
}

function updateDropdownSelection(language) {
  const options = [...document.querySelectorAll('.language-select .dropdown-item')];
  options.forEach((option) => {
    option.classList.toggle('is-selected', option.dataset.language === language);
  });
}

function applyLocalizedPageTranslations(language) {
  const page = getPage(language);

  document.documentElement.lang = LANGUAGE_CODES[language] || 'en';
  document.title = page.documentTitle;

  if (languageLabel) languageLabel.textContent = page.languageLabel;
  updateDropdownSelection(language);

  navLinks.forEach((link) => {
    if (link.dataset.tab === 'professional') link.textContent = page.navProfessional;
    if (link.dataset.tab === 'personal') link.textContent = page.navPersonal;
    if (link.dataset.tab === 'contact') link.textContent = page.navContact;
  });

  const contactTitle = document.querySelector('.contact-title');
  const nameLabel = document.querySelector('label[for="contactName"]');
  const emailLabel = document.querySelector('label[for="contactEmail"]');
  const contentLabel = document.querySelector('label[for="contactMessage"]');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const submitButtonText = document.querySelector('.contact-submit > span:first-child');
  const emailBar = document.querySelector('.contact-email-bar');
  const emailCopyText = document.querySelector('.contact-email-copy > span:last-child');
  const copyBtn = document.querySelector('[data-copy-email]');
  const currentPositionTitle = document.querySelector('.footer-card--current h3');
  const currentPositionBody = document.querySelector('.footer-card--current p');
  const experienceTitle = document.querySelector('.footer-card--experience h3');
  const experienceBody = document.querySelector('.footer-card--experience p');
  const fromTitle = document.querySelector('.footer-card--from h3');
  const fromBody = document.querySelector('.footer-card--from p');
  const freelanceTitle = document.querySelector('.footer-card--freelance h3');
  const freelanceBody = document.querySelector('.footer-card--freelance p');
  const footerSecondary = document.querySelector('.contact-footer-secondary');
  const footerSignoff = document.querySelector('.footer-signoff');

  if (contactTitle) contactTitle.textContent = page.contactTitle;
  if (nameLabel) nameLabel.textContent = page.nameLabel;
  if (emailLabel) emailLabel.textContent = page.emailLabel;
  if (contentLabel) contentLabel.textContent = page.contentLabel;
  if (nameInput) nameInput.placeholder = page.namePlaceholder;
  if (emailInput) emailInput.placeholder = page.emailPlaceholder;
  if (messageInput) messageInput.placeholder = page.contentPlaceholder;
  if (submitButtonText) submitButtonText.textContent = page.sendEmail;
  if (emailBar) emailBar.setAttribute('aria-label', page.emailBarLabel);
  if (emailCopyText) emailCopyText.innerHTML = `${page.emailPrefix} <strong>${CONTACT_EMAIL}</strong>`;
  if (copyBtn) copyBtn.setAttribute('aria-label', page.copyAriaLabel);

  if (currentPositionTitle) currentPositionTitle.innerHTML = page.currentPositionTitle;
  if (currentPositionBody) currentPositionBody.innerHTML = page.currentPositionBody;
  if (experienceTitle) experienceTitle.textContent = page.experienceTitle;
  if (experienceBody) experienceBody.textContent = page.experienceBody;
  if (fromTitle) fromTitle.textContent = page.fromTitle;
  if (fromBody) fromBody.textContent = page.fromBody;
  if (freelanceTitle) freelanceTitle.textContent = page.freelanceTitle;
  if (freelanceBody) freelanceBody.textContent = page.freelanceBody;
  if (footerSecondary) footerSecondary.textContent = page.footerSecondary;
  if (footerSignoff) footerSignoff.textContent = page.footerSignoff;
}

function setLanguage(language) {
  const selected = translations[language] ? language : 'English';

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selected);
  } catch {
    // ignore storage failures
  }

  applyLocalizedPageTranslations(selected);
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
    if (event.key === 'Escape') closeAllDropdowns();
  });
}

function initFloatingTabs() {
  if (!floatingTabs) return;

  const header = document.querySelector('.topbar');
  if (!header) return;

  const pageToTab = {
    '': 'contact',
    'contact.html': 'contact',
    'index.html': 'professional',
    'personal.html': 'personal',
  };

  const currentPage = window.location.pathname.split('/').pop() || '';
  const activeTab = pageToTab[currentPage] || 'contact';

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

function handleContactSubmit(event) {
  event.preventDefault();

  const page = getPage();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim() || page.defaultVisitor;
  const email = String(formData.get('email') || '').trim() || CONTACT_EMAIL;
  const message = String(formData.get('message') || '').trim();

  if (!message) {
    contactForm.reportValidity();
    return;
  }

  const subject = `${page.submitSubjectPrefix} ${name}`;
  const bodyText = [
    `${page.submitNameLabel}: ${name}`,
    `${page.submitEmailLabel}: ${email}`,
    '',
    message,
  ].join('\n');

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  window.location.href = mailto;
}

async function copyEmailAddress() {
  const page = getPage();

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } else {
      const temp = document.createElement('textarea');
      temp.value = CONTACT_EMAIL;
      temp.setAttribute('readonly', 'readonly');
      temp.style.position = 'fixed';
      temp.style.left = '-9999px';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }

    if (copyStatus) copyStatus.textContent = page.copyStatusCopied;
  } catch {
    if (copyStatus) copyStatus.textContent = page.copyStatusFailed;
  }

  window.setTimeout(() => {
    if (copyStatus) copyStatus.textContent = '';
  }, 1800);
}

function bindCopyAction() {
  if (!copyButton) return;
  copyButton.addEventListener('click', copyEmailAddress);
}

function bindNavFeedback() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => setActiveTab(link.dataset.tab || 'contact'));
  });
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
  bindCopyAction();

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  setLanguage(getStoredLanguage());
  setActiveTab('contact');
}

init();
