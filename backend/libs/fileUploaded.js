import fileUpload from "express-fileupload"

export const fileUploaded = fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
})
