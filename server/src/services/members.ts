import { Request, Response } from "express"
import * as db from "../db"

export const getMembers = async (req: Request, res: Response) => {

  let { page = 1, limit = 10} = req.query;

  limit = Number(limit)
  const offset = (Number(page) - 1) * limit

  try {
    const result = await db.query(`
      --sql
      WITH member_team AS (
        SELECT
          m.id,
          m.name,
          m.user_name,
          m.is_active,
          m.role,
          m.email,
          COALESCE(json_agg(t.team) FILTER (WHERE t.team IS NOT NULL), '[]') AS teams
        FROM member m
        LEFT JOIN member_team t ON m.id = t.member_id
        WHERE m.is_deleted = FALSE
        GROUP BY m.id
        ORDER BY m.id
        LIMIT $1
        OFFSET $2
      )
      SELECT json_agg(member_team) FROM member_team;
    `, [ limit, offset ]);

    const count = await db.query(`SELECT COUNT(*) as row_count FROM member_team`);

    return res.status(200).json({
      data: {
        members: result.rows[0].json_agg || [],
        row_count: Number(count.rows[0].row_count)
      }
    }).end();
    
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}

export const getMember = async (req: Request, res: Response) => {
  const id = Number(req.params['id']);

  if(id <= 0) {
    return res.status(400).json({
      error: "Invalid user"
    }).end();
  }

  try {
    const result = await db.query(`
      --sql
      SELECT id, name, user_name, is_active, email, role WHERE id = $1
    `, [ id ]);

    if(!result) {
      return res.status(500).end();
    }

    if(!result.rowCount) {
      return res.status(400).json({
        error: "User does not exists"
      }).end();
    }

    const teams = await db.query(`
      --sql
      SELECT * FROM member_team WHERE member_id = $1
    `, [ id ]);

    return res.status(200).json({
      data: {
        ...result.rows[0],
        teams: teams.rows
      }
    });
  } catch (error) {
    return res.status(500).end();
  }
}

export const addMember = async (req: Request, res: Response) => {
  const { name, user_name, email, role, team } = req.body;

  try {

    await db.query('BEGIN');

    const result = await db.query(`
      INSERT INTO member
        (name, user_name, email, role, is_active, is_deleted)
        VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `, [name, user_name, email, role, true, false]);

    const memberId = result.rows[0].id;

    const teamData = await db.query(`
      INSERT INTO member_team
        (member_id, team)
        VALUES($1, $2)
      RETURNING *;
    `, [ memberId, team ]);

    await db.query('COMMIT');

    return res.status(201).json({
      data: {
        ...result.rows[0],
        team: [teamData.rows[0].team]
      }
    })
    
  } catch (error) {
    await db.query('ROLLBACK');
    return res.status(500).end();
  }

}

export const updateMember = async (req: Request, res: Response) => {
  
  const id = Number(req.params['id']);
  const { name, user_name, email, role } = req.body;

  try {
    const result = await db.query(`
      UPDATE member SET
        name = $1,
        user_name = $2,
        email = $3,
        role = $4
      WHERE id = $5
      RETURNING *;
    `, [ name, user_name, email, role, id ]);

    const teamData = await db.query(`
      SELECT team FROM member_team WHERE member_id = $1;
    `, [ id ]);

    return res.status(204).json({
      data: {
        ...result.rows[0],
        team: [...teamData.rows.map(i => i.team)]
      }
    }).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}

export const deleteMember = async (req: Request, res: Response) => {
  const id = Number(req.params['id']);

  if(id <= 0) {
    return res.status(400).json({
      error: "Invalid user id"
    }).end();
  }

  try {
    const teamData = await db.query(`
      SELECT team FROM member_team WHERE member_id = $1;
    `, [ id ]);

    const result = await db.query(`
      DELETE FROM member WHERE id = $1 RETURNING *;
    `, [ id ]);

    const data = result.rows.length ? {
      ...result.rows[0],
      team: [...teamData.rows.map(i => i.team)]
    } : null

    return res.status(200).json({ data }).end()

  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }

}