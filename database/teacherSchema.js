const mongoose = require("mongoose");


const academicdetails=new mongoose.Schema(
    {
        school: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true
        },
        yearofbeginning:{
            type: Number,
            required: true  
        },
        yearofcompletion:{
            type: Number,
            required: true
        },
        course:{
            type: String,
            required: true
        }
    }
);

const institutedetails=new mongoose.Schema(
    {
        school: {
            type: String,
            required: true,
        },
        post: {
            type: String,
            required: true
        },
        startyear:{
            type: Number,
            required: true  
        },
        endyear:{
            type: Number,
            required: false
        },
        department:{
            type: String,
            required: true
        }
    }
);

const pastworks= new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        date:{
            type: Date,
            required: false
        }
    }
);


const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    summary: {
        type: String,
        required: false,
    },

    image: {
        type: String,
        required: false,
    },
    email:
    {
        type: String,
        required:true,
        unique:true,
    },
    username:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    isAdmin:
    {
        type: Boolean,
        required:true,
        default: false
    },
    dob: {
        type: Date,
        required: false
    },
    phone:{
        type:String,
        required:false
    },
    academic: {
        type: [academicdetails],
        required: false
    },
    resume:{
        type: String,
        required: false
    },
    pastprojects:{
        type: [pastworks],
        required: false
    }, 
    internships:{
        type: [String]
    },
    institutes:{
        type: [institutedetails],
        required: false
    } 
},
{
    timestamps: true
}
);

module.exports = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);