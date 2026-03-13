-- BorderBridge RLS Policies (optional)
-- Enable Row Level Security on sensitive tables

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Example: refugees can only see their own cases
CREATE POLICY "Refugees see own cases" ON cases
  FOR SELECT USING (
    auth.uid() = created_by
    OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'authority')
  );

-- Authorities can see all
CREATE POLICY "Authorities see all cases" ON cases
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'authority')
  );
