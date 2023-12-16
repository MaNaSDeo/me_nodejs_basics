require('dotenv').config();

const express = require("express");

const app = express();

const PORT = 8081;

const serverInfo = {
    serverName: "Crio Server",
    version: "1.0.0",
    currentDate: new Date().toDateString(),
    currentTime: new Date().toTimeString(),
};

// const currencies = require("./currencies.json");

// const { getCurrenciesByQuery, getCurrenciesById, getCurrencies } = require("./controller/currencies.controller");

const currenciesRoutes = require("./routes/currencies.routes")

// import { getCurrencies } from "./controller/currencies.controller"; //This methods fails because Node.js does not support import and export keywords.

// const usersData = require("./users.json");

// const getUsersData = require("./userDataController/getUsersData")

// const {getUsersByNameAndAge, getUsersByUUID, getUsers} = require("./controller/users.controller")

const userRoutes = require('./routes/users.routes');
const verifyAuth = require('./middlewares/verifyAuth');

app.use(verifyAuth);

app.get("/", (request, response) => {
    console.log("current Route: /")
    //get - get an existing information
    //post - creating a data.
    //put - updating a data
    //patch - updating a 
    
    //send - it will take care both "write" & "end"
    //json - it will take care of "add.header", "write" & "end"

    // response.write('<h1>Currency Dashboard</h1>');
    // response.end();
    response.send('<h1>Currency Dashboard</h1>');
    // response.json(JSON.stringify(serverInfo))
    // response.json(JSON.stringify(currencies))

})

app.get("/status", (request, response) => {
    console.log("Current Route: /status");
    response.json(serverInfo);
})

// app.get("/currencies", getCurrencies)

// app.get("/currencies", getCurrenciesByQuery)

// app.get("/currencies/:id", getCurrenciesById)

// app.use("/currencies", verifyAuth, currenciesRoutes) //To have verification individually. ****
app.use("/currencies", currenciesRoutes)

// app.get("/users", getUsers)

// app.get("/users", getUsersByNameAndAge)

// app.get("/users/:uuid", getUsersByUUID)

app.use('/users',  userRoutes)


// app.get("/users/:uuid", (request, response) => {
//     const {uuid} = request.params;

//     const result = usersData.data.find((item) => item.id.toLocaleLowerCase() === id.toLocaleLowerCase());
//     if(result){
//         response.status(200).json(result);
//     } else{
//         // response.sendStatus(404).send("Sorry can't find it")
//         response.status(404).send(`<h4>Sorry can't find ${id}<h4>`)
//     }
// })

app.listen(PORT, () => {
    console.log("Listening at", PORT);
})