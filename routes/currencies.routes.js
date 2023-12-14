const router = require('express').Router();

const { getCurrencies, getCurrenciesByQuery, getCurrenciesById } = require("../controller/currencies.controller")

router.get("/", getCurrenciesByQuery)

router.get("/:id", getCurrenciesById)

router.get("/", getCurrencies)

module.exports = router;