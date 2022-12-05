const express = require('express')
const cityAuth = require('../auth/cityAuth')
const Student = require('../models/studentsModel')
const Fee = require('../models/feeModel')

const router = express.Router()

// @ add student
router.post('/add/student', cityAuth, async(req, res) => {
    const {
        name,
        fathername,
        email,
        phoneNo,
        training,
        course,
        duration,
        city,
        country,
        feePaid,
        CNIC
    } = req.body

   if(!email.includes('@gmail.com')){
      return res.status(400).send({error : "Invalid email format"})
   }
   try{
     const paidStudents = await Student.find({feePaid})
     const sorted = paidStudents.reverse()
     let lastRollNo = sorted[0].rollno || 0
     if(sorted[0].feePaid == false) {
        lastRollNo = -1
     }
     let newRollno = parseInt(lastRollNo + 1)
    
     const student = new Student({
        name,
        fathername,
        email,
        phoneNo : parseInt(phoneNo),
        course,
        training,
        duration,
        city,
        country,
        feePaid,
        CNIC,
        rollno : newRollno,
        instructor : req.user.id
     })
     await student.save()
     res.status(201).send({success : true, student})
   }catch(error){
    res.send({error : error.message})
   }
})

// @ delete student
router.delete('/delete/student/:id', cityAuth, async(req, res) => {
     const {id} = req.params
     try{
        const student = await Student.findByIdAndDelete(id)
        res.status(201).send({success : true, msg : `${student.name} has been deleted`})
     }catch(error) {
        res.status(400).send({error : error.message})
     }
})

// @ get specific student
router.get('/student/:id', cityAuth, async(req, res) => {
   const {id} = req.params
   try {
      const student = await Student.findById(id)
      res.status(201).send({success : true, student})
   } catch (error) {
      res.status(400).send({error : error.message})
   }
})


// @get all students
router.get('/all/students/:pageNo', cityAuth, async(req, res) => {
   const pageNo = req.params.pageNo
   const limit = 7
   const skip = (limit * (pageNo - 1))
    try{
      const total = await Student.find({instructor : req.user.id}).count()
   
      const students = await Student.find({instructor : req.user.id}).skip(skip).limit(limit).sort({ feePaid : -1})
      const totalStudents = await Student.find({instructor : req.user.id})
      res.status(201).send({success : true, total, students, totalStudents})
    }catch(error){
      res.status(400).send({error  : error.message})
    }
})

//search students
router.get('/search/students/:term', cityAuth, async(req, res) => {
   const term = req.params.term
   console.log(term)
   try{
      const allStudents = await Student.find({instructor : req.user.id})
      const students = allStudents.filter((student) => student.name.includes(term))
      let noResult = false
      if(students.length <= 0) {
         noResult = true
         return res.send({noResult})
      }
      res.status(201).send({success : true, students})
   }catch(error){
      res.status(400).send({error : error.message})
   }
})

//update student
router.put('/update/student/:id', cityAuth, async(req, res) => {
   const { id } = req.params
   console.log(req.body)
   try{ 
      const student = await Student.findByIdAndUpdate(id, req.body, {
         new : true, 
      })
      await student.save()
      res.status(201).send({success : true, msg : `${student.name} has been updated`})
   }catch(error) {
     res.status(401).send({error : error.message})
   }
})

router.get('/get', async(req, res) => {
   const students = await Student.find({})
   res.send(students)
})

module.exports = router