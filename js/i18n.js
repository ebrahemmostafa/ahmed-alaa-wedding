// Arabic / English switch.
// Every translatable element carries data-i18n="<key>" (or data-i18n-placeholder).
// Values may contain markup - they are authored here, never taken from a guest.
(function () {
  var STRINGS = {
    en: {
      'title': 'Ahmed - Alaa',
      'preloader': 'Click the door to open',
      'hero.together': 'TOGETHER WITH THEIR FAMILIES',
      'hero.names': 'Ahmed <br> & <br> Alaa',
      'hero.date': '28 October 2026',
      'scroll': 'Scroll Down',
      'quran.notice': 'Kindly Pause The Music Before<br> Reading The Quran Verse',
      'welcome.title': 'Dear Family and Friends',
      'welcome.body': 'On this beautiful day, we want to share with you the bright moments and sincere smiles of our love story.',
      'countdown.title': 'Count Down',
      'countdown.sub': 'Until I Say "Yes"',
      'cd.days': 'Days',
      'cd.hours': 'Hours',
      'cd.minutes': 'Minutes',
      'cd.seconds': 'Seconds',
      'program.title': 'The Celebration',
      'program.sub': "Today's Program",
      'time.pm': 'PM',
      'time.am': 'AM',
      'time.starts': 'Starts',
      'time.ends': 'Ends',
      'venue.title': 'Venue',
      'venue.name': 'Gladiolus Garden Hall<br>Chemical Warfare House',
      'venue.maps': 'Google Maps',
      'guest.title': 'Guest Book',
      'guest.sub': 'Leave Us a Message',
      'guest.name': 'Your Name',
      'guest.attend': 'Will You Attend ?',
      'guest.placeholder': 'Will you be joining us? Leave a "Yes" or "No" with your sweet note...',
      'guest.send': 'Send With Love',
      'guest.sending': 'Sending...',
      'guest.thanks': 'Thank you for your warm wishes!',
      'guest.error': 'Sorry, your message could not be sent. Please try again.',
      'guest.offline': 'The guest book is not connected yet. Please try again later.',
      'closing': 'Your presence is the most beautiful part of our story',
      'footer.names': 'Ahmed & Alaa',
      'footer.date': '28 October 2026',
      'footer.credit': 'made with love by <a href="https://ajwa2-collection.vercel.app/" target="_blank" rel="noopener noreferrer">Ajwaa</a>',
      'music.play': 'Play Music',
      'lang.switch': 'التبديل إلى العربية'
    },
    ar: {
      'title': 'أحمد & آلاء',
      'preloader': 'اضغط على الباب للدخول',
      'hero.together': 'بمباركة عائلتيهما',
      'hero.names': 'أحمد <br> & <br> آلاء',
      'hero.date': '28 أكتوبر 2026',
      'scroll': 'مرّر للأسفل',
      'quran.notice': 'برجاء إيقاف الموسيقى قبل<br> قراءة الآية الكريمة',
      'welcome.title': 'أهلنا وأصدقاءنا الأعزاء',
      'welcome.body': 'في هذا اليوم الجميل، نودّ أن نشارككم أجمل اللحظات وأصدق الابتسامات من قصة حبّنا.',
      'countdown.title': 'العد التنازلي',
      'countdown.sub': 'حتى أقول «نعم»',
      'cd.days': 'يوم',
      'cd.hours': 'ساعة',
      'cd.minutes': 'دقيقة',
      'cd.seconds': 'ثانية',
      'program.title': 'الاحتفال',
      'program.sub': 'برنامج اليوم',
      'time.pm': 'مساءً',
      'time.am': 'صباحًا',
      'time.starts': 'يبدأ',
      'time.ends': 'ينتهي',
      'venue.title': 'المكان',
      'venue.name': 'قاعة حديقة الجلاديولس<br>دار الحرب الكيميائية',
      'venue.maps': 'الموقع على الخريطة',
      'guest.title': 'سجل الضيوف',
      'guest.sub': 'اترك لنا رسالة',
      'guest.name': 'اسمك',
      'guest.attend': 'هل ستشاركنا الفرحة؟',
      'guest.placeholder': 'هل ستشاركنا فرحتنا؟ اكتب «نعم» أو «لا» مع كلمة جميلة...',
      'guest.send': 'أرسل بكل حب',
      'guest.sending': 'جارٍ الإرسال...',
      'guest.thanks': 'شكرًا لكلماتكم الطيبة!',
      'guest.error': 'عذرًا، لم نتمكن من إرسال رسالتك. برجاء المحاولة مرة أخرى.',
      'guest.offline': 'سجل الضيوف غير متصل بعد. برجاء المحاولة لاحقًا.',
      'closing': 'حضوركم أجمل ما في قصتنا',
      'footer.names': 'أحمد & آلاء',
      'footer.date': '28 أكتوبر 2026',
      'footer.credit': 'صُنع بكل حب بواسطة <a href="https://ajwa2-collection.vercel.app/" target="_blank" rel="noopener noreferrer">Ajwaa</a>',
      'music.play': 'تشغيل الموسيقى',
      'lang.switch': 'Switch to English'
    }
  };

  var current = 'en';

  function read() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }

  function save(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) { /* private mode */ }
  }

  function t(key) {
    var table = STRINGS[current] || STRINGS.en;
    return table[key] !== undefined ? table[key] : STRINGS.en[key];
  }

  function apply(lang) {
    current = STRINGS[lang] ? lang : 'en';
    var arabic = current === 'ar';
    var root = document.documentElement;

    root.setAttribute('lang', arabic ? 'ar' : 'en');
    root.setAttribute('dir', arabic ? 'rtl' : 'ltr');
    root.setAttribute('data-lang', current);
    document.title = t('title');

    // Sections carry their own dir/lang, which would otherwise outrank the root.
    // Anything authored as rtl (the Quran verse) stays as it is in both languages.
    var i;
    var marked = document.querySelectorAll('[dir]');
    for (i = 0; i < marked.length; i++) {
      var el = marked[i];
      if (el === root) continue;
      if (!el.hasAttribute('data-dir')) el.setAttribute('data-dir', el.getAttribute('dir'));
      if (el.getAttribute('data-dir') === 'rtl') continue;
      el.setAttribute('dir', arabic ? 'rtl' : 'ltr');
      if (el.hasAttribute('lang')) el.setAttribute('lang', arabic ? 'ar' : 'en');
    }

    var nodes = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].getAttribute('data-i18n'));
    }

    var holders = document.querySelectorAll('[data-i18n-placeholder]');
    for (i = 0; i < holders.length; i++) {
      holders[i].setAttribute('placeholder', t(holders[i].getAttribute('data-i18n-placeholder')));
    }

    var music = document.getElementById('music-toggle');
    if (music && !music.classList.contains('is-playing')) {
      music.setAttribute('aria-label', t('music.play'));
    }

    var button = document.getElementById('lang-toggle');
    if (button) {
      button.textContent = arabic ? 'EN' : 'عربي';
      button.setAttribute('aria-label', t('lang.switch'));
      button.setAttribute('title', t('lang.switch'));
    }

    save(current);
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: current } }));
  }

  window.i18n = {
    t: t,
    apply: apply,
    get lang() { return current; }
  };

  function start() {
    var saved = read();
    apply(saved === 'ar' || saved === 'en' ? saved : 'en');
    var button = document.getElementById('lang-toggle');
    if (button) {
      button.addEventListener('click', function () {
        apply(current === 'ar' ? 'en' : 'ar');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
