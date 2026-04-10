import { UserModel, WorkflowModel } from "@repo/db/client";
import { CreateWorkflowSchema, CreateWorkflowZodSchema, GeminiPayloadZodSchema, HttpRequestPayloadZodSchema, NodeType, TriggerInMinuteZodSchema, WorkFlowUpdate } from "@repo/types/types";
import { Request, Response } from "express";
import HttpResponse from "../lib/httpResponse.js";
import mongoose from 'mongoose'


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

        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            const response = await WorkflowModel.create(body);
            await UserModel.updateOne(
                { _id: req.user.id },
                { $set: { workflows: response._id } }
            )
            cachedWorkflow.set(response.id.toString(), response);
            res.status(200).json(new HttpResponse(true, "success", response))
        })

        session.endSession();
    } catch (error) {
        res.status(500).json(new HttpResponse(false, 'Something went wrong'));
    }
}



export async function updateWorkFlow(req: Request, res: Response) {


    try {
        const workflowId = req.query.id as string;
        const nodeConfigData = <WorkFlowUpdate[]>req.body;

        if (!workflowId) {
            res.status(400).json(new HttpResponse(false, "Workflow ID is required"));
            return;
        }

        const getWorkflow = await WorkflowModel.findOne({ _id: workflowId });

        if (!getWorkflow) {
            res.status(404).json(new HttpResponse(false, "Workflow not found"))
            return;
        }


        nodeConfigData.forEach((data) => {

            switch (data.nodeType) {
                case "trigger":
                    workflowinsertion(getWorkflow, data)
                    break;
                case "http-request":
                    workflowinsertion(getWorkflow, data)
                    break;
                case "code":
                    workflowinsertion(getWorkflow, data)
                    break;
                case "gemini-model":
                    workflowinsertion(getWorkflow, data)
                    break;

                case "google-docs":
                    workflowinsertion(getWorkflow,data)
                    break;
            }

        })


        getWorkflow.save()

        res.status(200).json(new HttpResponse(true, getWorkflow.nodes));

    } catch (error) {
        console.log(error),
            res.status(500).json(new HttpResponse(false, "Something went wrong"))
    }





}

async function workflowinsertion(workflow: any, data: WorkFlowUpdate) {
    workflow.nodes = {
        ...workflow.nodes,
        [data.nodeType]: data.nodeConfig
    }
}