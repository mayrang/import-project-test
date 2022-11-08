import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const ScheduleAddModal = ({modalPost, setModalPost, setScheduleAddModal,  mutate}) => {
    // modalPost가 있으면 기본값으로 설정
    // 시작, 끝 시간 state
    const [startTime, setStartTime] = useState((modalPost?.startTime && new Date(modalPost?.startTime)) || new Date());
    const [endTime, setEndTime] = useState((modalPost?.startTime && new Date(modalPost?.endTime)) || new Date());
    // 일정 내용
    const [content, setContent] = useState(modalPost?.content || "");

    const {user} = useSelector((state) => state.user);

    const submitSchedule = async () => {
        try{
            console.log(user)
            // 로그인 여부
            if((!user)||Object.keys(user).length === 0) return alert("로그인된 유저만 등록 가능합니다.");
            // 시간 역전 여부
            if(endTime < startTime) return alert("시간 역전 안돼!!!");
            // content의 값이 있는지
            if(content.trim() === "") return alert("일정 내용을 채워주세요");
            // 수정인지 최초등록인지 체크
            if(Object.keys(modalPost).length > 0){
                await axios.patch(`/schedule/post/${modalPost.calendarId}`, {
                    startTime,
                    endTime,
                    content
                })
            }else{
                await axios.post("/schedule/post", {
                    startTime,
                    endTime,
                    content
                });
            }
            // post 갱신
            mutate();
            // modal 창 닫기
            setScheduleAddModal(false);
            setModalPost({});


        }catch(err){
            console.log(err);
            alert(err.response?.data?.error || err.response?.data || "errer");
        }
    }
    // modal 창 닫기
    const closeAddModal = () => {
        setScheduleAddModal(false)
    }

    return (
        // 배경
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
            {/* modal */}
            <div className="bg-white rounded w-10/12">
                {/* modal header */}
                <div className="flex justify-between items-start p-4 border-b ">
                    <h3 className="text-xl font-semibold text-gray-900">
                        일정등록
                    </h3>
                    
                </div>
                {/* modal main */}
                <div className="border-b px-4 py-2 flex-col text-left items-center">
                    <div className="flex-col  items-center">
                        <div className="mr-3">
                            <label htmlFor="startTime" className="font-semibold mb-2">Start Time</label>
                            {/* 시작 시간(현재시간 이후 선택가능, time은 30분 단위) */}
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
                            {/* 끝 시간 */}
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
                    {/* content */}
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
                        <button onClick={closeAddModal} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleAddModal;