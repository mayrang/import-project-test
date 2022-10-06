import React from "react";
import cls from "classnames";


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
                            <div key={idx} className="p-1 w-full h-full flex-1 border overflow-hidden overflow-ellipsis  whitespace-nowrap">
                                    <small className={cls("text-xs font-semibold  ", {"text-gray-300":date.type === "prev" || date.type === "next"}, {"text-red-500":date.holiday||idx % 7 === 0})}>{date.date} </small>
                                    <small className="text-[10px] text-red-500">{date.holiday?.dateName}</small>
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