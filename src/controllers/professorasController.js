const professoras = require("../model/professoras.json")

exports.get = (request, response) => {
  res.status(200).send(professoras)
}

exports.getProfSemCpf =(request,response) => {
   const arrSemCpf = []
   for(let i = 0; i < professoras.length; i++){
   const semCpf = {}
   semCpf.id = professoras[i].id
   semCpf.nome = professoras[i].nome
   semCpf.especialidade = professoras[i].especialidade
   semCpf.signo = professoras[i].signo
   arrSemCpf.push(semCpf)
}
response.status(200).send(arrSemCpf)
}

exports.getById =(request,response) => {
  const id = request.params.id
    const professora = professoras.find(item => item.id == id)
    delete professora.cpf
    response.status(200).send(professora)
}

