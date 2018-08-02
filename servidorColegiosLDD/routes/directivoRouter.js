const express = require('express');
const bodyParser = require('body-parser');

const directivoRouter = express.Router();

directivoRouter.use(bodyParser.json());

directivoRouter.route('/')
.all((req,res,next) => {
    console.log("Aglo esta pasando");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); 
    next();
}) 
.get((req,res,next) => {
    res.end('Este metodo retornara la lista de directivos'); 
})
.post((req, res, next) => {
    res.end('Se agregare el directivo ' + req.body.nombre + ' con identificacón : ' + req.body.numero_documento);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /directivos');
})
.delete((req, res, next) => {
    res.end('Eliminando todos los directivos');
});

directivoRouter.route('/:directivoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Estudiante: '+req.params.directivoId);
});
module.exports = directivoRouter;