import { Router } from "express";
import * as services from "../services"

const router = Router();

// common routes


router.get("/members", services.getMembers);
router.get("/members/:id", services.getMember);
router.post("/members", services.addMember);
router.put("/members/:id", services.updateMember);
router.delete("/members/:id", services.deleteMember);

// add multiple users
router.post("/members/add-multiple", services.addMembers);


export default router;
