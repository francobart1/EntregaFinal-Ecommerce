const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//const Product = require('../schemas/product.shema')

const checkImageExist = async(req, res) => {
    if(req.body.imgage) {
        const id = req.params.id;
        const product = Product.findById(id);
        if(req.body.image !== product.image);
        {
            return res.status(400).send('Error')
        }
    }
}

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, 'public/upload/product')},

        filename: (req, file, callback) => {
            const fileExt = file.originalname.split('.').at(-1);

            const fileName = req.body.image
            if(!req.bopy.image){
                fileName = `${uuidv4()}.${fileExt}`
            }
            

            req.body.image = fileName;

            callback(null, fileName)
            
        }
    


})


const uploadMulter = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10},
    fileFilter: (req, file, callback) => {
        file.mimetype.split('/')[0],
        
        type === 'image' ? callback(null, true) : callback(null, false);

    }
})

//const uploadProduct = uploadMulter.single('file');








module.exports = {
    //uploadProduct,
    //checkImageExist
}