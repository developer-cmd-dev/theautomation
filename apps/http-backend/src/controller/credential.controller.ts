import { CreateWorkflowZodSchema, CredentialZodSchema, HttpMethods, TestCredentialZodSchema } from "@repo/types/types";
import { type Response, type Request } from "express";
import HttpResponse from "../lib/httpResponse.js";
import { CredentialsModel, GeminiCredentialModel, mongoose, WorkflowModel } from "@repo/db/schema";
import { api } from "../lib/axios.js";



export async function createCredential(req: Request, res: Response) {

    try {

        const { success, data } = CredentialZodSchema.safeParse(req.body);
        console.log(success)
        if (!success) {
            res.status(404).json(new HttpResponse(false, "Invalid input"))
            return;
        }

        const session = await mongoose.startSession();

        session.withTransaction(async () => {
            const findWorkflow = await WorkflowModel.findById({ _id: data.workflowId })
            if (!findWorkflow) {
                res.status(404).json(new HttpResponse(false, "Workflow not found"))
            }

            const credentialResponse = await CredentialsModel.create(data)

            findWorkflow?.credentials.push(credentialResponse._id);
            findWorkflow?.save();

            res.status(200).json(new HttpResponse(true, "success", credentialResponse))
        })



        session.endSession();

    } catch (error) {
        res.status(500).json(new HttpResponse(false, "Something went wrong"));
    }
}


export async function deleteCredential(req: Request, res: Response) {

    try {

        const credentialId = req.query.id as string;

        if (!credentialId) {
            res.status(400).json(new HttpResponse(false, "Invalid Id"));
            return;
        }

        const session = await mongoose.startSession()

        session.withTransaction(async () => {
            const response = await CredentialsModel.findOneAndDelete({ _id: credentialId });
            if (response) {
                const getUpdate = await WorkflowModel.updateOne(
                    { credentials: response._id },
                    { $pull: { credentials: response._id } }
                )
            }

            res.status(200).json(new HttpResponse(true, "Credential Deleted", response));
        })

        session.endSession()

    } catch (error) {
        res.status(500).json(new HttpResponse(false, "Something went wrong"));
    }

}


export async function testCredential(req: Request, res: Response) {

    try {

        const { success, data } = TestCredentialZodSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json(new HttpResponse(false, "Invalid Input"))
            return
        }



        const getCredential = await api({
            url: data?.hostUrl,
            method: HttpMethods.GET,
            headers: {
                "x-goog-api-key": data.apiKey
            }
        })


        const response = await GeminiCredentialModel.create({
            accountName: "Google Gemini(PaLM) Api Account",
            isActive: true,
            isExpired: false,
            models: getCredential.models,
            apiKey: data.apiKey,
            userId: req.user.id,
            credentialId: data.credentialId
        })

        await CredentialsModel.updateOne(
            { _id: data.credentialId },
            { $set: { data: response } }
        )


        res.status(200).json(new HttpResponse(true, "success", response))


    } catch (error) {
        console.log(error)
        res.status(500).json(new HttpResponse(false, "Something went wrong"));
    }

}