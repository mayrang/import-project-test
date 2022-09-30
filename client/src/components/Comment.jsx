import React from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";



const Comment = ({comment, user, mutate}) => {
    // 댓글이 수정중인지 체크하는 state
    const [isEdit, setIsEdit] = useState(false);
    // 댓글 수정 state
    const [editComment, setEditComment] = useState(comment.comment || "")

    //댓글 삭제, api명세서에 따라 추후 변경 필요
    const clickRemove = async (commentId) => {
        try{
            await axios.delete(`/comments/${commentId}`);
            mutate();
        }catch(err){
            console.log(err);
            alert(err.response?.data?.error || "error");

        }
    };

    //댓글 수정, api명세서에 따라 추후 변경 필요
    const submitEditComment = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`/comments/edit/${comment.commentId}`, {
                editComment
            });
            mutate();
            setIsEdit(false);
        }catch(err){
            console.log(err);
            alert(err.response?.data?.err || "error");
        }
    };

    return (
        <div className="flex items-center justify-between border-b border-gray-300 w-full py-3">
            <div className="font-semibold text-sm w-2/12">
                {comment.username}
            </div>
        
            {isEdit ? (
                <form onSubmit={submitEditComment} className="w-10/12">
                        <textarea 
                            className="text-left w-full border rounded border-gray-400 mr-2"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                        />
                        <div className="flex items-center justify-end">
                            <div className="border border-red-500 runded text-xs p-1 mr-1 hover:bg-red-500 hover:text-white" onClick={() => setIsEdit(false)}>취소</div>
                            <button type="submit" className="border rounded p-1 border-blue-500 text-xs hover:bg-blue-500 hover:text-white">수정</button>
                        </div>    
                </form>
               
            ):(
                <div className="text-left w-8/12">{comment.comment}</div>
            )}
            {!isEdit&&(
                <div className="flex-col w-2/12">
                <div>
                    {/* 수정과 삭제는 추후 api와 erd 확정 이후 변경 */}
                    {(user&&user.userId === comment.userId)&&(
                        <>
                        <small className="cursor-pointer hover:font-semibold" onClick={() => setIsEdit(true)}>수정</small>
                        <small className="cursor-pointer hover:font-semibold" onClick={() => clickRemove(comment.commentId)}> 삭제</small>
                        </>
                    )}
                    
                </div>
                <small>{dayjs(comment.commentTime).format("YYYY-MM-DD HH:mm")}</small>
            </div>
            )}
            
        </div>
    );
};

export default Comment;