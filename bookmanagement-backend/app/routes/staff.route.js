const express = require("express");
const staff = require("../controllers/staff.controller");

const router = express.Router();

router.route("/")
    .post(staff.create)
router.route("/")
    .get(staff.findAll)
router.route("/:id")
    .get(staff.findOne)
router.route("/findFavorite")
    .get(staff.findAllFavorite)
router.route("/:id")
    .delete(staff.delete)
router.route("/")
    .delete(staff.deleteAll)
router.route("/:id")
    .put(staff.update)
router.route("/login")
    .post(staff.login)
module.exports = router;