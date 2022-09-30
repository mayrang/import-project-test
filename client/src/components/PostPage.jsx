import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import useSWR from "swr"
import Comment from "./Comment";


const PostPage = ({user, path}) => {
    const router = useRouter();

    const fetcher = async (url) => {
        try{
            const result = await axios.get(url);
            return result.data;
        }catch(err){
            throw err.response.data;
        }
    };

    const {data:post, mutate} = useSWR(path ? `/posts/${path}`: null, fetcher)
    // comment state
    const [comment, setComment] = useState("")

    // comment submit 아직 api 명세서 없어서 추후 수정 필요
    const submitComment = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`/comments/${path}`, {
                comment
            });
            mutate();
            setComment("");
        }catch(err){
            console.log(err);
            alert(err.response.data.error);
        }
    }

    // postId 매개변수로 따로 받을지 props 값 바로 사용할지 고민
    const clickRemove = async (postId) => {
        try{
            console.log(post)
            // 추후 url은 props로 받는 형식으로 수정?
            await axios.delete(`/posts/${postId}`);
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
                    <div className="text-sm font-semibold">
                        글쓴이: {post[0].username}
                        {/* postTime type에 따라 추후 수정 필요(현재 DateTime) */}
                        <small className="px-2 pb-1">{dayjs(post[0].postTime).format("YYYY-MM-DD HH:mm")}</small>
                    </div>
                    <div className="text-xs pt-1">
                        {/* 수정, 삭제 권한 검사 */}
                        {user&&user.userId === post[0].userId && (
                            <>
                            {/* 수정은 구현 x */}
                            <small className="mr-1">수정</small>
                            <small className="mr-1 cursor-pointer hover:font-semibold" onClick={() => clickRemove(post[0].postId)}>삭제</small>
                            </>
                        )}
                        <small className="px-2">댓글: {post.length - 1 }개</small>

                    </div>
                </div>
                <div className="border-y py-1 px-4 border-gray-300 my-2" style={{minHeight: 400}}>
                    {post[0].main}
                </div>
                <div className="flex-col">
                    <p className="text-lg font-semibold">댓글 : {post.length - 1}개</p>
                    {user&& (
                        <div className="py-2 border-y border-gray-300">
                            <form onSubmit={submitComment}>
                                <textarea 
                                    className="border border-gray-200 w-full"
                                    style={{minHeight: 100, minWidth: 400}}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}    
                                />
                                <div className="flex justify-end">
                                    <button type="submit" className="border rounded bg-blue-300 text-sm p-2">등록하기</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {post.length > 1 && (
                        <>
                        {post.map((comment, idx) => {
                            if(idx === 0){
                                return;
                            }else{
                                return (
                                    // 댓글과 유저 정보 그리고 삭제 혹은 수정시 갱신되도록 mutate함수 props
                                    <Comment comment={comment} key={comment.commentId} user={user} mutate={mutate}/>
                                )
                            }
                        })}
                        </>
                    )}
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