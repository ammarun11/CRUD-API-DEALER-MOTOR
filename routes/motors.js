const express = require('express')
const router = express.Router()
const {create, getAll, getDetail, update, destroy} = require("../actions/motors")
const {isString} = require("lodash")

router.post("/", async (req, res) => {
    let data = await create(req)

    if (isString(data) === true) {
        return res.status(400).json({
            status: "error",
            message: data
        })
    }

    return res.status(200).json({
        status: "success",
        data,
        message: "Data Motor created successfully!"
    })
})

router.get("/", async (req, res) => {
    try {
        let data = await getAll()

        return res.send({
            status: "success",
            data,
            message: "Get all data Motor"
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let {
            id
        } = req.params
        let data = await getDetail(id)

        return res.status(200).json({
            status: "success",
            data,
            message: "Get data motor detail successfully!"
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    let {
        id
    } = req.params
    let updated_data = {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        dealer: req.body.dealer,
        fresh: req.body.fresh
    }
    try {
        let data = await update(id, updated_data)

        return res.status(200).json({
            status: "success",
            data,
            message: "Motor data updated successfully!"
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    let { id } = req.params

    try {
        let data = await destroy(id)

        return res.status(200).json({
            status: "success",
            data,
            message: "User data deleted successfully!"
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = router