const router = require('express').Router();

const { getCurrencies, getCurrenciesByQuery, getCurrenciesById } = require("../controller/currencies.controller")

router.get("/", getCurrencies)

router.get("/", getCurrenciesByQuery)

router.get("/:id", getCurrenciesById)

module.exports = router;