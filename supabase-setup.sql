-- Guest book storage for the Ahmed & Alaa invitation.
--
-- Run this once in your Supabase project: SQL Editor -> New query -> paste -> Run.
-- Then copy the project URL and the anon public key from Settings -> API into
-- js/supabase-config.js.

create table if not exists public.guestbook (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists guestbook_created_at_idx
  on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

-- Guests may add a message, with light limits so the form cannot be used to
-- dump large amounts of text into the table.
drop policy if exists "anyone can sign the guest book" on public.guestbook;
create policy "anyone can sign the guest book"
  on public.guestbook
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 80
    and char_length(message) between 1 and 1000
  );

-- Anyone with the link to messages.html can read the entries.
drop policy if exists "anyone can read the guest book" on public.guestbook;
create policy "anyone can read the guest book"
  on public.guestbook
  for select
  to anon, authenticated
  using (true);

-- No update or delete policy exists on purpose: with the anon key alone nobody
-- can edit or erase a message. Do that from the Supabase table editor instead.
