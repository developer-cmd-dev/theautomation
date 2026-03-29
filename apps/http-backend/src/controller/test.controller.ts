import { CreateWorkflowZodSchema, HttpRequestPayload, NodeType, WorkFlowUpdate } from "@repo/types/types";
import { type Request, type Response } from "express";
import HttpResponse from "../lib/httpResponse";
import { WorkflowModel } from "@repo/db/schema";
import { httpNode } from "@repo/executors/index.ts";

export async function test(req: Request, res: Response) {
    try {

        const data = req.body as { _id: string, nodeToTest: object };

        const responseDb = await WorkflowModel.findById(data._id);

        if (!responseDb) {
            res.status(404).json(new HttpResponse(false, "Workflow not found"))
            return
        }


        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        let result: object = {};


        for (let keys in responseDb.nodes) {
            if (keys === "trigger") {

                const time={
                    currentTime:Date.now(),
                    runEveryMinute:responseDb.nodes[keys]["time"] * 60000
                }

                res.write(`data: ${JSON.stringify(new HttpResponse(true, "success", time))}\n\n`);


            } else if (keys === 'http-request') {
                const executionResult = await httpNode(responseDb.nodes[keys]);
                res.write(`data: ${JSON.stringify(new HttpResponse(true, "success", executionResult))}\n\n`);

            }

            if (keys === Object.keys(data.nodeToTest)[0]) {
                res.end()
                break;
            }
        }






    } catch (error) {

    }
}