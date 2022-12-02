const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Not found token in the request'
        });
    }

    try {
        
        const { id, rol } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.rol = rol;


    } catch (error) {
        return res.status(401).json({
            msg: 'Token Invalid'
        });
    }

    next();
}


module.exports = {
    validateJWT
}