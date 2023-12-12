const currencies = require("../currencies.json");

const getCurrencies = (request, response) => {
    console.log("Current Route: /currencies")
    // response.json(JSON.stringify(currencies)) //-> don't use JSON.stringify.
    response.json(currencies)
}

// export const getCurrencies = (request, response) => { //This methods fails because Node.js does not support import and export keywords.
const getCurrenciesByQuery = (request, response) => {
    const {min_value} = request.query;
    console.log(min_value);
    if(min_value){
        const result = currencies.data.filter(
            (item) => Number(item.min_size) === Number(min_value)
        );
        response.json(result);
    } else{
        response.json(currencies)
    }
}

const getCurrenciesById = (request, response) => {
    console.log(request.params.id); //it will console the "/{id}"
    // console.log(request.query.id); //it will console the "?{id}" //IT's not working
    // response.end();
    // console.log(request.params) -->  {id: "inr"}

    const {id} = request.params;
    // console.log(id); --> "inr"
    const result = currencies.data.find((item) => item.id.toLocaleLowerCase() === id.toLocaleLowerCase());
    if(result){
        response.status(200).json(result);
    } else{
        // response.sendStatus(404).send("Sorry can't find it")
        response.status(404).send(`<h4>Sorry can't find ${id}<h4>`)
    }
}

module.exports = {getCurrenciesByQuery, getCurrenciesById, getCurrencies}

// module.exports = {getCurrenciesById}