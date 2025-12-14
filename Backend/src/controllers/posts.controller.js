import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import {Post} from "../models/post.model.js";
import { UploadOnCloud, DeleteFromCloud } from "../utils/Cloudinary.js";

const createPost = AsyncHandler(async (req, res) => {
    const { caption } = req.body;

    if (!req.file) {
        throw new ApiError(400, "Post image or video is required");
    }

    const cloudResponse = await UploadOnCloud(req.file.path);
    if (!cloudResponse) {
        throw new ApiError(500, "Cloud upload failed");
    }

    const newPost = await Post.create({
        caption,
        post: cloudResponse.secure_url,
        postedBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, newPost, "Post created successfully")
    );
});

const deletePost = AsyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }
    await DeleteFromCloud(post.post);
    await post.remove();
    return res.status(200).json(
        new ApiResponse(200, null, "Post deleted successfully")
    );
});

const likeUnlikePost = AsyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    let post = await Post.findById(postId);
    if (!post)
        throw new ApiError(404, "Post not found");

    const isLiked = post.likes.some(likeId => likeId.toString() === userId.toString());

    if (isLiked) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();
    post = await Post.findById(postId).populate("postedBy", "name username photo");
    const likesCount = post.likes.length;
    let LikedUsers = post.likes;

    return res.status(200).json(new ApiResponse(200, {
        likesCount,
        LikedUsers,
        isLiked: !isLiked
    }, "Like status updated")
    );
});

const commentOnPost = AsyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;

    if (!comment?.trim())
        throw new ApiError(400, "Comment cannot be empty");

    let post = await Post.findById(postId);
    if (!post)
        throw new ApiError(404, "Post not found");

    post.comments.push({ postedBy: userId, comment });
    await post.save();

    post = await Post.findById(postId).populate("comments.postedBy", "name username photo");

    return res.status(200).json(new ApiResponse(200, post.comments, "Comment added successfully"));
});

const deleteComment = AsyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user._id;

    let post = await Post.findById(postId);
    if (!post)
        throw new ApiError(404, "Post not found");

    const comment = post.comments.id(commentId);
    if (!comment)
        throw new ApiError(404, "Comment not found");

    if (comment.postedBy.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }
    comment.remove();
    await post.save();
    post = await Post.findById(postId).populate("comments.postedBy", "name username photo");

    return res.status(200).json(new ApiResponse(200, post.comments, "Comment deleted successfully"));
});

export { createPost, deletePost, likeUnlikePost, commentOnPost, deleteComment };