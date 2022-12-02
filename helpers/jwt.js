require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = (id, rol) => {
    return new Promise( (resolve, reject) => {
        const payload = { id, rol };
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('don-t can create the token');
            }

            resolve( token );

        })
    })

}

module.exports = {
    generateJWT
}