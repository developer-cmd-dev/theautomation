import { type Request,type Response } from "express";

export async function test(req:Request,res:Response) {
    try {
        


        res.status(200).json("ok")



    } catch (error) {
        
    }
}