import { type Request, type Response } from "express";
import HttpResponse from "../lib/httpResponse.js";
import { cloudinaryUpload } from "../lib/cloudinary.js";
import { FileUploadModel } from "@repo/db/client";

export async function uploadFile(req: Request, res: Response) {
    try {

        if (!req.file) {
            res.status(404).json(new HttpResponse(false, "File not found"))
            return;
        }

        const uploadData =await cloudinaryUpload(req.file);
        await FileUploadModel.create({
            fileName:uploadData.original_filename,
            fileUrl:uploadData.url,
            userId:req.user.id
        })
        res.status(200).json(uploadData.secure_url)

    } catch (error) {
        console.log(error)
        res.status(500).json(new HttpResponse(false, "Something went wrong"));
    }
}