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
  const buttonText = button ? button.textContent : '';

  const note = document.createElement('p');
  note.className = 'guestbook-note';
  note.setAttribute('role', 'status');
  form.appendChild(note);

  function fail(text) {
    note.textContent = text;
    note.classList.add('is-error');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note.textContent = '';
    note.classList.remove('is-error');

    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message) return;

    if (!db) {
      fail('The guest book is not connected yet. Please try again later.');
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }

    const { error } = await db
      .from('guestbook')
      .insert({ name: name.slice(0, 80), message: message.slice(0, 1000) });

    if (button) {
      button.disabled = false;
      button.textContent = buttonText;
    }

    if (error) {
      console.error('Guest book insert failed:', error);
      fail('Sorry, your message could not be sent. Please try again.');
      return;
    }

    form.innerHTML =
      '<p class="body" style="text-align: center;">Thank you for your warm wishes!</p>';
  });
}
