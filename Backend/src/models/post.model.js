import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    caption: {
        type: String
    },
    post: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        comment: { type: String },
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });