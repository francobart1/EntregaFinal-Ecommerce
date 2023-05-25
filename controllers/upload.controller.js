const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');




const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, 'public/upload/product')},

        filename: (req, file, callback) => {
            const fileExt = file.originalname.split('.').at(-1);

            const fileName = `${uuidv4()}.${fileExt}`;


            req.image = fileName;

            callback(null, fileName)
            
        }
    


})


const uploadMulter = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10},
    fileFilter: (req, file, callback) => {
        const type = file.mimetype.split('/')[0]
        
        type === 'image' ? callback(null, true) : callback(null, false);

    }
})

const uploadProduct = uploadMulter.single('file');








module.exports = {
    uploadProduct,
    
}