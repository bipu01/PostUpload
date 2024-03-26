import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    gpa:{type:Number, required:true},
    img:{type:String}
})

const teacherSchema= new mongoose.Schema({
    name:{type:String, required:true},
    salary:{type:Number, required:true},
    strict:{type:Boolean}
})

export const Teacher = mongoose.model("teachers", teacherSchema)

export const Student = mongoose.model("students", userSchema)
