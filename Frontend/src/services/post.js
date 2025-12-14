import Api from "./api";

export const createPost = async (data) => {
    try {
        const res = await Api.post("/posts/create-post", data, {
            withCredentials: true,
        });
        return res.data.data;
    } catch (err) {
        const msg = err.response?.data?.message || "Failed to create post";
        throw new Error(msg);
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await Api.delete(`/posts/delete-post/${postId}`)
        return response.data.message || "Successfully deleted"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to delete post";
        throw new Error(errMsg);
    }
}

export const likeUnlikePost = async (postId) => {
    try {
        const response = await Api.post(`/posts/like-unlike-post/${postId}`)
        return response.data.data || {};
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to update like status";
        throw new Error(errMsg);
    }
}

export const commentOnPost = async (postId, comment) => {
    try {
        const response = await Api.post(`/posts/comment-on-post/${postId}`, { comment })
        return response.data.data || "Successfully commented on post"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to comment on post";
        throw new Error(errMsg);
    }
}

export const deleteComment = async (postId, commentId) => {
    try {
        const response = await Api.delete(`/posts/delete-comment/${postId}/${commentId}`)
        return response.data.data || "Successfully deleted comment"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to comment on post";
        throw new Error(errMsg);
    }
}