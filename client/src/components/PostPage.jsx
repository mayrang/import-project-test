import React from "react";

const PostPage = ({post}) => {
    if(post&&post?.length > 0){
        return (
        
            <div>
                {post[0].postTitle}
                {post[0].main}
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