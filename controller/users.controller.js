// const usersData = require("../users.json");

// // const {getQueryErrors} = require("../validators/users.validators")

// //Redo things.
// const getUsersByNameAndAge = (request, response) => {
//     console.log('getUsersByNameAndAge')
//     const {gender, age} = request.query;
//     if(gender && age){
//         const result = usersData.data.filter((item) =>{return Number(item.dob.age)===Number(age) && item.gender.toLowerCase() === gender.toLowerCase()});
//         response.json(result);
//     } else if(gender){
//         if(gender.toLowerCase()==="male" || gender.toLowerCase()==="female"){
//         const result = usersData.data.filter(item => item.gender.toLowerCase() ===gender.toLowerCase());
//         response.json(result);
//         }else{
//             response.status(422).send(`Gender to search can either be 'male' or 'female'`)
//         }
//     } else if(age){
//         if(isNumber(age)){
//             if(age >=0 && age <= 0){
//                 const result = usersData.data.filter(item => Number(item.dob.age) === Number(age));
//                 response.json(result)
//             } else{
//                 response.status(422).send(`Age should be greater than 0 & smaller than 100`)
//             }
//         } else{
//             response.status(422).send(`Enter a number`)
//         }
        
//     }else{
//         // response.json(usersData.data)
//         response.send('Not found')
//     }
//     // const error = getQueryErrors({
//     //     age, 
//     //     gender
//     // })
//     // if(error){
//     //     return response.status(422).json(error)
//     // }
    
//     // if (gender && age) {
//     //     const result = users.data.filter((x => {
//     //         return x.dob.age === age && x.gender === gender
//     //     }));
//     //     return response.json(result);
//     // } else if (gender) {
//     //     const result = users.data.filter((x => {
//     //         return x.gender === gender
//     //     }));
//     //     return response.json(result);
//     // } else if (age) {
//     //     const result = users.data.filter((x => {
//     //         return x.dob.age === age
//     //     }));
//     //     return response.json(result);
//     // }
//     // return response.status(404).json({ message: "Invalid query" })

// }

// const getUsersByUUID = (request, response) => {
//     console.log('getUsersByUUID')
//     const {uuid} = request.params;
//     const result = usersData.data.find((item) => item.login.uuid.toLowerCase() === uuid.toLowerCase());
//     if(result){
//         response.status(200).json(result);
//     }else{
//         response.status(404).send(`${uuid} not found!`)
//     }
// }

// const getUsers = (request, response) => {
//     console.log('getUsers')
//     response.json(usersData.data);
// }

// module.exports = {getUsersByNameAndAge, getUsersByUUID, getUsers}

const usersData = require('../users.json');
const { getQueryErrors } = require('../validators/users.validators');

// const schema = joi.object().keys({
//     age: joi.number().integer().min(0).max(100),
//     gender: joi.string().lowercase().valid("male", "female")
// }).or("age", "gender");

const getUsers = (request, response) => {
    response.json(usersData.data)
}

const getUsersByUUID = (request, response) => {
    const {uuid} = request.params;
    const result = usersData.data.find(item => item.login.uuid.toLowerCase() === uuid.toLowerCase());
    if(result){
        response.status(200).json(result)
    }else{
        response.status(404).json({message: `${uuid} not found!`})
    }
}

const getUsersByNameAndAge = (request, response) => {
    const {gender, age} = request.query;

    // const result = schema.validate({
    //     age,
    //     gender
    // });

    // if(result.error){
    //     return response.status(422).json(result.error)
    // }
    
    const error = getQueryErrors({
        age, 
        gender
    })

    if(error){
        return response.status(422).json(error)
    }

    if(gender && age){
        const result = usersData.data.filter(item => {
            return Number(item.dob.age) === Number(age) && item.gender.toLowerCase() === gender.toLowerCase();
        });
        response.json(result);
    } else if(age){
        const result = usersData.data.filter(item => {
            return Number(item.dob.age) === Number(age);
        });
        response.json(result);
    } else if(gender){
        const result = usersData.data.filter(item => {
            return item.gender.toLowerCase() === gender;
        })
        response.json(result)
    } else{
        response.status(422).json({message: `Wrong serach!`})
    }
}

module.exports = { getUsers, getUsersByUUID, getUsersByNameAndAge }