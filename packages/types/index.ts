import * as z from "zod";

export const CreateWorkflowZodSchema = z.object({
    name: z.string(),
    connections: z.object().array(),
    nodes: z.object()

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
    resources:z.string()
})


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
}


export const CredentialZodSchema= z.object({
    workflowId:z.string(),
    name:z.string(),
    type:z.string(),
    data:z.object()
})

export type CredentialsType = z.infer<typeof CredentialZodSchema> 




export type CreateWorkflowSchema = z.infer<typeof CreateWorkflowZodSchema>