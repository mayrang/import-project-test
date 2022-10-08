import React from "react";
import cls from "classnames";
import CalendarPost from "./CalendarPost";


const ViewCalendar = ({calendarData}) => {
    
    return (
        <div className="w-full ">
             <div className="flex   h-screen items-center  justify-center">
                <div className="w-full bg-white border px-3">
                    <div className="flex items-center w-full rep text-center">
                        <div className="border flex-1 border-black bg-gray-200 grow">SUN</div>
                        <div className="border flex-1 border-black bg-gray-200 grow">MON</div>
                        <div className="border flex-1 border-black bg-gray-200 grow">TUE</div>
                        <div className="border flex-1 border-black bg-gray-200 grow">WED</div>
                        <div className="border flex-1 border-black bg-gray-200 grow">THU</div>
                        <div className="border flex-1 border-black bg-gray-200 grow">FRI</div>
                        <div className="border flex-1 border-black bg-gray-200 grow">SAT</div>
                   </div>
                   {calendarData?.map((week, idx) => (
                        <div key={idx} className="flex items-center w-full h-24 md:h-32">
                        {week.map((date, idx) => (
                            <div key={idx} className="relative w-full h-full flex-1 border overflow-hidden overflow-ellipsis  whitespace-nowrap">
                                <small className={cls("text-xs pl-1 font-semibold  ", {"text-gray-300":date.type === "prev" || date.type === "next"}, {"text-red-500":date.holiday||idx % 7 === 0})}>{date.date} </small>
                                <small className="text-[10px] text-red-500">{date.holiday?.dateName}</small>
                                {/* {date.posts?.length > 0 && (
                                    <div 
                                        className="md:h-5 w-full h-4 bg-blue-200 text-xs mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap"
                                    >
                                        {date.posts[0].nickname || date.posts[0].content}
                                    </div>
                                )}
                                {date.posts?.length > 1 && (
                                    
                                )} */}
                                {date.posts?.map((post) => (
                                    <CalendarPost key={post.calendarId} post={post} />
                                ))}
                            </div>
                        ))}
                </div>
            ))}
                </div>
            </div>   

            
            
        </div>
    )
};

export default ViewCalendar;