const Motor = require("../models/motor")
const {isInteger} = require("lodash")
const User = require("../models/user")

const create = async (req) => {
    let {motor, brand, price, dealer} = req.body

    price = parseInt(price)

    if (brand == Number(brand)) {
        return "Wrong type of brand"
    }
    else if (isInteger(price) === false) {
        return "Wrong type of price"
    } 

    var insert_data = {
        motor,
        brand,
        price,
        dealer
    }

    let data = new Motor(insert_data)
    data.save()

    return data
}

const getAll = async () => {
    let query = await Motor.find({})
        .populate([
            {
                path: 'dealer',
                model: User
            }
        ]).exec()
    console.log(`Result ${query}`)
    return query
}

const getDetail = async (id) => {
    try {
        let query = await Motor.findOne({
            _id: id
        }).populate([{path:'dealer', model: User}]).exec()

        return query
    } catch (err) {
        throw err
    }
}

const update = async (id, updated_data) => {
    let {
        motor,
        brand,
        price,
        dealer,
        fresh
    } = updated_data
    let opts = { new: fresh === "true" ? true : false }

    let data = {
        motor,
        brand,
        dealer,
        price,
        fresh
    }

    try {
        let query = await Motor.findOneAndUpdate({
            _id: id
        }, data, opts).exec()

        return query
    } catch (err) {
        throw err
    }
}

const destroy = async (id) => {
    try {
        let query = await Motor.findByIdAndDelete({
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
    update,
    destroy
}
