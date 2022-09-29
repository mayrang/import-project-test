import axios from "axios";
import React from "react";
import PostPage from "../../components/PostPage";

const PostView = ({post}) => {
    return(
        <>
        {post && (
            <PostPage post={post} />
        )}
        </>        
    );
};

export default PostView;

export const getServerSideProps = async ({query}) => {
    try{
        console.log(query)
        const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${query.postId}`);
        return {
            props: {
                post: result.data
            }
        }
    }catch(err){
        console.log(err);
        return {
            props: {}
        }
    }
}