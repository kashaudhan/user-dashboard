import { Request, Response } from "express"
import * as db from "../db"

export const getMembers = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      --sql
      WITH member_team AS (
        SELECT
          m.id,
          m.name,
          m.user_name,
          m.avatar,
          m.is_active,
          m.role,
          m.email,
          COALESCE(json_agg(t.team) FILTER (WHERE t.team IS NOT NULL), '[]') AS teams
        FROM member m
        LEFT JOIN team t ON m.id = t.member_id
        WHERE m.is_deleted = FALSE
        GROUP BY m.id
        ORDER BY m.id
        LIMIT 10 OFFSET $1
      )
      SELECT json_agg(member_team) FROM member_team;
    `)
  } catch (error) {
    
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
  const { name, user_name, is_active, email, role,  } = req.body;
}

export const updateMember = async (req: Request, res: Response) => {

}

export const deleteMember = async (req: Request, res: Response) => {

}