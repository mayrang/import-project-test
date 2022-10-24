import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleAddModal = ({setShowModal, user, mutate}) => {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [content, setContent] = useState("");

    const submitSchedule = async () => {
        try{
            console.log(user)
            if((!user)||Object.keys(user).length === 0) return alert("로그인된 유저만 등록 가능합니다.");
            if(endTime < startTime) return alert("시간 역전 안돼!!!");
            if(content.trim() === "") return alert("일정 내용을 채워주세요");
            await axios.post("/schedule/post", {
                startTime,
                endTime,
                content
            });
            mutate();
            setShowModal(false);


        }catch(err){

        }
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
            <div className="bg-white rounded w-10/12">
                <div className="border-b px-4 py-2 flex-col text-left items-center">
                    <div className="flex-col  items-center">
                        <div className="mr-3">
                            <label htmlFor="startTime" className="font-semibold mb-2">Start Time</label>
                            <DatePicker
                                id="startTime"
                                selected={startTime}
                                className="border rounded border-gray-500"
                                onChange={(date) => setStartTime(date)}
                                dateFormat="yyyy/MM/dd p"
                                selectsStart
                                startDate={startTime}
                                endDate={endTime}
                                showTimeSelect  

                                minDate={new Date()}
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime" className="font-semibold mb-2">End Time</label>
                            <DatePicker
                                id="endTime"
                                selected={endTime}
                                className="border rounded border-gray-500"
                                onChange={(date) => setEndTime(date)}
                                dateFormat="yyyy/MM/dd p"
                                selectsEnd
                                startDate={startTime}
                                endDate={endTime}
                                showTimeSelect
                                minDate={startTime}
                            />
                        </div>

                    </div>
                    <div className="py-2 ">
                        <label htmlFor="content" className="font-semibold mb-2 ">일정 내용</label>
                        <br/>
                        <textarea id="content" value={content} onChange={(e)=> setContent(e.target.value)} style={{minWidth:300, minHeight:100}} className="border w-full rounded" />
                    </div>
                    
                
                </div>
                <div className="flex justify-between items-center w-full p-3">
                    <div>
                        <button onClick={submitSchedule} className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white rounded p-2">등록</button>
                    </div>
                    <div>
                        <button onClick={() => setShowModal(false)} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleAddModal;