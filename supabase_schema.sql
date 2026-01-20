-- Create the tv_models table
create table public.tv_models (
  id uuid not null default gen_random_uuid (),
  name text not null,
  subtext text null,
  price text null,
  image text null,
  tag text null,
  tag_color text null,
  best_dist text null,
  is_popular boolean null default false,
  is_best_value boolean null default false,
  specs text null,
  created_at timestamp with time zone not null default now(),
  constraint tv_models_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.tv_models enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.tv_models
  for select
  to public
  using (true);

-- Seed initial data (Based on constants.ts)
insert into public.tv_models (name, subtext, price, image, tag, tag_color, best_dist)
values
  (
    '长虹 65D6 Pro',
    'QLED 4K超高清',
    '¥4,199',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBu9JvHjac3DjR4APQxIyyahGtbDxN8j83ax5dswG7sFIDcfw0PePAgUDoEDx_Te_XxFrcf-GWRPdx0DpCLn0it7WvtTk4CJrpr2DbwKsAit3TCn80w1zrR_mslHC0C2JAcdQ2nhxOQayyZu3CyhmEzc77Z2_yNmeTL9ctP1d2ZtLrTTtG0_8cQFdyY9o5UEoy-KroJRivHqQqyuxUB6kxcaoUfUNRvwkbXQvNFtDp5tVMUKgOZa5Wm4Ea3VZMZcHs-cUDUn2a8v7Y5',
    '80% 用户选择此款',
    'bg-primary text-white',
    '2.5米'
  ),
  (
    '长虹 65A8',
    '极速高刷系列',
    '¥3,599',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC8geb-LvVC1HEpatGJZRma2hkKjkWStgEM3SQDZPSG-lgw40lUooE6KXRhvWhFwfeGxsafE4CHLYCDkPB110hmm_cjtfLkwn44BzHLekJF0PBhQ6npyFIISVrJy04YJ_Kkf6B-Tjq9I2RPl0-49IezE81eQBhADz1dSjv4_LonRuR4ixL71tBm3x97sfQF4oIgvYl_yYHDgOAFrcBZwcRVG0emAdvpJ1bjwfxSPuxNXlsmnCXuLJyzsFbuquRbOhrqt5wLvj6CprSb',
    '性价比首选',
    'bg-blue-100 text-primary dark:bg-primary/20 dark:text-blue-300',
    '2.5米'
  ),
  (
    '长虹 Q8R Max',
    'Mini-LED 旗舰画质',
    '¥8,999',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBu9JvHjac3DjR4APQxIyyahGtbDxN8j83ax5dswG7sFIDcfw0PePAgUDoEDx_Te_XxFrcf-GWRPdx0DpCLn0it7WvtTk4CJrpr2DbwKsAit3TCn80w1zrR_mslHC0C2JAcdQ2nhxOQayyZu3CyhmEzc77Z2_yNmeTL9ctP1d2ZtLrTTtG0_8cQFdyY9o5UEoy-KroJRivHqQqyuxUB6kxcaoUfUNRvwkbXQvNFtDp5tVMUKgOZa5Wm4Ea3VZMZcHs-cUDUn2a8v7Y5',
    '画质天花板',
    'bg-amber-500 text-white',
    '3.0米'
  );
