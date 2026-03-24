import { WorkflowModel } from "@repo/db/schema";
import { CreateWorkflowSchema, CreateWorkflowZodSchema, HttpNodeRuleType, NodeType, TriggerInMinute, WorkFlowUpdate } from "@repo/types/types";
import { Request, Response } from "express";


let cachedWorkflow = new Map<string,object>()



export async function getWorkFlows(req:Request,res:Response) {


   const response=await WorkflowModel.find().limit(10).exec()

   res.status(200).json({message:"success",data:response})



}


export async function createWorkFlow(req:Request,res:Response) {
    try {
        
        const body= req.body ;


        if(!body){
            res.status(204).json({message:"Empty field"});
            return
        }

        const {success}= CreateWorkflowZodSchema.safeParse(body);
        if(!success){
        res.status(400).json({ message: "Invalid workflow data" });
        return;
        }


       const response =  await WorkflowModel.create(body);

       cachedWorkflow.set(response.id.toString(),response);

        res.status(200).json({message:"success",data:response})
    

    } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the workflow", error: (error as Error).message });
    }
}



export async function updateWorkFlow(req:Request,res:Response){


    try {
        const workflowId = req.query.id as string;
        const body = <WorkFlowUpdate>req.body;

        if(!workflowId){
        res.status(400).json({ message: "Workflow ID is required" });
        return;
        }

        if(!body || !body.nodeType){
        res.status(400).json({ message: "Invalid or missing nodeType in body" });
        return;
        }




        if(body.nodeType==='trigger'){

            const rule:TriggerInMinute = body.rule as TriggerInMinute

            const response = await workflowinsertion(workflowId,body.nodeType,{time:rule.time*60000})
            if(!response){
                res.status(404).json({message:'Workflow not found'});
            }
           res.status(200).json(response);
           return;

        }else if(body.nodeType==='http-request'){
            const rule:HttpNodeRuleType= body.rule as HttpNodeRuleType
            const response = await workflowinsertion(workflowId,body.nodeType,rule)
            if(!response){
                res.status(404).json({message:'Workflow not found'});
            }
            res.status(200).json(response);
            return;
        }


        res.status(200).json("ok")
    } catch (error) {
        
    }

    



}


async function workflowinsertion (id:string,nodeType:NodeType,data:object):Promise<CreateWorkflowSchema|null>{


    const getWorkflow = await WorkflowModel.findById({_id:id})

    if(getWorkflow){

        getWorkflow.nodes={
            ...getWorkflow.nodes,
            [nodeType]:data
        }


       await WorkflowModel.updateOne(
            {_id:id},
            {
                $set:{
                    nodes:getWorkflow.nodes
                }
            }
        )

        return getWorkflow as CreateWorkflowSchema


    }else{
        return null;
    }

    
}