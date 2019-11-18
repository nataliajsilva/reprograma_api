const professoras = require("../model/professoras.json")
const fs = require('fs');

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
exports.post = (require,response) => {
  const {id, nome, especialidade, signo, cpf} = require.body;
  professoras.push({ id, nome, especialidade, signo, cpf});

  fs.writeFile("./src/model/professoras.json",JSON.stringify(professoras),'utf8', function (err){
      if (err) {
          return response.status(500).send({ message: err});
      }
      console.log("The file was saved!");
  })

  return response.status(201).send(professoras);
}


