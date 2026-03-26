import { Response, Router } from "express";
import { createWorkFlow, getWorkFlows, updateWorkFlow } from "../controller/workflow.controller.js";
import { createCredential, deleteCredential, testCredential } from "../controller/credential.controller.js";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import { signup, singin } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router: Router = Router();

router.get('/hello',authMiddleware, (req, res: Response) => {
    res.status(200).json('Hi there')
})


router.post("/signup",signup)
router.get("/signin",singin)

router.get("/get-workflow",authMiddleware, getWorkFlows)
router.post("/create-workflow",authMiddleware, createWorkFlow)
router.patch("/update",authMiddleware, updateWorkFlow)
router.post("/credential",authMiddleware,createCredential)
router.delete("/credential",authMiddleware,deleteCredential)
router.get("/test-credential",authMiddleware,testCredential)






export default router