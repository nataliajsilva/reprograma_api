const alunas = require("../model/alunas.json")

exports.get = (request,response) => {
    console.log(request.url)
    response.status(200).send(alunas)
} 

exports.getById = (request, response) => {
    const id = request.params.id
    console.log(id)
    response.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (request, response) => {
    const id = request.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    const livrosAluna = aluna.livros
    const livrosLidos = livrosAluna.filter(livro => livro.leu == "true") 
    const tituloLivros = livrosAluna.map(livro => livro.titulo)

    response.status(200).send(livrosLidos)
}