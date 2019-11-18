const express = require("express")
const router = express.Router()
const controller = require("../controllers/professorasController")

router.get("/", controller.getProfSemCpf)
router.get("/:id", controller.getById)
router.post("/",controller.post)

module.exports = router