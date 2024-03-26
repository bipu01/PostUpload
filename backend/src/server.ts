import express from "express"
import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
import {Student, Teacher} from "./db/user"
import cors from "cors"
// import axios from "axios";
// import axios from "axios";

const app = express();
app.use(cors())
app.use(express.json())

const url ="mongodb://localhost:27017";
const dbName= "school"


mongoose.connect("mongodb://localhost:27017/school")

// const insertUser =async()=>{
//     await Student.create({
//         name:"Karki manish",
//         age:43,
//         gpa:3.2
//     })
// }
const insertTeacher =async()=>{
    await Teacher.create({
        name:"Bhim Prasad",
        salary:30000,
        strict:true
    })
}

app.post("/saveStudent", async (req,res)=>{
    try{
        const client = await MongoClient.connect(url);
        const collection= client.db(dbName).collection("students")
        await collection.insertOne({name:req.body.name, age: req.body.age, gpa: req.body.gpa, img: req.body.img})
        // const fetchStudents= await axios.get("/studentsFromDb")
        // const studentList= await fetchAllStudents();

        res.send({
            message: "Student saved successfully",
            // list: studentList,
        })

    }catch(err){
        res.status(500).send({
            message:"faild to save to db",
            error: err
        })
    }
})

app.post("/saveTeacher",(req,res)=>{
    insertTeacher()
    res.send("Teacher saved successfully")
})

app.get("/",(req,res)=>{
    res.json({
        message:"what do you want?"
    })
})
app.get("/special",(req,res)=>{
    res.json({
        message:"Message from the server"
    })
})

// const fetchAllStudents  = async() => {

//     type fetchAllStudentsreturn ={
//         message: String,
//         list: []
//     }
//     try{
//         const res:fetchAllStudentsreturn= await axios.get("/studentsFromDb")
//         return res.list 
//     }catch(err){
//         return [err]
//     }
// };

app.get("/studentsFromDb",async(req,res)=>{
    try{
        const data = (await Student.find({}))
        res.send({
            message:"Fetched successfully",
            list: data
        });
    }catch(error){
        res.json({
            message: "failed to fetch from db"
        })
    }
})

app.listen(3000,()=>{
    console.log("server running in port 3000")
})
