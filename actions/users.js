const User = require("../models/user")
const {isInteger} = require("lodash")

const create = async (req) => {
    let {
        name,
        phone
    } = req.body
    
    let email = req.body.email.toLowerCase()

    phone = parseInt(phone)
    
    if(isInteger(phone) === false) {
        return "Wrong type of phone"
    }
    else if (name == parseInt(name)){
        return "wrong type of name"
    }
    

    var insert_data = {
        name,
        email,
        phone
    }

    let data = new User(insert_data)
    
    try {
        await data.save()

        return data
    } catch (err) {
        throw err
    }
}

const getAll = async () => {
    try {
        let query = await User.find({}).exec()
        let data = query.map((value, index) => {
            return {
                _id:value.id,
                name: value.name,
                email: value.email,
                phone: value.phone
            }
        })
        return data
    } catch (err) {
        throw err
    }
}

const getDetail = async (id) => {
    try {
        let query = await User.findOne({
            _id: id
        }).exec()

        return query
    } catch (err) {
        throw err
    }
}

module.exports = {
    create,
    getAll,
    getDetail,
}