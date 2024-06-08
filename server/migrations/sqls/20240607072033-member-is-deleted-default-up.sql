/* Replace with your SQL commands */

ALTER TABLE member_team DROP CONSTRAINT fk_member;
ALTER TABLE member_team
ADD CONSTRAINT fk_member
FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE;
