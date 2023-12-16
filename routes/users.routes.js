const router = require('express').Router();

// const { getUsers, getUsersByNameAndAge, getUsersByUUID } = require("../controller/users.controller")
const { getUsers, getUsersByUUID, getUsersByNameAndAge } = require("../controller/users.controller")
const validateUserSearchQuery = require('../middlewares/validateUserSearchQuery')

router.get("/", validateUserSearchQuery, getUsersByNameAndAge)

router.get("/", getUsers)

router.get("/:uuid", getUsersByUUID)

module.exports = router;