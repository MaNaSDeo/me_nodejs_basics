const router = require('express').Router();

const { getUsers, getUsersByNameAndAge, getUsersByUUID } = require("../controller/users.controller")

router.get("/", getUsers)

router.get("/", getUsersByNameAndAge)

router.get("/:uuid", getUsersByUUID)

module.exports = router;