const express = require('express')
const Router = express.Router()
const { fetchAndGenerateClientPdf, getWingClients } = require("../controllers/userController")
Router.get("/client/:id", fetchAndGenerateClientPdf);
Router.get("/clients", getWingClients )

module.exports = Router;