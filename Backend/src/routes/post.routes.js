import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { Upload } from "../middlewares/multer.js";
import {
    createPost, deletePost, likeUnlikePost,
    deleteComment, commentOnPost
} from "../controllers/posts.controller.js";

const PostRouter = Router();

PostRouter.route("/create-post").post(verifyJWT, Upload.single("post"), createPost);
PostRouter.route("/delete-post/:postId").delete(verifyJWT, deletePost);
PostRouter.route("/like-unlike-post/:postId").post(verifyJWT, likeUnlikePost);
PostRouter.route("/comment-on-post/:postId").post(verifyJWT, commentOnPost);
PostRouter.route("/delete-comment/:postId/:commentId").delete(verifyJWT, deleteComment);

export default PostRouter;