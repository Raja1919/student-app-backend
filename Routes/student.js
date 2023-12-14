// app.js

import express from "express";
import cors from "cors";
import {
  deleteStudent,
  editStudent,
  getAllStudent,
  getStudentById, 
  postNewStudent,
} from "../controller/student.js";

const router = express.Router();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Get All Students List:
router.get("/all-student", async (req, res) => {
  try {
    const students = await getAllStudent();
    if (!students) {
      return res.status(400).json({ message: "No data available" });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add New student:
router.post("/add-student", async (req, res) => {
  try {
    const newStudent = req.body;
    if (!newStudent) {
      return res.status(400).json({ message: "No data available" });
    }

    const result = await postNewStudent(newStudent);
    if (!result) {
      return res.status(400).json({ message: "Posting data error" });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch Single Student by ID:
router.get("/get-student/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No ID provided" });
    }

    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Edit Student:
router.put("/edit-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = req.body;

    if (!id || !updatedStudent) {
      return res.status(400).json({ message: "No data available" });
    }

    const result = await editStudent(id, updatedStudent);

    if (!result) {
      return res.status(400).json({ message: "Editing data error" });
    }

    res.status(200).json({ message: "Edited successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Student:
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No data available" });
    }

    const result = await deleteStudent(id);
    if (!result) {
      return res.status(400).json({ message: "Deleting data error" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
