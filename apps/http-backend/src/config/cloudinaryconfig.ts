import { v2 as cloudinary } from "cloudinary";
import "dotenv"

const CLOUD_NAME=Bun.env.CLOUD_NAME as string;
const CLOUDINARY_API_KEY=Bun.env.CLOUDINARY_API_KEY as string;
const CLOUDINARY_API_SECRET=Bun.env.CLOUDINARY_API_SECRET as string;


cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
})


export default cloudinary