-- The portfolio is the team's shared project library ("Biblioteca de
-- projetos da Nexus Digital"), not per-user private data like leads or
-- financeiro — every logged-in team member should see and manage the same
-- set of projects. It was accidentally given the per-user-owner policy
-- pattern (20240009_per_user_rls.sql, 20240011_financeiro_portfolio.sql)
-- instead of the shared pattern already used for `settings` (20240004_rls.sql).

DROP POLICY IF EXISTS "portfolio_owner" ON portfolio_projects;

CREATE POLICY "portfolio_shared" ON portfolio_projects
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
