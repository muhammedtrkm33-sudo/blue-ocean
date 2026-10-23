create table if not exists public.user_library (
  user_id uuid primary key references auth.users (id) on delete cascade,
  favorites jsonb not null default '[]'::jsonb,
  research_list jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_library enable row level security;

revoke all on public.user_library from anon;
grant select, insert, update on public.user_library to authenticated;

create policy "Users can read their own research library"
  on public.user_library for select
  using (auth.uid() = user_id);

create policy "Users can create their own research library"
  on public.user_library for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own research library"
  on public.user_library for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
