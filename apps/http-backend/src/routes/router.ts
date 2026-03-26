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

router.get("/get-workflow", getWorkFlows)
router.post("/create-workflow", createWorkFlow)
router.patch("/update", updateWorkFlow)

router.route("/credential").delete(createCredential).post(deleteCredential)
router.get("/test-credential",testCredential)






export default router