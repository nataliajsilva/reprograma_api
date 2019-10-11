const express = require('express')
const app = express ()

// rotas
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')
const professoras = require("./routes/professorasRoute")

app.all('*', function(request,response,next){
    console.log("Passando pelo app meuuu")
    next ()
})

app.use('/', index)
app.use('/alunas',alunas)
app.use("/professoras", professoras)

module.exports = app