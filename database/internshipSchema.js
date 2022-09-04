const mongoose = require("mongoose");

const FieldSchema= new mongoose.Schema({
    category:String
});


const InternSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    summary: {
        type: String,
        required: true,
    },

    lookingfor:
    {
        type: String,
        required: true
    },

    stipend: {
        type: String,
        required: true,
    },
    location:
    {
        type: String,
        required:true
    },
    postedby:
    {
        type: String,
        required: true
    },
    fields:
    {
        type: [String],
        required: false,
    },
    lastdate:
    {   
        type: Date,
        required: true
    },
    isPosted:
    {
        type: Boolean,
        required: true,
        default: false 
    },
    applications:
        {
            type: [String],
            required:true
        }
},
{
    timestamps: true
}
);

module.exports = mongoose.models.Intern || mongoose.model("Intern", InternSchema);