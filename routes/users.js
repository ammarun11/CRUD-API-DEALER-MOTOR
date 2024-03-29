const express = require('express')
const router = express.Router()
const { create, getAll, getDetail } = require("../actions/users")
const { isString } = require("lodash")

router.post("/", async (req, res) => {
    let data =  await create(req)

    if(isString(data) === true) {
        return res.status(400).json({
            status: "error",
            message: data
        })
    }

    return res.status(200).json({
        status: "success",
        data,
        message: "User created successfully!"
    })
})

router.get("/", async (req, res) => {
    try {
        let data = await getAll()

        return res.send({
            status: "success",
            data,
            message: "Get all user data"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params
        let data = await getDetail(id)

        return res.status(200).json({
            status: "success",
            data,
            message: "Get user detail successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = router
