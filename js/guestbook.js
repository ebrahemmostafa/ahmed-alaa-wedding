// Sends the guest book form to Supabase.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const form = document.getElementById('guestbook-form');
if (form) {
  const configured =
    window.SUPABASE_URL &&
    window.SUPABASE_ANON_KEY &&
    !window.SUPABASE_URL.includes('YOUR-PROJECT-REF');

  const db = configured ? createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY) : null;
  const button = form.querySelector('button[type="submit"]');

  // Falls back to English if the language file has not loaded.
  const say = (key, english) => (window.i18n ? window.i18n.t(key) : english);

  const note = document.createElement('p');
  note.className = 'guestbook-note';
  note.setAttribute('role', 'status');
  form.appendChild(note);

  function fail(key, english) {
    note.setAttribute('data-i18n', key);
    note.textContent = say(key, english);
    note.classList.add('is-error');
  }

  function clearNote() {
    note.removeAttribute('data-i18n');
    note.textContent = '';
    note.classList.remove('is-error');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearNote();

    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message) return;

    if (!db) {
      fail('guest.offline', 'The guest book is not connected yet. Please try again later.');
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = say('guest.sending', 'Sending...');
    }

    const { error } = await db
      .from('guestbook')
      .insert({ name: name.slice(0, 80), message: message.slice(0, 1000) });

    if (button) {
      button.disabled = false;
      button.textContent = say('guest.send', 'Send With Love');
    }

    if (error) {
      console.error('Guest book insert failed:', error);
      fail('guest.error', 'Sorry, your message could not be sent. Please try again.');
      return;
    }

    // data-i18n keeps the thank-you translated if the language is switched after.
    form.innerHTML =
      '<p class="body" data-i18n="guest.thanks" style="text-align: center;">' +
      say('guest.thanks', 'Thank you for your warm wishes!') +
      '</p>';
  });
}
