-- SUPABASE POSTGRESQL SCHEMA FOR 100 ENGLISH VIDEOS, 1000 QUESTIONS & 3-VIDEOS/WEEK CALENDAR
create table if not exists public.episodes (
  id integer primary key,
  title text not null,
  level text not null check (level in ('L3', 'L4')),
  duration_minutes integer not null check (duration_minutes between 15 and 20),
  youtube_url text not null,
  grammar_rule_1 text not null,
  grammar_rule_2 text not null,
  week_number integer not null,
  day_slot_index integer not null
);

create table if not exists public.user_progress (
  user_id uuid references auth.users(id) primary key,
  start_date date not null default current_date,
  study_days text not null default 'Mon-Wed-Fri',
  scores_map jsonb not null default '{}'::jsonb,
  custom_youtube_ids jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users manage own English schedule & scores"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);