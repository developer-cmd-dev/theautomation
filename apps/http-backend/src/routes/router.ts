import { Response, Router } from "express";
import { createWorkFlow, updateWorkFlow } from "../controller/workflow.controller.js";


 const router:Router = Router();

router.get('/hello',(req,res:Response)=>{
    res.status(200).json('Hi there')
})


router .post("/create-workflow",createWorkFlow)
router.patch("/update",updateWorkFlow)

export default router