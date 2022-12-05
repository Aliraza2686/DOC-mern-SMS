const jwt = require('jsonwebtoken')
const SuperAdmin = require('../models/superAdmin')

const superAuth = async (req, res, next) => {
  const token = req.header('token')
  if(token){
    jwt.verify(token, 'secrettoken', async(error, sucesstoken) => {
        if(error) {
            return res.send({error : "Please get authenticated first to access data"})
        }
        const admin = await SuperAdmin.findById(sucesstoken)
        req.user = admin 
        next()
    })
  }
  if(!token) {
    return res.send({error : "Please get Authenticated first to access data"})
  }
}
module.exports = superAuth
