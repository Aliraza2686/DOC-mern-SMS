const express = require('express')
const SuperAdmin = require('../models/superAdmin')
const CityAdmin = require('../models/cityAdmin')
const superAuth = require('../auth/superAuth')
const cityAuth = require('../auth/cityAuth')
const bcrypt = require('bcrypt')

const router = express.Router()

// @ add city admin
router.post('/add/city/admin', superAuth, async(req, res) => {
   const {
      name,
      email,
      password,
      course,
      position,
      city
   } = req.body
   if(!name || !email || !password || !course || !position || !city) { return res.status(400).send({error : "Please add credentials"}) }
   if(password < 6) { return res.status(400).send( { error : "Password must be greater than 6 characters" }) }
   if(!email.includes('@gmail.com')) { return res.status(400).send({error : "Invalid Email Format" }) }
   try{
      const alreadyExists = await CityAdmin.findOne({email})
      if(alreadyExists) {
         return res.status(400).send({error : `Admin with this email ${alreadyExists.email} already exists please try another email`})
      }
      const admin = new CityAdmin({
         name,
         email,
         password : await bcrypt.hash(password, 8),
         course,
         position,
         city
      })
      await admin.save()
      res.status(201).send({success : `New admin ${admin.name} has been added`})
   }catch(error){
     res.status(400).send({error : error.message})
   }
})

// @ get current admin
router.get('/current/admin', cityAuth, async(req, res) => {
   const id = req.user.id
   try{
      const admin = await CityAdmin.findById(id)
      res.status(201).send({success : true, admin})
   }catch(error) {
      res.status(400).send({error : error.message})
   }
})

// @ remove city admin
router.post('/remove/city/admin/:id', superAuth, async(req, res) => {
   const {id} = req.params
   if(!id) {
     return res.status(400).send({error : "Please enter valid ID"})
   }
   try {
      const admin = await CityAdmin.findByIdAndDelete(id)
      res.status(201).send({success : `${admin.name} has been deleted`})
   } catch (error) {
      res.status(400).send({error : error.message}) 
   }
})


module.exports = router
