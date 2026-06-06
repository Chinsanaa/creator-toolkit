-- Allow sponsors to approve/reject applications on their campaigns
CREATE POLICY "Sponsors can update applications for their sponsorships"
  ON public.sponsorship_applications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.sponsorships s
      WHERE s.id = sponsorship_applications.sponsorship_id
        AND s.sponsor_user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sponsorships s
      WHERE s.id = sponsorship_applications.sponsorship_id
        AND s.sponsor_user_id = auth.uid()
    )
  );
