import { UserSignInZodSchema, UserSignUpZodSchema } from "@repo/types/types";
import { type Request,type Response } from "express";
import HttpResponse from "../lib/httpResponse.js";
import {  UserModel } from "@repo/db/client";
import jwt from 'jsonwebtoken'
import "dotenv"
import { password } from "bun";

const tokenSecret = Bun.env.TOKEN_SECRET_KEY as string;


export async function signup(req:Request,res:Response) {
    try {
        
        const {success,data}=UserSignUpZodSchema.safeParse(req.body);

        if(!success){
        return res.status(400).json(new HttpResponse(false,"Invalid Input"));
        }


        const checkUserAvailable = await UserModel.findOne({email:data.email});
        if(checkUserAvailable){
            res.status(409).json(new HttpResponse(false,"Email already exist"));
            return
        }
      

        const hashedPassword = await Bun.password.hash(data.password);
        
        const response = await UserModel.create({
            ...data,
            password:hashedPassword
        });

    
        res.status(200).json(new HttpResponse(true,"SignedUp Successfully"))


    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
        }
        res.status(500).json(new HttpResponse(false,"Something went wrong"))
        return;
    }
}



export async function singin(req:Request,res:Response) {
    try {
        
        const {success,data}=UserSignInZodSchema.safeParse(req.body);

        if(!success){
        return res.status(400).json(new HttpResponse(false,"Invalid Input"));
        }

        const findUser =await UserModel.findOne({
            email:data.email
        }).populate("workflows")

        if(!findUser){
            res.status(404).json(new HttpResponse(false,"User not found"));
            return
        }

        const comparePass = Bun.password.verify(data.password,findUser.password??"");
        if(!comparePass){
            res.status(404).json(new HttpResponse(false,"Invalid Credential"));
        }


        const token = jwt.sign({
            email:findUser.email,
            id:findUser._id
        },tokenSecret,{expiresIn:'24h'})
        

        res.status(200).json(new HttpResponse(true,"Signin Successfully",{
            ...findUser.toObject(),
            password:null,
            token
        }))


    } catch (error) {
        console.log(error)
        res.status(500).json(new HttpResponse(false,"Something went wrong"))
        return;
    }
}