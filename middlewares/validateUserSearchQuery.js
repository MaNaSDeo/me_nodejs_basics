const Joi = require("joi");

const schema = Joi.object().keys({
    age: Joi.number().integer().min(0).max(100),
    gender: Joi.string().lowercase().valid("male", "female")
}).or("age", "gender");

const validateUserSearchQuery = (request, response, next) => {
    const {age, gender} = request.query;

    const data = {
        age,
        gender
    }    

    const result = schema.validate(data);

    if(result.error){
        return response.status(400).json(result.error)
    }

    next();
}

module.exports = validateUserSearchQuery;