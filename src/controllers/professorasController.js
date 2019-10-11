const professoras = require("../model/professoras.json")

exports.get = (req, res) => {
  res.status(200).send(professoras)
}