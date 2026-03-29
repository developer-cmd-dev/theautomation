import { file, pathToFileURL } from 'bun';
import { UploadApiResponse } from 'cloudinary'
import cloudinary from '../config/cloudinaryconfig.js';


export async function cloudinaryUpload(fileData: Express.Multer.File): Promise<UploadApiResponse> {
  try {


    const response = await cloudinary.uploader.upload(fileData.path);

    await Bun.file(fileData.path).delete()
    return response;
  } catch (error) {
    await Bun.file(fileData.path).delete()
    throw error
  }

}