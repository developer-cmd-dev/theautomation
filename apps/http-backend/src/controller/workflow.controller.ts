import { WorkflowModel } from "@repo/db/schema";
import { CreateWorkflowSchema, CreateWorkflowZodSchema, HttpRequestPayloadZodSchema, NodeType, TriggerInMinuteZodSchema, WorkFlowUpdate } from "@repo/types/types";
import { Request, Response } from "express";
import HttpResponse from "../lib/httpResponse.js";


let cachedWorkflow = new Map<string, object>()



export async function getWorkFlows(req: Request, res: Response) {


    const response = await WorkflowModel.find().limit(10).exec()

    res.status(200).json(new HttpResponse(true, 'success', response))



}


export async function createWorkFlow(req: Request, res: Response) {
    try {

        const body = req.body;


        if (!body) {
            res.status(204).json(new HttpResponse(false, "Empty field"));
            return
        }

        const { success } = CreateWorkflowZodSchema.safeParse(body);
        if (!success) {
            res.status(400).json(new HttpResponse(false, "Invalid workflow data"));
            return;
        }


        const response = await WorkflowModel.create(body);

        cachedWorkflow.set(response.id.toString(), response);

        res.status(200).json(new HttpResponse(true, "success", response))


    } catch (error) {
        res.status(500).json(new HttpResponse(false, 'Something went wrong'));
    }
}



export async function updateWorkFlow(req: Request, res: Response) {


    try {
        const workflowId = req.query.id as string;
        const body = <WorkFlowUpdate>req.body;

        if (!workflowId) {
            res.status(400).json(new HttpResponse(false, "Workflow ID is required"));
            return;
        }

        if (!body || !body.nodeType) {
            res.status(400).json(new HttpResponse(false, "Invalid or missing nodeType in body"));
            return;
        }




        if (body.nodeType === 'trigger') {

            const { success, data } = TriggerInMinuteZodSchema.safeParse(body.nodeConfig);

            if (!success) {
                res.status(422).json(new HttpResponse(false, "Invalid input"))
                return
            }


            const response = await workflowinsertion(workflowId, body.nodeType, { time: data?.timeInMinutes * 60000 })
            if (!response) {
                res.status(404).json(new HttpResponse(false, 'Workflow not found'));
            }
            res.status(200).json(response);
            return;

        } else if (body.nodeType === 'http-request') {
            const { success, data } = HttpRequestPayloadZodSchema.safeParse(body.nodeConfig);

            if (!success) {
                res.status(422).json(new HttpResponse(false, "Invalid input"))
                return
            }


            const response = await workflowinsertion(workflowId, body.nodeType, data)
            if (!response) {
                res.status(404).json(new HttpResponse(false, 'Workflow not found'));
            }
            res.status(200).json(response);
            return;
        } else if (body.nodeType === 'code') {

            const scriptData = body.nodeConfig;
            if (!scriptData) {
                res.status(422).json(new HttpResponse(false, "Invalid Input"))
                return
            }

            const response = await workflowinsertion(workflowId, body.nodeType, scriptData)
            res.status(200).json(new HttpResponse(true, "success", response))


        }else if(body.nodeType==='gemini-model'){
            

            
        }


        res.status(200).json("ok")
    } catch (error) {

    }





}


async function workflowinsertion(id: string, nodeType: NodeType, data: object): Promise<CreateWorkflowSchema | null> {


    const getWorkflow = await WorkflowModel.findById({ _id: id })

    if (getWorkflow) {

        getWorkflow.nodes = {
            ...getWorkflow.nodes,
            [nodeType]: data
        }


        await WorkflowModel.updateOne(
            { _id: id },
            {
                $set: {
                    nodes: getWorkflow.nodes
                }
            }
        )

        return getWorkflow as CreateWorkflowSchema


    } else {
        return null;
    }


}