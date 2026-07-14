-- Lets the public marketing site read published portfolio projects without a
-- Supabase session, so /portfolio and /portfolio/:slug can show real projects
-- managed in the Portal instead of the hardcoded placeholder list.
-- Additive: permissive policies are OR'd, so "portfolio_owner" (full CRUD for
-- the owning user) is unaffected.
CREATE POLICY "portfolio_public_read" ON portfolio_projects
  FOR SELECT USING (status = 'active');
