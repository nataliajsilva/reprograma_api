const express = require('express')
const app = express ()

// rotas
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')

app.all('*', function(request,response,next){
    console.log("Passando pelo app meuuu")
    next ()
})

app.use('/', index)
app.use('/alunas',alunas)

module.exports = app