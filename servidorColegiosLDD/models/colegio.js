
var mongoose= require('mongoose');
var Esquema=mongoose.Schema;

var esquemaColegio= new Esquema({
    nit:{
        type:Number,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    telefono:{
        type:Number,
        required:true
    }

});

module.exports= mongoose.model('Estudiante',esquemaEstudiante);