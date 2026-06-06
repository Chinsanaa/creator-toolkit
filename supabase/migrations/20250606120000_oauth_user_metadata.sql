-- Improve public.users sync for Google/Apple OAuth sign-ups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  resolved_name text;
  resolved_username text;
begin
  resolved_name := coalesce(
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    ''
  );

  resolved_username := coalesce(
    nullif(trim(new.raw_user_meta_data->>'username'), ''),
    lower(regexp_replace(split_part(coalesce(new.email, new.id::text), '@', 1), '[^a-zA-Z0-9_]', '', 'g'))
  );

  insert into public.users (
    id,
    email,
    name,
    username,
    phone,
    user_type,
    status,
    is_verified
  ) values (
    new.id,
    new.email,
    resolved_name,
    resolved_username,
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'user_type', 'creator'),
    'active',
    coalesce((new.raw_user_meta_data->>'email_verified')::boolean, false)
  );
  return new;
end;
$$;
