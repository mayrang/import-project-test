import axios from "axios";
import React from "react";
import PostPage from "../../components/PostPage";

const PostView = ({post, user}) => {
    return(
        <>
        {post && (
            // 포스트 페이지 post 배열, user 객체
            <PostPage post={post} user={user}/>
        )}
        </>        
    );
};

export default PostView;

export const getServerSideProps = async ({req, query}) => {
    /* postData를 담아놓을 빈 배열**/
    let post = [];
    // userData를 담아놓은 빈 객체
    let user = {};
    try{
        console.log(query)
        const cookie = req.headers.cookie;
        console.log(cookie)
        const postData= await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${query.postId}`);
        post = [...postData.data];
        const userData = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
            headers: {
                cookie
            }
        })
       
        user = {...userData.data};
        return {
            props: {
                post,
                user
            }
        }
    }catch(err){
        console.log(err)
        // post에 데이터가 있고 유저 객체가 없을 때는 post 리턴
        if(post.length > 0){
            console.log(post)
            return {
                props: {post}
            }
        }else{
            return {
                props: {}
            }
        }
        
    }
    
}