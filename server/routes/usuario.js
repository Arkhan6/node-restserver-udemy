const express = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const _ = require('underscore');

const app = express();

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // para comprobar en el campo google cuales son 'true'
    // Usuario.find({google:true})
    // Al poner los campos manualmente puede seleccionar que campos quieren que aparezcan.
    Usuario.find({}, 'nombre email role google img estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            // para comprobar en el campo google cuales son 'true'
            // Usuario.count({google:true}, (err, conteo) => {
            Usuario.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    usuario: usuarios,
                    cuantos: conteo
                })
            })

        });



});

app.post('/usuario', (req, res) => {


    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        // El status 200 está implícito por que no es necesario ponerlo
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     })
    // }
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })


    // res.json('put Usuario')
});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    // Usuario.findOneAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findOneAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })

});


module.exports = app;