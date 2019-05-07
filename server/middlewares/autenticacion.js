var jwt = require('jsonwebtoken');

// ======================
// Verificar Token
// ======================
let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            })
        }

        req.usuario = decoded.usuario;
        next(); //Hay que usar el next para continuar si no termina la función y no continua en usuario 

    })

};

// ======================
// Verificar Token
// ======================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }

};

// ======================
// Verificar Token para imagen
// ======================
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            })
        }

        req.usuario = decoded.usuario;
        next(); //Hay que usar el next para continuar si no termina la función y no continua en usuario 

    })
}



module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
}