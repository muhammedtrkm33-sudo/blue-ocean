create table if not exists public.community_submissions (
  id bigint generated always as identity primary key,
  category text not null check (category in ('idea', 'request', 'complaint')),
  display_name text,
  is_anonymous boolean not null default true,
  message text not null,
  created_at timestamptz not null default now(),
  constraint community_submissions_message_length
    check (char_length(btrim(message)) between 1 and 3000),
  constraint community_submissions_name_choice
    check (
      (is_anonymous and display_name is null)
      or (
        not is_anonymous
        and display_name is not null
        and char_length(btrim(display_name)) between 1 and 100
      )
    )
);

alter table public.community_submissions enable row level security;
revoke all on public.community_submissions from public, anon, authenticated;
grant insert on public.community_submissions to anon, authenticated;

drop policy if exists "Anyone can submit ocean feedback" on public.community_submissions;
create policy "Anyone can submit ocean feedback"
  on public.community_submissions
  for insert
  to anon, authenticated
  with check (
    category in ('idea', 'request', 'complaint')
    and char_length(btrim(message)) between 1 and 3000
    and (
      (is_anonymous and display_name is null)
      or (
        not is_anonymous
        and display_name is not null
        and char_length(btrim(display_name)) between 1 and 100
      )
    )
  );
