import { Card } from "@mui/material";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import PostComments from "./PostComments";

const PostCard = ({ post }) => {
    return (
        <Card sx={{ mb: 3 }}>
            <PostHeader post={post} />
            <PostMedia post={post} />
            <PostActions post={post} />
            <PostComments post={post} />
        </Card>
    );
};

export default PostCard;
