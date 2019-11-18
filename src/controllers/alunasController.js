const alunas = require("../model/alunas.json")
const fs = require('fs');

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
exports.getAge = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(item => item.id == id)
    const dataNasc = aluna.dateOfBirth
    const arrData = dataNasc.split("/")
    const dia = arrData[0]
    const mes = arrData[1]
    const ano = arrData[2]
    const idade = calcularIdade(ano, mes, dia)
    res.status(200).send({ idade })
  }
  
  function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
    const now = new Date()
    const anoAtual = now.getFullYear()
    const mesAtual = now.getMonth() + 1
    const hoje = now.getDate()
  
    let idade = anoAtual - anoDeNasc
  
    if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
      idade -= 1
    }
    return idade
  }
exports.post = (require,response) => {
    const {nome, dateOfBirth, nasceuEmSp, id, livros} = require.body;
    alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros});

    fs.writeFile("./src/model/alunas.json",JSON.stringify(alunas),'utf8', function (err){
        if (err) {
            return response.status(500).send({ message: err});
        }
        console.log("The file was saved!");
    })

    return response.status(201).send(alunas);
}
exports.postBooks = (require, response) => {
    const id = require.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    if (!aluna) {
        response.send("Não encontrei essa garota")
    }
    const {titulo, leu} = require.body;
    alunas[aluna.id - 1].livros.push({titulo, leu});

    fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
        if (err) {
            return response.status(500).send({ message: err });
        }
        console.log("The file was saved!");
    });

    return response.status(201).send(alunas[aluna.id - 1].livros);
}