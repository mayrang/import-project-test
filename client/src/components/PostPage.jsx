import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const PostPage = ({post, user}) => {
    const router = useRouter();
    console.log(user)
    console.log(post)
    const clickRemove = async () => {
        try{
            console.log(post)
            // 추후 url은 props로 받는 형식으로 수정?
            await axios.delete(`/posts/${post[0].postId}`);
            // 경로 추후 수정
            router.replace("/");

        }catch(err){
            console.log(err);
            // 제대로 된 테스트 필요
            // 안됨..
            //toast.error(err.response.data.error);
            alert(err.response.data.error)
        }
    }
    
    // post 데이터가 있는지 체크
    if(post&&post?.length > 0){
        return (
            // post[0] post, post[1]~ comments
            <div className="flex-col items-center h-screen  w-full p-10">
                <div className="text-lg font-bold p-4 border-b border-gray-300">{post[0].postTitle}</div>
                <div className="flex justify-between py-2 px-4">
                    <div className="text-sm font-semibold">글쓴이: {post[0].username}</div>
                    <div className="text-xs pt-1">
                        {/* 수정, 삭제 권한 검사 */}
                        {user&&user.userId === post[0].userId && (
                            <>
                            {/* 수정은 구현 x */}
                            <small className="mr-1">수정</small>
                            <small className="mr-1 cursor-pointer" onClick={clickRemove}>삭제</small>
                            </>
                        )}
                        <small className="px-2">댓글: {post.length - 1 }</small>

                    </div>
                </div>
                <div className="border-y py-1 px-4 border-gray-300 my-2" style={{minHeight: 400}}>
                    {post[0].main}
                </div>
            </div>
        );     
    }else{
        return (
            <div>
                해당하는 포스트가 없습니다.
            </div>
        )
    }
   
};

export default PostPage;