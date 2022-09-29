import React from "react";

const PostPage = ({post}) => {
    if(post&&post?.length > 0){
        return (
        
            <div className="flex-col items-center h-screen  w-full p-10">
                <div className="text-lg font-bold p-4 border-b border-gray-300">{post[0].postTitle}</div>
                <div className="flex justify-between py-2 px-4">
                    <div className="text-sm font-semibold">글쓴이: {post[0].username}</div>
                    <div className="text-xs">댓글: {post.length - 1 }</div>
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