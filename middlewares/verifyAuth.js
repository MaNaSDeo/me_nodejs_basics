const PASSWORD = process.env.ROUTE_PASSWORD;
console.log(PASSWORD);

const verifyAuth = (request, response, next) => {
    const authorization = request.headers["authorization"];
    console.log(authorization)

    if(!authorization){
        return response.status(401).json({message: "Not authorized!"})
    }

    if(authorization !== PASSWORD){
        return response.status(401).json({message: "Not authorized!"})
    }

    next(); //Next function in pipeline -> middleware, controller

    //Client sends a request -> it'll come to route first -> middlewares -> if everything is fine, middleware will transfer the control to next pipeline, with help of "next()"
}

module.exports = verifyAuth;