"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.Teacher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gpa: { type: Number, required: true },
    img: { type: String }
});
const teacherSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    strict: { type: Boolean }
});
exports.Teacher = mongoose_1.default.model("teachers", teacherSchema);
exports.Student = mongoose_1.default.model("students", userSchema);
