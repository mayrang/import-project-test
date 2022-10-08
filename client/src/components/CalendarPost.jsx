import React from "react";
import cls from "classnames";

const CalendarPost = ({post}) => {
    // console.log(post)
    if(post.index === 1){
        return (
            <div 
                className={cls("absolute w-full top-1/4 h-4 bg-blue-200 text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap", {"rounded-lg":!post.multiple})}
            >
                {!post.start || post.nickname|| post.content}
            </div>
        )
    }else if(post.index === 2){
        return(
            <div 
                className={cls("absolute w-full top-2/4 h-4 bg-blue-200 text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap", {"rounded-lg":!post.multiple})}
            >
                {!post.start || post.nickname|| post.content}
            </div>
        )
       
    }else if(post.index === 3){
        return (
            <div 
                className={cls("absolute w-full top-3/4 h-4 bg-blue-200 text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap", {"rounded-lg":!post.multiple})}
            >
                {!post.start|| post.nickname || post.content}
            </div>
        )
        
    }else{
        return null;
    }
};

export default CalendarPost;