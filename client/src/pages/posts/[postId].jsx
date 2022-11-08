import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import PostPage from "../../components/PostPage";
import { asyncUserLoadMyInfo } from "../../redux/reducers/UserSlice";
import wrapper from "../../redux/store";

const PostView = () => {
    const router = useRouter();
    const {postId} = router.query;
    return(
        <>
            {/* 경로 넘겨주기 */}
            <PostPage path={postId}/>

        </>        
    );
};

export default PostView;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
    // user 데이터를 가져오기 위한 작업
    try{
        // cookie 존재 여부 확인
        const cookie = req.headers.cookie;
    //     console.log(cookie)
        if(cookie){
           await store.dispatch(asyncUserLoadMyInfo(cookie));
        }
        return {
            props: {
                
            }
        }
    }catch(err){
        console.log(err);
        return {
            props:{}
        }
    }

    
} ) 