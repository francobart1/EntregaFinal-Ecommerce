const { responseCreator } = require('../utils/utils');
const Product = require('./../schemas/product.shema')

//Obtener todos los usuarios
const getAllProducts = async (req, res) => {
    const limit =  5;
    const itemsToSkip = limit * (req.query.skip - 1)


    const productos = await Product.find().limit(limit).skip(itemsToSkip)
    

    const total = await Product.countDocuments();

    
return responseCreator(res, 200, 'Productos obtenidos correctamente', {productos, total})
    
}


//Agregar Producto
function addProduct(req, res){
    console.log(req.body)
    console.log(req.file)

    const product = new Product(req.body);



    product.save().then(function(product){

        res.status(200).send(`Añadir Producto`);




    }).catch(error => {
        console.log(error);
        res.status(500).send('el producto no se pudo guardar')
    })

    
}

//Obtener productos
function getProduct(req, res) {
    const id = req.query.id
    const idParams = req.params.idEnElPath
    if(!id){
        return res.status(400).send({
            msg: 'Es necesario que mande un ID'
        })
    }


Product.findById(id).then((product) => {
    if(!product){
        return res.status(400).send({
            msg:'No se encontro el producto'
        })
    }
})


return res.status(200).send({
    msg:'producto encontrado', 
    product
})


//Eliminar producto
}
function deleteProduct(req,res) {
    
    res.status(200).send('prodcuto borrado');

}

//Actualizar producto
async function updateProduct(req, rest) {
    try {
    const id = req.query.id;
    const data = req.body

    const newProcuct = await Product.findByIdAndUpdate(id, data, {new: true} )
    if(!newProcuct) {
        return res.status(404).send({
            msg:'producto no se actualizo',
            newProcuct: newProcuct
        })
    }
    return res.status(200).send({
        msg:'producto actualizado',
        newProcuct: newProcuct
    })
} catch (error){
    console.log(error);
    return res.status(500).send({
        msg:'no se pudo actualizar el producto'
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
