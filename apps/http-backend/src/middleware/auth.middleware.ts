import { NextFunction, Request, Response } from "express";
import HttpResponse from "../lib/httpResponse.js";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

const tokenSecret = Bun.env.TOKEN_SECRET_KEY as string;

interface JwtPayload{
    email:string,
    id:string,
    iat:number,
    exp:number
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {



    try {

        const getToken = req.headers["authorization"];

        if(!getToken|| !getToken?.startsWith("Bearer")){
            res.status(401).json(new HttpResponse(false,"Invalid Token"))
            return;
        }

        const token = getToken.replace("Bearer ","");

        const verifyToken =  jwt.verify(token,tokenSecret) as JwtPayload
        
        req.user=verifyToken;

        next()

    } catch (error) {
       if(error instanceof JsonWebTokenError){
        res.status(401).json(new HttpResponse(false,error.message));
       }else{
        res.status(500).json(new HttpResponse(false,"Something went wrong"));

       }
    }





}