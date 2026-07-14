-- Leads created before per-user RLS (20240009_per_user_rls.sql) — or via a
-- flow that didn't set imported_by — have imported_by IS NULL. The
-- "leads_update"/"leads_select" policies check imported_by = auth.uid(),
-- which is never true against NULL, so those rows silently fail to update
-- (0 rows affected, not a Postgres error) even though they're still visible
-- via other paths.
--
-- Safe, self-guarding backfill: only assigns orphaned leads to the sole
-- account if there's exactly one profile — never guesses an owner when
-- there's more than one, so it can't accidentally hand another user's leads
-- to the wrong account. If this is a no-op for you, it means either there
-- are 0 or 2+ profiles; ask before assigning ownership manually in that case.
DO $$
DECLARE
  sole_user_id UUID;
BEGIN
  IF (SELECT count(*) FROM profiles) = 1 THEN
    SELECT id INTO sole_user_id FROM profiles LIMIT 1;
    UPDATE leads SET imported_by = sole_user_id WHERE imported_by IS NULL;
  END IF;
END $$;
