import React from "react";
import cls from "classnames";

const CalendarPost = ({post}) => {
    // post의 인덱스 확인후 해당 위치에 그려주기
    if(post.index === 1){
        return (
            <div 
                className={cls("absolute w-full top-6 md:top-8 h-3.5 md:h-4  bg-blue-200 text-[10px] md:text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap", {"rounded-lg":!post.multiple})}
            >
                {!post.start || post.username|| post.content}
            </div>
        )
    }else if(post.index === 2){
        return(
            <div 
                className={cls("absolute w-full top-11 md:top-14 h-3.5 md:h-4 bg-blue-200 text-[10px] md:text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap", {"rounded-lg":!post.multiple})}
            >
                {!post.start || post.username || post.content}
            </div>
        )
       
    }else if(post.index === 3){
        return (
            <div 
                className={cls("absolute w-full top-16 md:top-20 h-3.5 md:h-4 bg-blue-200 text-[10px] md:text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap", {"rounded-lg":!post.multiple})}
            >
                {!post.start|| post.username || post.content}
            </div>
        )
        
    }else{
        return null;
    }
};

export default CalendarPost;