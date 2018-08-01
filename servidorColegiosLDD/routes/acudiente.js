var express = require('express');
var router = express.Router();
var Acudiente=require('../models/acudiente');
/* GET acudiente listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource of acudiente');
});

router.post('/crear',(req,res,next)=>{
    Acudiente.create(req.body,(err,acudiente)=>{
    if(err){ next(err)}
    else{
      var ok={
        estado:"ok",
        id:acudiente._id
      }
      res.json(ok)
    }
  })
})
module.exports = router;