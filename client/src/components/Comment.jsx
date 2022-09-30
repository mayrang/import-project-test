import React from "react";
import dayjs from "dayjs";
import axios from "axios";



const Comment = ({comment, user, mutate}) => {

    const clickRemove = async (commentId) => {
        try{
            await axios.delete(`/comments/${commentId}`);
            mutate();
        }catch(err){
            console.log(err);
            alert(err.response?.data?.error);

        }
    }

    return (
        <div className="flex items-center justify-between border-b border-gray-300 w-full py-3">
            <div className="font-semibold text-sm w-2/12">
                {comment.username}
            </div>
            <div className="text-left w-8/12">
                {comment.comment}
            </div>
            <div className="flex-col w-2/12">
                <div>
                    {/* 수정은 추후 api와 erd 확정 이후 변경 */}
                    {(user&&user.userId === comment.userId)&&(
                        <>
                        <small className="cursor-pointer hover:font-semibold">수정</small>
                        <small className="cursor-pointer hover:font-semibold" onClick={() => clickRemove(comment.commentId)}> 삭제</small>
                        </>
                    )}
                    
                </div>
                <small>{dayjs(comment.commentTime).format("YYYY-MM-DD HH:mm")}</small>
            </div>
        </div>
    );
};

export default Comment;