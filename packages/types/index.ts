import { password } from "bun";
import * as z from "zod";

export const CreateWorkflowZodSchema = z.object({
    name: z.string(),
    connections: z.object().array(),
    nodes: z.object(),
    isActive:z.boolean().default(false)

})

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT",
    TRACE = "TRACE"

}

export const HttpRequestPayloadZodSchema = z.object({
    url: z.string(),
    method: z.enum(HttpMethods),
    data: z.any().optional(),
    params: z.record(z.string(),z.string()).optional(),
    headers: z.record(z.string(),z.string()).optional(),
    timeout: z.number().optional(),
    responseType: z.enum([
        'json',
        'arraybuffer',
        'blob',
        'document',
        'text',
        'stream'
    ]).optional(),
 

});


export const GeminiPayloadZodSchema = z.object({
    resources:z.string(),
    operation:z.string(),
    model:z.string(),
    message:z.string(),
    simplifyOutput:z.boolean().default(false),
    jsonOutput:z.boolean().default(false),
    fileUrl:z.string().optional()
})

export type GeminiPayload = z.infer<typeof GeminiPayloadZodSchema>


export type HttpRequestPayload = z.infer<typeof HttpRequestPayloadZodSchema>






export type NodeType = 'trigger' | 'gemini-model' | 'http-request' | 'code' | 'google-docs'


export const TriggerInMinuteZodSchema = z.object({
    timeInMinutes:z.number().default(1)
})

export type TriggerInMinute = z.infer<typeof TriggerInMinuteZodSchema>



export interface WorkFlowUpdate {
    nodeType: NodeType,
    connections:object[];
    nodeConfig: object;
    isActive:boolean;
}


export const CredentialZodSchema= z.object({
    workflowId:z.string(),
    name:z.string(),
    type:z.string(),
    data:z.object(),
    apiKey:z.string().optional()
})



export const TestCredentialZodSchema = z.object({
    workflowId:z.string(),
    credentialId:z.string(),
    hostUrl:z.string(),
    accountName:z.string(),
    apiKey:z.string()
})



export type CredentialsType = z.infer<typeof CredentialZodSchema> 

export type CreateWorkflowSchema = z.infer<typeof CreateWorkflowZodSchema>

export type testCredential = z.infer<typeof TestCredentialZodSchema>



export const UserSignUpZodSchema = z.object({
    name:z.string(),
    email: z.string().email(),
    password: z.string()
})


export const UserSignInZodSchema = z.object({
    email:z.string().email(),
    password:z.string()
})


export type UserSignUp = z.infer<typeof UserSignUpZodSchema>
export type UserSignIn = z.infer<typeof UserSignInZodSchema>
