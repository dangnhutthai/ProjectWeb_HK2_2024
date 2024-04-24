const express = require("express");
const reader = require("../controllers/reader.controller");

const router = express.Router();

router.route("/")
    .post(reader.create)
router.route("/")
    .get(reader.findAll)
router.route("/:id")
    .get(reader.findOne)
router.route("/findFavorite")
    .get(reader.findAllFavorite)
router.route("/:id")
    .delete(reader.delete)
router.route("/")
    .delete(reader.deleteAll)
router.route("/:id")
    .put(reader.update)

module.exports = router;