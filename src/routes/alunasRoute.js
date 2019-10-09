const express = require("express")
const router = express.Router()
const controller = require("../controllers/alunasController")

router.get("/", controller.get)
router.get("/:id", controller.getById)
router.get("/:id/books",controller.getBooks)

module.exports = router