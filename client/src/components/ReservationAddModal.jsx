import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";


const ReservationAddModal = ({setShowModal}) => {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
        <div className="bg-white rounded w-10/12">
            <div className="border-b px-4 py-2 flex-col text-left items-center">
                <div className="flex  itmes-center">
                    <div className="mr-3">
                        <div className="font-semibold mb-2">Start Time</div>
                        <DatePicker
                            selected={startTime}
                            className="border rounded border-gray-500"
                            onChange={(date) => setStartTime(date)}
                            dateFormat="yyyy/MM/dd p"
                            selectsStart
                            startDate={startTime}
                            endDate={endTime}
                            timeInputLabel="Time :"
                            showTimeInput

                            minDate={new Date()}
                        />
                    </div>
                    <div>
                        <div className="font-semibold mb-2">End Time</div>
                        <DatePicker
                            selected={endTime}
                            className="border rounded border-gray-500"
                            onChange={(date) => setEndTime(date)}
                            dateFormat="yyyy/MM/dd p"
                            selectsEnd
                            startDate={startTime}
                            endDate={endTime}
                            timeInputLabel="Time :"
                            showTimeInput
                            minDate={startTime}
                            maxDate={addDays(startTime, 1)}
                        />
                    </div>

                </div>
                
                
            
            </div>
            <div className="flex justify-between items-center w-full p-3">
                <div>
                    <button className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white rounded p-2">합격</button>
                </div>
                <div>
                    <button onClick={() => setShowModal(false)} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ReservationAddModal;