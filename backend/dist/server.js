"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const user_1 = require("./db/user");
const cors_1 = __importDefault(require("cors"));
// import axios from "axios";
// import axios from "axios";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const url = "mongodb://localhost:27017";
const dbName = "school";
mongoose_1.default.connect("mongodb://localhost:27017/school");
// const insertUser =async()=>{
//     await Student.create({
//         name:"Karki manish",
//         age:43,
//         gpa:3.2
//     })
// }
const insertTeacher = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.Teacher.create({
        name: "Bhim Prasad",
        salary: 30000,
        strict: true
    });
});
app.post("/saveStudent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield mongodb_1.MongoClient.connect(url);
        const collection = client.db(dbName).collection("students");
        yield collection.insertOne({ name: req.body.name, age: req.body.age, gpa: req.body.gpa, img: req.body.img });
        // const fetchStudents= await axios.get("/studentsFromDb")
        // const studentList= await fetchAllStudents();
        res.send({
            message: "Student saved successfully",
            // list: studentList,
        });
    }
    catch (err) {
        res.status(500).send({
            message: "faild to save to db",
            error: err
        });
    }
}));
app.post("/saveTeacher", (req, res) => {
    insertTeacher();
    res.send("Teacher saved successfully");
});
app.get("/", (req, res) => {
    res.json({
        message: "what do you want?"
    });
});
app.get("/special", (req, res) => {
    res.json({
        message: "Message from the server"
    });
});
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
app.get("/studentsFromDb", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (yield user_1.Student.find({}));
        res.send({
            message: "Fetched successfully",
            list: data
        });
    }
    catch (error) {
        res.json({
            message: "failed to fetch from db"
        });
    }
}));
app.listen(3000, () => {
    console.log("server running in port 3000");
});
