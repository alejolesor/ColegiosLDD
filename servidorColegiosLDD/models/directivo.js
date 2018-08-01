
var mongoose= require('mongoose');
var Esquema=mongoose.Schema;

var esquemaDirectivo= new Esquema({
    tipo_doc:{
        type:String,
        required:true
    },
    numero_documento:{
        type:Number,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    celular:{
        type:Number,
        required:true
    }
});

module.exports= mongoose.model('Directivo',esquemaDirectivo);