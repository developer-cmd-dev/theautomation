import { type Response, Router } from "express";
import { createWorkFlow, getWorkFlows, updateWorkFlow } from "../controller/workflow.controller.js";
import { createCredential, deleteCredential, testCredential } from "../controller/credential.controller.js";
import { signup, singin } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { cloudinaryUpload } from "../lib/cloudinary.js";
import HttpResponse from "../lib/httpResponse.js";
import { uploadFile } from "../controller/files.controller.js";
import { test } from "../controller/test.controller.js";
import { UserModel } from "@repo/db/client";
import mongoose from 'mongoose'

const router: Router = Router();



router.post("/signup",signup)
router.get("/signin",singin)

router.get("/get-workflow",authMiddleware, getWorkFlows)
router.post("/create-workflow",authMiddleware, createWorkFlow)
router.patch("/update",authMiddleware, updateWorkFlow)
router.post("/credential",authMiddleware,createCredential)
router.delete("/credential",authMiddleware,deleteCredential)
router.get("/test-credential",authMiddleware,testCredential)
router.post("/upload",authMiddleware,upload.single("file",),uploadFile)

router.get("/test",authMiddleware,test)


export default router