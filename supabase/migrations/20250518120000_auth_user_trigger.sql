-- Sync auth.users to public.users on signup (id = auth.users.id)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
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
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'username', ''),
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'user_type', 'creator'),
    'active',
    false
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
