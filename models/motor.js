/**
 * motor Schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let motorSchema = new Schema ({
    motor: String,
    brand: String,
    price: Number,
    dealer: String,
    created_at: {
        type:Date,
        default:Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

let Motor = mongoose.model("Motor", motorSchema)

module.exports = Motor