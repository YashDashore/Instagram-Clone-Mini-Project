import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { Upload } from "../middleware/multer.middleware.js";

import {
    registerUser, loginUser,
    accessRefreshToken, logoutUser,
    followUser, unfollowUser
} from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.route("/register").post(Upload.fields([{
    name: "Profile_Photo",
    maxCount: 1
}]), registerUser);

UserRouter.route("/login").post(loginUser);
UserRouter.route("/refresh-token").post(accessRefreshToken);
UserRouter.route("/logout").post(verifyJWT, logoutUser);
UserRouter.route("/follow/:userId").post(verifyJWT, followUser);
UserRouter.route("/unfollow/:userId").post(verifyJWT, unfollowUser);

export { UserRouter };