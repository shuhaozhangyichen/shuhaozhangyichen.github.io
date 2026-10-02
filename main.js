(() => {
  'use strict';
  const toggle = document.getElementById('language-toggle');
  const englishDates = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const chineseDates = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const description = document.querySelector('meta[name="description"]');
  const descriptions = {
    en: 'Shuhao Zhang, Ph.D. student at USTC. Research in ergodic theory, topological dynamics, combinatorial number theory and fractal geometry.',
    zh: '张书豪，中国科学技术大学数学科学学院博士研究生。研究方向为遍历理论、拓扑动力系统、组合数论与分形几何。'
  };
  let language = 'en';
  function setLanguage(next) {
    language = next === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-aria-en][data-aria-zh]').forEach(element => {
      element.setAttribute('aria-label', language === 'zh' ? element.dataset.ariaZh : element.dataset.ariaEn);
    });
    document.querySelectorAll('time[datetime]').forEach(element => {
      const date = new Date(`${element.dateTime}T12:00:00Z`);
      element.textContent = (language === 'zh' ? chineseDates : englishDates).format(date);
    });
    toggle.textContent = language === 'zh' ? 'English' : '中文';
    toggle.lang = language === 'zh' ? 'en' : 'zh-CN';
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    document.title = language === 'zh' ? '张书豪 · 数学个人主页' : 'Shuhao Zhang · Mathematics';
    description.content = descriptions[language];
    try { localStorage.setItem('shuhao-site-language', language); } catch (_) { /* Switching works without storage. */ }
  }
  try { language = localStorage.getItem('shuhao-site-language') === 'zh' ? 'zh' : 'en'; } catch (_) { language = 'en'; }
  setLanguage(language);
  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
})();
