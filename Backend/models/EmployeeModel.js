import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeefirstname:{
        type:String,
        required: [true, "Name is required"],
        minlength: [3, "Name length must be at least 3 characters long"],
        maxlength: [20, "Name length must be at less than 20 characters long"],
    },

    employeelastname:{
        type:String,
        required: [true, "Name is required"],
        minlength: [3, "Name length must be at least 3 characters long"],
        maxlength: [20, "Name length must be at less than 20 characters long"],
    },
    employeegender:{
        type:String,
        required: [true, "Name is required"],
    },
    employeemobileno:{
        type:Number,
        required: [true, "Name is required"],
    },
    employeeemail:{
        type:String,
        required: [true, "Name is required"],
    },
    employeerole:{
        type:String,
        required: [true, "Name is required"],
    },
    employeedepartment:{
        type:String,
        required: [true, "Name is required"],
    },
    employeedob:{
        type:String,
        required: [true, "Name is required"],
    },
    employeefile:{
        type:String,
        required: [true, "Name is required"],
    },
    employeeimage:{
        type:String,
        required: [true, "Name is required"],
    },
})

const Employee =mongoose.model("Employee", employeeSchema);
export default Employee;