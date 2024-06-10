/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS member (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  user_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar TEXT,
  teams TEXT[] NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_name)
);

CREATE OR REPLACE FUNCTION check_unique_teams() 
RETURNS TRIGGER AS $$
BEGIN
  -- Check for duplicate values in the tags array
  IF (SELECT COUNT(*) FROM (SELECT unnest(NEW.teams) AS teams) teams_sub GROUP BY teams_sub HAVING COUNT(*) > 1) > 0 THEN
    RAISE EXCEPTION 'teams array contains duplicate values';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER check_unique_teams
BEFORE INSERT OR UPDATE ON member
FOR EACH ROW EXECUTE FUNCTION check_unique_teams();
