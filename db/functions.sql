-- BorderBridge Stored Functions (optional)

-- Auto-generate case code
CREATE OR REPLACE FUNCTION generate_case_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.case_code := 'BB-' || LPAD(nextval('case_code_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for case codes
CREATE SEQUENCE IF NOT EXISTS case_code_seq START 1001;

-- Trigger to auto-assign case_code on insert
CREATE TRIGGER trg_case_code
  BEFORE INSERT ON cases
  FOR EACH ROW
  WHEN (NEW.case_code IS NULL)
  EXECUTE FUNCTION generate_case_code();
