const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { responseCreator } = require('../utils/utils');
async function jwtVerify(req, res, nex) {

try{

    const token = req.headers.authorization;


    const payload = jwt.verify(token, secret);

    req.user = payload;

    next();

    return responseCreator(res, 200, `Token ok`)

} catch (error) {
    console.log(error);
    return responseCreator(res, 500, `Error al ingresar, token no valido`)
}

}

module.exports = jwtVerify;