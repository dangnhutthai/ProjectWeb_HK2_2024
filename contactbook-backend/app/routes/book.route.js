const express = require("express");
const contacts = require("../controllers/book.controller");

const router = express.Router();

router.route("/")
    .post(contacts.create)
router.route("/")
    .get(contacts.findAll)
router.route("/:id")
    .get(contacts.findOne)
router.route("/findFavorite")
    .get(contacts.findAllFavorite)
router.route("/:id")
    .delete(contacts.delete)
router.route("/")
    .delete(contacts.deleteAll)
router.route("/:id")
    .put(contacts.update)

module.exports = router;