-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles (Extends Supabase Auth users)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    avatar_url text,
    credits int not null default 10, -- Give 10 free credits to start
    updated_at timestamptz default now(),
    created_at timestamptz default now()
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, credits)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 10)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Safe trigger creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Table: product_inputs
create table if not exists public.product_inputs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id),
    session_id text null,
    product_name text not null,
    category text null,
    target_audience text null,
    selling_points jsonb not null default '[]'::jsonb,
    offer text null,
    tone text null,
    image_asset_id uuid null,
    created_at timestamptz default now()
);

-- Table: creative_packages
create table if not exists public.creative_packages (
    id uuid primary key default uuid_generate_v4(),
    product_input_id uuid references public.product_inputs(id) on delete cascade,
    status text not null default 'ready',
    language text not null default 'en',
    platform text not null default 'tiktok_reels_meta',
    model_name text null,
    created_at timestamptz default now()
);

-- Table: creative_concepts
create table if not exists public.creative_concepts (
    id uuid primary key default uuid_generate_v4(),
    package_id uuid references public.creative_packages(id) on delete cascade,
    angle text not null,
    hook text not null,
    storyboard jsonb not null default '[]'::jsonb,
    caption text not null,
    cta text not null,
    thumbnail_prompt text null,
    video_prompt text not null,
    rank int not null default 0,
    created_at timestamptz default now()
);

-- Table: generations
create table if not exists public.generations (
    id uuid primary key default uuid_generate_v4(),
    package_id uuid references public.creative_packages(id) on delete cascade,
    concept_id uuid references public.creative_concepts(id) on delete cascade,
    user_id uuid references auth.users(id),
    session_id text null,
    provider text not null,
    provider_job_id text not null,
    status text not null default 'queued',
    output_url text null,
    cost_usd numeric(10,4) default 0,
    error_message text null,
    started_at timestamptz default now(),
    completed_at timestamptz null,
    created_at timestamptz default now()
);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.product_inputs enable row level security;
alter table public.creative_packages enable row level security;
alter table public.creative_concepts enable row level security;
alter table public.generations enable row level security;

-- Safe Policy creation (Drop if exists then create)
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Allow all for now" on public.product_inputs;
create policy "Allow all for now" on public.product_inputs for all using (true);

drop policy if exists "Allow all for now" on public.creative_packages;
create policy "Allow all for now" on public.creative_packages for all using (true);

drop policy if exists "Allow all for now" on public.creative_concepts;
create policy "Allow all for now" on public.creative_concepts for all using (true);

drop policy if exists "Allow all for now" on public.generations;
create policy "Allow all for now" on public.generations for all using (true);
