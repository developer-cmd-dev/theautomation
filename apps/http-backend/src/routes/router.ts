import { Response, Router } from "express";
import { createWorkFlow, getWorkFlows, updateWorkFlow } from "../controller/workflow.controller.js";


 const router:Router = Router();

router.get('/hello',(req,res:Response)=>{
    res.status(200).json('Hi there')
})

router.get("/get-workflow",getWorkFlows)
router .post("/create-workflow",createWorkFlow)
router.patch("/update",updateWorkFlow)

export default router