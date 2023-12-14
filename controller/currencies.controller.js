// const { string } = require("joi");
const currencies = require("../currencies.json");

// export const getCurrencies = (request, response) => { //This methods fails because Node.js does not support import and export keywords.
const getCurrenciesByQuery = (request, response) => {
    const {min_value} = request.query;
    // if(typeof(min_value) === 'number'){
        console.log(min_value);
        if(min_value){
            const result = currencies.data.filter(
                (item) => Number(item.min_size) === Number(min_value)
            );
            response.json(result);
        } else{
            response.json(currencies)
        }
    // }else{
    //     response.status(422).json({message: "Please enter a number to look for minimum size"})
    // }
    
}

const getCurrenciesById = (request, response) => {
    console.log(request.params.id); //it will console the "/{id}"
    // console.log(request.query.id); //it will console the "?{id}" //IT's not working
    // response.end();
    // console.log(request.params) -->  {id: "inr"}

    const {id} = request.params;
    // console.log(id); --> "inr"
    console.log(typeof(id))
    if(typeof(id) === 'string'){
        const result = currencies.data.find((item) => item.id.toLocaleLowerCase() === id.toLocaleLowerCase());
        if(result){
            response.status(200).json(result);
        } else{
            // response.sendStatus(404).send("Sorry can't find it")
            response.status(404).send(`<h4>Sorry can't find ${id}<h4>`)
        }
    }else{
        response.status(422).json({message: "Please enter a string to look for the currency!"})
    }
    
}

const getCurrencies = (request, response) => {
    console.log("Current Route: /currencies")
    // response.json(JSON.stringify(currencies)) //-> don't use JSON.stringify.
    response.json(currencies)
}

module.exports = {getCurrenciesByQuery, getCurrenciesById, getCurrencies}

// module.exports = {getCurrenciesById}