import { CreateWorkflowZodSchema, CredentialZodSchema, HttpMethods, TestCredentialZodSchema } from "@repo/types/types";
import { type Response, Request } from "express";
import HttpResponse from "../lib/httpResponse.js";
import { CredentialsModel, WorkflowModel } from "@repo/db/schema";
import { api } from "../lib/axios.js";



export async function createCredential(req: Request, res: Response) {

    try {

        const { success, data } = CredentialZodSchema.safeParse(req.body);
        if (!success) {
            res.status(404).json(new HttpResponse(false, "Invalid input"))
            return;
        }

        const findWorkflow = await WorkflowModel.findById({ _id: data.workflowId })
        if (!findWorkflow) {
            res.status(404).json(new HttpResponse(false, "Workflow not found"))
        }

        const credentialResponse = await CredentialsModel.create(data)

        findWorkflow?.credentials.push(credentialResponse._id);
        findWorkflow?.save();

        res.status(200).json(new HttpResponse(true, "success", credentialResponse))


    } catch (error) {
        console.log(error)
    }
}


export async function deleteCredential(req: Request, res: Response) {

    try {

        const credentialId = req.query.id as string;

        if (!credentialId) {
            res.status(400).json(new HttpResponse(false, "Invalid Id"));
            return;
        }

        const response = await CredentialsModel.findOneAndDelete({ _id: credentialId });
        if (response) {
            const getUpdate = await WorkflowModel.updateOne(
                { credentials: response._id },
                { $pull: { credentials: response._id } }
            )
        }

        res.status(200).json(new HttpResponse(true, "Credential Deleted", response));

    } catch (error) {
        console.log(error)
    }

}


export async function testCredential(req:Request,res:Response) {
    
    try {

        const{success,data} = TestCredentialZodSchema.safeParse(req.body);

        if(!success){
            res.status(400).json(new HttpResponse(false,"Invalid Input"))
            return
        }
        const getCredential =await api({
            url:data?.hostUrl,
            method:HttpMethods.GET,
            headers:{
                "x-goog-api-key":data.apiKey
            }
        })

        if(getCredential.error){
            res.status(Number(getCredential.error.code)).json(new HttpResponse(false,getCredential.error.message));
            return
        }


        res.status(200).json(new HttpResponse(true,"success",getCredential))

        
    } catch (error) {
        console.log(error)
    }

}