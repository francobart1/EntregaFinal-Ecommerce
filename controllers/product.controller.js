const { responseCreator } = require('../utils/utils');
const Product = require('../schemas/product.schema')

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

    const product = new Product(req.body);
    console.log(product)


    product.save()
                .then(function(product){

            return res.status(200).send({
                msg: 'Producto guardado corractamente',
                product
        })




    }).catch(error => {
        console.log(error);
        res.status(500).send('el producto no se pudo guardar')
    })


    
}

//Obtener productos
function getProduct(req, res) {
    const id = req.params.id

    if(!id){
        return res.status(400).send({
            msg: 'Es necesario que mande un ID'
        })
    }


    Product.findById(id).then((product) => {

        if(!product){
            return res.status(404).send({
            msg:'No se encontro el producto'
        })
    }
    return res.status(200).send({
        msg:'Producto encontrado', 
        product
    })

    }).catch((error) => {
        console.log(error)
        return res.status(500).send({
            msg: 'Error al obtener producto'
        })
    })

    

}

//Eliminar producto

function deleteProduct(req,res) {

    const id = req.params.id
    
    Product.findByIdAndDelete(id).then((deleted)=> {
        if(!deleted) {
            return res.status(404).send("Error al borrar producto")
        }
        return res.status(200).send({
            msg: "Producto borrado correctamente",
            deleted
        });

    }).catch(error=> {
        console.log(error);
        return res.status(500).send("Error al borrar producto")
    })

    console.log(req.params)

}

//Actualizar producto
async function updateProduct(req, res) {
    try {
        const id = req.query.id;
        const data = req.body

    const newProduct = await Product.
    findByIdAndUpdate(id, data, {new: true})

    if(!newProduct) {
        return res.status(404).send({
            msg:'Producto no se actualizo',
        })
    }
    return res.status(200).send({
        msg:'Producto actualizado',
        newProduct: newProduct
    })
} catch (error){
    console.log(error);
    return res.status(500).send({
        msg:'No se pudo actualizar el producto'
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
