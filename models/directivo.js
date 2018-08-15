
var mongoose= require('mongoose');
var Esquema=mongoose.Schema;

var commentSchema = new Esquema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios' /// Aqui debemos modificar por nuestro modelo de usuarios 
    }
}, {
    timestamps: true
});

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
    }, 
    comentarios:[commentSchema]
});

module.exports= mongoose.model('Directivo',esquemaDirectivo);