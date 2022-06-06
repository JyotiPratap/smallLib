const express = require('express');
const router = express.Router();
const creatController = require("../Controller/CreatorController.js")
const bookController = require("../Controller/BookController.js")

router.post("/Creator",creatController.Creator)
router.post("/login",creatController.loginCreator)


router.post("/createBook",bookController.createBook)
router.get("/viewYourBooks",bookController.viewYourBooks)
router.get("/viewAllBooks",bookController.viewAllBooks)

module.exports = router;