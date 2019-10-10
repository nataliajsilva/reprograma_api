const alunas = require("../model/alunas.json")

exports.get = (request,response) => {
    console.log(request.url)
    response.status(200).send(alunas)
} 

exports.getById = (request, response) => {
    const id = request.params.id
    if(id <= 0 || id > 17){
        response.redirect(301,"https:google.com.br")
        //response.send('Id não encontrado na lista de alunas')
    }
    //console.log(id)
    response.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (request, response) => {
    const id = request.params.id
    const aluna = alunas.find(aluna => aluna.id == id)

    if (!aluna){
        response.send('Aluna não encontrada')
    }
    const livrosAluna = aluna.livros
    const livrosLidos = livrosAluna.filter(livro => livro.leu == "true") 
    const tituloLivros = livrosAluna.map(livro => livro.titulo)

    response.status(200).send(livrosLidos)
}

exports.getSp = (request,response) => {

    const nasceuSP = alunas.filter(aluna => aluna.nasceuEmSp == "true")
    const meninasSp = nasceuSP.map(aluna => aluna.nome)

    response.status(200).send(meninasSp)
}

