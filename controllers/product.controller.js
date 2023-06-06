const { responseCreator } = require('../utils/utils');
const Product = require('../schemas/product.schema');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

//Obtener todos los usuarios
const getAllProducts = async (req, res) => {
    const limit =  5;
    const itemsToSkip = limit * (req.query.skip - 1)


    const productos = await Product.find().limit(limit).skip(itemsToSkip)
    

    const total = await Product.countDocuments();

    
return responseCreator(res, 200, 'Productos obtenidos correctamente', {productos, total})
    
}


//Agregar Producto
async function addProduct(req, res){
    console.log(req.body)
    try{
        const product = new Product(req.body);
        //product.image = req.image;
        await product.save();
        
        return res.status(200).send({
            ok:true,
            msg: "Producto agregado correctamente",
            product
        })
    } catch(error) {
        return res.status(500).send({
            ok: false,
            msg: 'no se agrego el producto',
            error
        })
    }


    
}

//Obtener productos
const getProduct = async (req,res) => {
    console.log(req, res)
    try {
        const idParam = req.params.id;
        if(!idParam){
        return res.status(400).send({
        mgs:`Es necesario que mande ID`
        })
        }
        const product = await Product.findById(idParam).populate('category');    
        if(!product){
            return res.status(404).send({
                mgs:`No se encontro el producto`
            })
        }    
        res.status(200).send({
            msg: 'Producto encontrado',
            product
        });
    
    } catch (error) {
        return res.status(500).send({
            msg: 'Error al obtener el producto'
        });
    }
    
    
}

//Eliminar producto

const deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id)
    
        if(!deleteProduct){
            return res.status(404).send({mgr:'no se encontro el producto a borrar'});
            }

        return res.status(200).send({
            msg: 'Producto borrado correctamente',
            deleteProduct
        })
    
    }catch(error) {
        return res.status(500).send({
            msg: 'Error al borrar el producto'
        });
    }
}

//Actualizar producto
const updateProduct = async (req,res) => {
    try {
    const id = req.params.id;
    const data = req.body
    
    const updateProduct =  await Product.findByIdAndUpdate(id,data,{new:true})
    
    if(!updateProduct){
        return res.status(404).send({
            msg:`El producto no se actualizo`
        }) 
    }

    return res.status(200).send({
            msg: 'Producto actualizado correctamente',
            newProduct: updateProduct
        })
    
    } catch(error)  {
        console.log(error);
        return res.status(500).send({
            msg: `No se pudo actualizar el producto`
        })
    }
}
module.exports = {
    updateProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    addProduct
}
