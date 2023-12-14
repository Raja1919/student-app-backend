import express from "express";
import { deleteStudent, editStudent, getAllStudent, postNewStudent } from "../controller/student.js";


const router = express.Router();


// Get All Students List:
router.get("/all-student", async (req, res) => {
  try {
    const students = await getAllStudent()
    if (!students) {
      return res.status(400).json({ message: "No data available"});
    }
    
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  }
});


// Add New student:
router.post('/add-student',async (req,res)=>{
  try {
    const NewStudent=req.body
    if(!NewStudent){
      return res.status(400).json({ message: "No data available"})
    }

    const result=await postNewStudent(NewStudent)
    if(!result){
      return res.status(400).json({message:"posting data error"})
    }
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
    
  }
})


// Edit Student:
router.put('/Edit-Student/:id',async (req,res)=>{
  try {
    const {id}=req.params
    const UpdatedStudent=req.body
    if( !id || !UpdatedStudent ){
      return res.status(400).json({ message: "No data available"})
    }

    const result=await editStudent(id,UpdatedStudent)
    if(!result){
      return res.status(400).json({message:"posting data error"})
    }
    res.status(200).json({message:"edited succesfully"})
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
    
  }
})


// Delete Student:
router.delete("/Delete-student/:id",async(req,res)=>{
  try {
    const {id}=req.params
    if(!id){
      return res.status(400).json({ message: "No data available"})
    }

    const result=await deleteStudent(id)
    if(!result){
      return res.status(400).json({message:"posting data error"})
    }
    res.status(200).json({message:"deleted succesfully"})

  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
    
  }
})




export const studentRouter=router