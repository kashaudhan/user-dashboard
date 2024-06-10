import { Request, Response } from "express";
import * as db from "../db";
import { validateUser, validateUsers } from "../utils/validator";
import pgPromise from "pg-promise";

const pgp = pgPromise({
  capSQL: true,
});

export const getMembers = async (req: Request, res: Response) => {
  let { page = 1, limit = 10 } = req.query;

  limit = Number(limit);
  const offset = (Number(page) - 1) * limit;

  try {
    const result = await db.query(
      `
      SELECT * FROM member LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );

    const count = await db.query(`SELECT COUNT(*) as row_count FROM member`);

    return res
      .status(200)
      .json({
        data: {
          members: result.rows || [],
          row_count: Number(count.rows[0].row_count),
        },
      })
      .end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export const getMember = async (req: Request, res: Response) => {
  const id = Number(req.params["id"]);

  if (id <= 0) {
    return res
      .status(400)
      .json({
        error: "Invalid user",
      })
      .end();
  }

  try {
    const result = await db.query(
      `SELECT * FROM member WHERE id = $1;`,
      [id]
    );

    if (!result) {
      return res.status(500).end();
    }

    if (!result.rowCount) {
      return res
        .status(400)
        .json({
          error: "User does not exists",
        })
        .end();
    }

    return res.status(200).json({
      data: {
        ...result.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).end();
  }
};

export const addMembers = async (req: Request, res: Response) => {
  const members = req.body;

  if (!validateUsers(members)) {
    return res
      .status(400)
      .json({
        error: "Invalid data provided",
      })
      .end();
  }

  try {
    const columnSet = new pgp.helpers.ColumnSet(
      ["name", "user_name", "avatar", "is_active", "role", "email", "teams"],
      {
        table: "member",
      }
    );

    const bulkMemberData = members.map((member: any) => {
      return {
        name: member.name,
        user_name: member.userName,
        avatar: member.avatar,
        is_active: member.isActive,
        role: member.role,
        email: member.email,
        teams: member.teams,
      };
    });

    const bulkInsertQuery = pgp.helpers.insert(bulkMemberData, columnSet);

    const result = await db.query(bulkInsertQuery);

    return res.status(201).json({
      data: result.rows,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).end();
  }
};

export const addMember = async (req: Request, res: Response) => {
  const user = req.body;

  if (!validateUser(user)) {
    return res
      .status(400)
      .json({
        error: "Invalid value(s) provided",
      })
      .end();
  }

  try {
    const result = await db.query(
      `
      INSERT INTO member
        (name, user_name, avatar, is_active, role, email, teams)
        VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [
        user.name,
        user.userName,
        user.avatar,
        true,
        user.role,
        user.email,
        user.teams,
      ]
    );

    return res.status(201).json({
      data: {
        ...result.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).end();
  }
};

export const updateMember = async (req: Request, res: Response) => {
  const id = Number(req.params["id"]);
  const { name, email, role } = req.body;

  try {
    const result = await db.query(
      `
      UPDATE member SET
        name = $2,
        email = $3,
        role = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `,
      [id, name, email, role]
    );

    return res
      .status(200)
      .json({
        data: result.rows[0],
      })
      .end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  const id = Number(req.params["id"]);

  if (id <= 0) {
    return res
      .status(400)
      .json({
        error: "Invalid user id",
      })
      .end();
  }

  try {
    const result = await db.query(
      `
      DELETE FROM member WHERE id = $1 RETURNING *;
    `,
      [id]
    );
    
    return res.status(200).json({ data: result.rows[0] }).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};
