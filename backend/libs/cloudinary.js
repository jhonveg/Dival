import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config();




cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
    
  });





export async function uploadImage (filePath){
    return await cloudinary.uploader.upload(filePath, {
        folder: 'avatars',
        transformation: [
            {radius: 20},
            {width: 90, height: 90, crop: "thumb"},
            
          
        ]
    })
}


export async function deleteImage(publicId){

 return   await cloudinary.uploader.destroy(publicId);

}


export async function uploadCourseImage (filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'courses'
    })
}



