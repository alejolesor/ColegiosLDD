
var mongoose= require('mongoose');
var Esquema=mongoose.Schema;

var esquemaacudiente= new Esquema({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    edad:{
        type:Number,
        required:true
    }
});

module.exports= mongoose.model('acudiente',esquemaacudiente);