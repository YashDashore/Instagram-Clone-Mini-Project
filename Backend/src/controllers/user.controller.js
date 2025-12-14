import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { UploadOnCloud, DeleteFromCloud } from "../utils/CloudinaryUpload.js";
import jwt from "jsonwebtoken";

const registerUser = AsyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    if ([username, email, password, name].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const alreadyExisted = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (alreadyExisted) {
        throw new ApiError(409, "User already existed - Username or email");
    }

    let profilePhoto1;
    const profilePhotoLocalPath = req.files?.Profile_Photo[0]?.path;
    if (profilePhotoLocalPath)
        profilePhoto1 = await UploadOnCloud(profilePhotoLocalPath);

    const user = await User.create({
        name,
        username,
        email,
        password,
        photo: profilePhoto1 ? { url: profilePhoto1.secure_url || profilePhoto1.url, publicId: profilePhoto1.public_id } : null
    })

    const createdUser = await User.findById(user._id).select("-password -serverRefreshToken");
    if (!createdUser)
        throw new ApiError(500, "User not created");
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully."))
});

const generateAccessAndRefreshTokens = async (user_Id) => {
    try {
        const user = await User.findById(user_Id);
        const accessToken = user.generateAccessToken()
        const userRefreshToken = user.generateRefreshToken()
        user.serverRefreshToken = userRefreshToken;

        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken: userRefreshToken };
    } catch (error) {
        throw new ApiError(500, "Cannot generate access and refresh tokens");
    }
}

const accessRefreshToken = AsyncHandler(async (req, res) => {
    const UserRefreshToken = req.cookies?.refreshToken || req.body.userRefreshToken;
    if (!UserRefreshToken)
        throw new ApiError(401, "User side refresh token is not accessed");
    try {
        const decodedUserRefreshToken = jwt.verify(UserRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedUserRefreshToken.id);
        if (!user)
            throw new ApiError(403, "User not found");
        if (UserRefreshToken !== user?.serverRefreshToken)
            throw new ApiError(403, "Refresh token does not matched");
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {}, "Successfully updated access and refresh token")
            )
    } catch (error) {
        throw new ApiError(403, error?.message || "Invalid refresh token")
    }
})

const loginUser = AsyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password)
        throw new ApiError(422, "Username/Email and password are required");

    const userExist = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
    })
    if (!userExist)
        throw new ApiError(401, "Invalid Username or password");
    const passwordCheck = await userExist.isPasswordCorrect(password);
    if (!passwordCheck)
        throw new ApiError(401, "Invalid Password");
    const { accessToken, refreshToken: userRefreshToken } = await generateAccessAndRefreshTokens(userExist._id);

    const UpdatedUser = await User.findById(userExist._id).select("-password -serverRefreshToken");
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", userRefreshToken, options)
        .json(new ApiResponse(200, { user: UpdatedUser },
            "User successfully logged In"))
})

const logoutUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: { serverRefreshToken: undefined }
        },
        {
            new: true
        });

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Successfully logged out user"));
})

const followUser = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userIdToFollow = req.params.userId;

    if (userId === undefined || userIdToFollow === undefined) {
        throw new ApiError(400, "User IDs are required");
    }

    if (userId.toString() === userIdToFollow.toString()) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const user = await User.findById(userId);
    const userToFollow = await User.findById(userIdToFollow);

    if (!user || !userToFollow) {
        throw new ApiError(404, "User not found");
    }

    if (user.following.some(id => id.toString() === userIdToFollow.toString())) {
        return res.status(200).json(new ApiResponse(200, {}, "You are already following this user"));
    }

    user.following.push(userIdToFollow);
    userToFollow.followers.push(userId);

    await user.save();
    await userToFollow.save();
    return res.status(200).json(new ApiResponse(200, {}, "Successfully followed the user"));
});

const unfollowUser = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userIdToUnfollow = req.params.userId;

    if (userId === undefined || userIdToUnfollow === undefined) {
        throw new ApiError(400, "User IDs are required");
    }
    if (userId.toString() === userIdToUnfollow.toString()) {
        throw new ApiError(400, "You cannot unfollow yourself");
    }

    const user = await User.findById(userId);
    const userToUnfollow = await User.findById(userIdToUnfollow);
    
    if (!user || !userToUnfollow) {
        throw new ApiError(404, "User not found");
    }
    if (!user.following.some(id => id.toString() === userIdToUnfollow.toString())) {
        return res.status(200).json(new ApiResponse(200, {}, "You are not following this user"));
    }
    user.following = user.following.filter(id => id.toString() !== userIdToUnfollow.toString());
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId.toString());
    await user.save();
    await userToUnfollow.save();
    return res.status(200).json(new ApiResponse(200, {}, "Successfully unfollowed the user"));
});

export { registerUser, loginUser, logoutUser, accessRefreshToken, followUser, unfollowUser };