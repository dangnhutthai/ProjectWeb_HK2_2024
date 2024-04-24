const express = require("express");
const publisher = require("../controllers/publisher.controller");

const router = express.Router();

router.route("/")
    .post(publisher.create)
router.route("/")
    .get(publisher.findAll)
router.route("/:id")
    .get(publisher.findOne)
router.route("/findFavorite")
    .get(publisher.findAllFavorite)
router.route("/:id")
    .delete(publisher.delete)
router.route("/")
    .delete(publisher.deleteAll)
router.route("/:id")
    .put(publisher.update)

module.exports = router;