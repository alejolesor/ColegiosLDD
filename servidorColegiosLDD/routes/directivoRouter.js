const express = require('express');
const bodyParser = require('body-parser');
var Directivo = require('../models/directivo');
var authenticate = require('../authenticate');

const directivoRouter = express.Router();

directivoRouter.use(bodyParser.json());

directivoRouter.route('/')

.get((req,res,next) => {
    Directivo.find({})
    .populate('comments.author')
    .then((directivos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(directivos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Directivo.create(req.body)
    .then((directivo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({id:directivo._id});
    }, (err) => next(err))
    .catch((err)=>{next(err)})
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /directivos');
})
.delete((req, res, next) => {
    res.end('Eliminando todos los directivos');
});

directivoRouter.route('/:numero_documento')
.get((req,res,next) => {
    Directivo.findById(req.params.numero_documento)
    .populate('comments.author')
    .then((directivo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(directivo);
    }, (err) => next(err))
    .catch((err) => next(err));
});

directivoRouter.route('/:directivoId/comments')
.get((req,res,next) => {
    Directivo.findById(req.params.numero_documento)
    .populate('comments.author')
    .then((directivo) => {
        if (directivo != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(directivo.comments);
        }
        else {
            err = new Error('Lo siento :(  ' + req.params.numero_documento + ' NO existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Directivo.findById(req.params.numero_documento)
    .then((directivo) => {
        if (directivo != null) {
            req.body.author = req.user._id;
            directivo.comentarios.push(req.body);
            directivo.save()
            .then((directivo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(directivo);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Lo siento :( ' + req.params.numero_documento + ' no existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

directivoRouter.route('/:directivoId/comments/:commentId')
.get((req,res,next) => {
    Directivo.findById(req.params.numero_documento)
    .populate('comments.author')    
    .then((directivo) => {
        if (directivo != null && directivo.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(directivo.comments.id(req.params.commentId));
        }
        else if (directivo == null) {
            err = new Error('Lo siento :( este lugar  ' + req.params.numero_documento + ' no existe');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Lo siento :( no hay comentarios con id:  ' + req.params.commentId + ' ');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = directivoRouter;