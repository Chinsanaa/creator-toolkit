alter table public.sponsorship_applications
  add column if not exists deliverable_url text,
  add column if not exists deliverable_submitted_at timestamptz;

alter table public.sponsorships
  add column if not exists payment_marked_paid_at timestamptz;

drop policy if exists "Creators can submit deliverables on their applications" on public.sponsorship_applications;
create policy "Creators can submit deliverables on their applications"
  on public.sponsorship_applications
  for update
  using (creator_user_id = auth.uid())
  with check (creator_user_id = auth.uid());
