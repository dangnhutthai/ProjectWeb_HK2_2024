const express = require("express");
const rent = require("../controllers/rent.controller");

const router = express.Router();

router.route("/")
    .post(rent.create)
router.route("/")
    .get(rent.findAll)
router.route("/:id")
    .get(rent.findOne)
router.route("/findFavorite")
    .get(rent.findAllFavorite)
router.route("/:id")
    .delete(rent.delete)
router.route("/")
    .delete(rent.deleteAll)
router.route("/:id")
    .put(rent.update)

module.exports = router;