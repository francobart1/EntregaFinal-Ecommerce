const { responseCreator } = require('../utils/utils');
const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


//crear usuario
async function postUser(req, res) {

    try {
        console.log(req.body);

    const user = new User(req.body)
    user.role = "CLIENT_ROLE";

    //codificamos el password
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    user.password = passwordHash;

    const newUser = await user.save()


    console.log(user)

    return res.status(201).send({
        msg:`Usuario creado correctamente`,
        user: newUser
    });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg:`Error al crear usuario`,
        })
    }
    
}

const login = async(req, res) => {

    try {

    const emailLogin = req.body.email;
    const passwordLogin = req.body.password;

    if(!emailLogin || !passwordLogin) {
        return res.status(400).send({ msg: `Datos del login incompletos`})
    }
    const user = await User.findOne({email: emailLogin})

    if(!user) {
        return res.status(404).send({msg: `Datos de ingresos incorrectos`})
    }

    const result = await bcrypt.compare(passwordLogin, user.password);

    if(!result) {
        return res.status(404).send({msg: `Datos de ingresos incorrectos`})
    }

    user.password = undefined;

    const token = jwt.sign(user.toJSON(), secret);
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


async function getUser(req, res) {

    const id = req.params.id;

    if(req.user.role !== 'ADMIN_ROLE' && req.user._id !== id) {

        return responseCreator(res, 401, "No puede obtener este usuario")
    }

    
    try {
        const user = await User.findById(id, {
            __v: 0, 
            password: 0 });
        if(!user) return responseCreator(res, 404, `No se encontro el usuario`);

        

        return responseCreator(res, 200, `usuario encontrado`, {user})

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `No se pudo encontrar el usuario`)
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();

        if(!users) return res.status(404).send({ msg: `No se encontro usuarios`})

        return responseCreator(res, 200, `Usuarios obtenidos correctamente`, { users });




    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `Error al encontrar usuarios`)

    }

    
}

async function deleteUser(req, res) {
    try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if(!deletedUser) return responseCreator(res, 404, `No se pudo eliminar el usuario`);

    return responseCreator(res, 200, `Usuario eliminado corractamente`, {deletedUser})

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `Mensaje del error`)

    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;

        if (id !== req.user.id) {
            return responseCreator(res, 401, 'No puede modificar este usuario');
        }
        const data = req.body;

        data.password = undefined;
        
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true} );

        if(!updatedUser) return responseCreator(res, 404, `No se pudo actualizar`);

        return responseCreator(res, 200, `Usuario actaulizado correctamente`, {updatedUser});


    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `Error al actualizar el usuario`)
    }
}
async function updatePassword(req, res) {
    try {
        const id = req.params.id;
        const oldPassword = req.body.oldPassword
        let newPassword = req.body.newPassword

        const user = await User.findById(id);

        if(!user) return responseCreator(res, 404, `No se encontro el usuario`);

        const pwdCompare = await bcrypt.compare(oldPassword, user.password);

        if(!pwdCompare) return responseCreator(res, 401, `No se pudo modificar la contraseña.`);

        newPassword = await bcrypt.hash(newPassword, saltRounds);
        
        await User.findByIdAndUpdate(id, { password: newPassword});

        return responseCreator(res, 200, `Password actualizado correctamente!`)


    }catch (error) {
        console.log(error);
        return responseCreator(res, 500, `No se pude actualizar el usuario`)
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