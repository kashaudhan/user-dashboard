/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS member (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  user_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  is_deleted BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_name)
);

CREATE TABLE IF NOT EXISTS member_team (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL,
  team TEXT NOT NULL,
  CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES member(id),
  UNIQUE(member_id, team)
);