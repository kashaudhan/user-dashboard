import { z } from "zod";
import * as type from "../types"

const FormData = z.object({
  name: z.string().min(1),
  userName: z.string().min(1),
  avatar: z.string().url(),
  isActive: z.boolean(),
  role: z.string(),
  email: z.string().email(),
  teams: z.array(z.string()).optional()
})

export const validateUsers = (user: type.IUser[]) => {
  const UsersSchema = z.array(FormData)
  return UsersSchema.parse(user)
}

export const validateUser = (user: type.IUser) => {
  return FormData.parse(user)
}