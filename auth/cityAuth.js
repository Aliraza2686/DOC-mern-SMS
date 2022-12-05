const jwt = require('jsonwebtoken')
const CityAdmin = require('../models/cityAdmin')

const cityAuth = (req, res, next) => {
    const token = req.header('token')
    if(token) {
        jwt.verify(token, 'secrettoken', async(error, successToken) => {
            if(error) {
                return res.status(400).send({error : "please authenticate"})
            }
            const admin = await CityAdmin.findById(successToken)
            req.user = admin
            next()
        })
    }else {
        return res.status(400).send({error : "please authenticate"})
    }
}

module.exports = cityAuth