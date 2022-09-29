import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import PostPage from "../../components/PostPage";

const PostView = ({user}) => {
    const router = useRouter();
    const {postId} = router.query;
    return(
        <>
            {/* 경로 넘겨주기 */}
            <PostPage  user={user} path={postId}/>

        </>        
    );
};

export default PostView;

export const getServerSideProps = async ({req}) => {
    // user 데이터를 가져오기 위한 작업
    try{
        // cookie 존재 여부 확인
        const cookie = req.headers.cookie;
    //     console.log(cookie)
        if(!cookie) throw new Error("쿠키가 존재하지 않습니다.")
        const user = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
            headers: {
                cookie
            }
        });
        console.log(user)
        return {
            props: {
                user: user.data
            }
        }
    }catch(err){
        console.log(err);
        return {
            props:{}
        }
    }

    
}