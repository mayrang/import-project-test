import React from "react";


const ViewCalendar = ({calendarData}) => {
    
    return (
        <div className="w-full">
             <div className="flex flex-col h-screen items-center  justify-center">
                <div className="w-11/12 bg-white border">
                    <div className="flex items-center w-full text-center">
                        <div className="border border-black bg-gray-200 grow">SUN</div>
                        <div className="border border-black bg-gray-200 grow">MON</div>
                        <div className="border border-black bg-gray-200 grow">TUE</div>
                        <div className="border border-black bg-gray-200 grow">WED</div>
                        <div className="border border-black bg-gray-200 grow">THU</div>
                        <div className="border border-black bg-gray-200 grow">FRI</div>
                        <div className="border border-black bg-gray-200 grow">SAT</div>
                   </div>
                </div>
            </div>    
            
        </div>
    )
};

export default ViewCalendar;