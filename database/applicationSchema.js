const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    internship_id: {
        type: String,
        required: true,
    },
    student_id: {
        type: String,
        required: true,
    },
    teacher_id:{
        type:String,
        required:true
    },
    resume: {
        type: String,
        required: true,
    },
    application_status:
    {
        type: String,
        required:true,
        default:"Pending"
    },
    message:
    {
        type: String,
        required: false,
    }
},
{
    timestamps: true
}
);

ApplicationSchema.index({internship_id:1, student_id:1}, {unique: true});

module.exports = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);