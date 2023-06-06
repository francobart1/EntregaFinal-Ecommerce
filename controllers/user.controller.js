const { responseCreator } = require('../utils/utils');
const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;


//crear usuario
async function postUser(req,res){
    try {
        const user = new User(req.body);
        const passHash = await bcrypt.hash( user.password,saltRounds); 
        user.password = passHash;
        const newUser = await user.save();
        return res.status(201).send({
            msg:`Usuario creado correctamente`,
            user: newUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('El usuario no se pudo guardar');
    }
}

//Inicio
const login = async(req, res) => {

    try {
        //email y password
    const emailLogin = req.body.email;
    const passwordLogin = req.body.password;

    //checkeo que me hayan enviado todos los datos requeridos para el login
    if(!emailLogin || !passwordLogin) {
        return res.status(400).send({ msg: `Datos del login incompletos`})
    }

    //buscar si existe un usuario con dicho email
    const user = await User.findOne({email: emailLogin})

    if(!user) {
        return res.status(404).send({msg: `Datos de ingresos incorrectos`})
    }

    //comprobamos si el usuario obtenido en su propiedad password coincide con el password que me envia el usuario en el login
    const result = await bcrypt.compare(passwordLogin, user.password);

    if(!result) {
        return res.status(404).send({msg: `Datos de ingresos incorrectos`})
    }

    user.password = undefined;

    const token = jwt.sign(JSON.stringify(user), secret);

    console.log(token)

    return res.status(200).send({
        msg: `Login correcto`,
        user,
        token
    })

    } catch(error) {
        console.log(error);
        return res.status(500).send(`No se encontro el login`)
    }


    




}

//obtener usuario
async function getUser(req, res) {

    const id = req.params.id;

    if(req.user.role !== 'ADMIN_ROLE' && req.user.id !== id) {

        return responseCreator(res, 401, "No puede obtener este usuario")
    }

    
    try {
        const user = await User.findById(id, { 
            password: 0 });
        if(!user) {
            return responseCreator(res, 404, `No se encontro el usuario`)
        }

        

        return responseCreator(res, 200, `usuario encontrado`, {user})

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `No se pudo encontrar el usuario`)
    }
}

//obtener todos los usuarios
async function getAllUsers (req,res){
    try {
        const user = await User.find({ email: { $ne: "admin@gmail.com" } });
        if(!user){
            return res.status(404).send({msg:`No se encontraron del usuarios`})  
        }
        return responseCreator(res,200,'Ususarios obtenidos correctamente',{user})
    } catch (error) {
        return res.status(500).send({msg: `Error al obtener usuarios`})
    }
}

//eliminar usuario
async function deleteUser(req, res) {
    try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if(!deletedUser) {
        return responseCreator(res, 404, `No se pudo eliminar el usuario`);
        }

    return responseCreator(res, 200, `Usuario eliminado corractamente`, {deletedUser})

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `Mensaje del error`)

    }
}

//modificar usuario
async function updateUser(req,res){

    try {
        const id = req.params.id;

        if(req.user.role !== 'ADMIN_ROLE' && id !== req.user._id){
            return responseCreator(res,401,'No tiene permiso para modificar')
        }

        const data = req.body;
        data.password = undefined;
        const updateUser = await User.findByIdAndUpdate(id,data,{new:true});
        if(!updateUser){
            return responseCreator(res,404,'No se encontro el usuario') 
        }
        return responseCreator(res,200,'Ususarios actualizado correctamente',{updateUser});
    } catch (error) {
        return responseCreator(res,500,'error al actualizar el usuarios')
    }
    
}

//actualizar password
async function updatePassword(req,res){
    try {
        const id = req.params.id;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const user = await User.findById(id);
        if(!user){
            return responseCreator(res,404,'No se encontro el usuario') 
        }
        
        const pwdCompare = await bcrypt.compare(oldPassword,user.password)
        
        if(!pwdCompare)
            return responseCreator(res,401,'No se pudo modificar la contraseña')
            
        const nuevoPassword = await bcrypt.hash(newPassword,saltRounds);
        
        await User.findByIdAndUpdate (id,{password: nuevoPassword})
            
        return responseCreator(res,200,'Password actualizado correctamente');
    
    
    } catch (error) {
        console.log(error)
        return responseCreator(res,500,'error al actualizar el password')
    }
    
}



module.exports = {
    postUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    login,
    updatePassword
}