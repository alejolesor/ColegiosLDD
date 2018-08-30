const express = require('express');
const bodyParser = require('body-parser');

const colegioRouter = express.Router();

colegio.use(bodyParser.json());

colegioRouter.route('/')
.all((req,res,next) => {
    console.log("Aglo esta pasando");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Este metodo retornara la lista de colegios');
})
.post((req, res, next) => {
    res.end('Se agregare el colegio ' + req.body.nombre + ' que vive en : ' + req.body.direccion);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /colegios');
})
.delete((req, res, next) => {
    res.end('Eliminando todos los colegios');
});

colegioRouter.route('/:colegioId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Colegio: '+req.params.nit);
});
module.exports = colegioRouter;