const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SuperAdmin = require('../models/superAdmin')
const CityAdmin = require('../models/cityAdmin')

const router = express.Router()

const genToken = (id) => {
    const token = jwt.sign(id, 'secrettoken')
    return token
}

// @super admin login
router.post('/super/admin/login', async(req, res) => {
    const {
        email,
        password
    } = req.body
    if(!email || !password) {
        return res.send({error : "Please enter credentials"})
    }
    console.log(email, password)
    try{
      const admin = await SuperAdmin.findOne({email})
      if(!admin) {
        return res.send({error : "Invalid Email"})
      }
        const isMatch = await bcrypt.compare(password, admin.password) 
  
      if(!isMatch) {
        return  res.send({error : "Inalid Password"})
      }
      if(!admin && !isMatch) {
        return res.send({error : "Invalid Credentials"})
      }
      
      const token = genToken(admin.id)
      res.status(201).send({success : true, token})
    }catch(error) {
      res.status(401).send({error : error.message})
    }
})

// @city admin login
router.post('/city/admin/login', async(req, res) => {
    const {
        email,
        password
    } = req.body
    if(!email || !password) {
        return res.send({error : "Please Enter Credentials"})
    }
    try{
        const admin = await CityAdmin.findOne({email})
        if(!admin) {
          return res.send({error : "Invalid Email"})
        }
            const isMatch = await bcrypt.compare(password, admin.password)
            if(!isMatch) {
                return res.send({error : "Invalid Password"})
            }
       
        if(!admin && !isMatch) {
            return res.send({error : "Invalid Credentials"})
          }
          
        const token = genToken(admin.id)
        res.status(201).send({success : true, token})

    }catch(error) {
       res.status(401).send({error : error.message})
    }
})

router.post('/test', (req, res) => {
  const name = req.body.name
  console.log(name)
  res.send(name)
})
module.exports = router