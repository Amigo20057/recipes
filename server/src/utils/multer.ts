import multer from "multer";
import path from "node:path";

const pictureDir = path.join(__dirname, "../uploads/recipes-uploads");

const storagePicture = multer.diskStorage({
     destination: (req, file, cb) =>{
         cb(null, pictureDir);
     },
    filename: (req, file, cb) =>{
         const ext = path.extname(file.originalname);
         cb(null, `${Date.now()}${ext}`);
    }
});

export const uploadPictures = multer({storage: storagePicture});