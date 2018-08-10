module.exports={
    'secretKey': '123456789-987654321',
    'mongoUrl' : process.env.MONGO_DEV || process.env.MONGO_MASTER|| 'mongodb://localhost:27017/claseServidor',
    'facebook' : {
        clientId: '442501879581632',
        clientSecret: '9cd90f3fa984e954b4f85ce8b46198a7'
    }
}