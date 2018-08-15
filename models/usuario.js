var mongoose=require('mongoose');
var passportLocalMogoose = require('passport-local-mongoose');
var Esquema=mongoose.Schema;
var usuario=new Esquema({
    username:{
        type:String
    },
    password:String,
    primernombre:String,
    segundonombre:String,
    correo:{
        type:String,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    admin:{
        type: Boolean,
        default: false
    },
    facebookId: String
});
usuario.plugin(passportLocalMogoose);
module.exports=mongoose.model('usuario',usuario);
