import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import axios from "axios";



const ReservationAddModal = ({modalPost, setModalPost,  setReservationAddModal, user, posts, mutate}) => {
    const [startTime, setStartTime] = useState((modalPost?.startTime && new Date(modalPost?.startTime)) || new Date());
    const [endTime, setEndTime] = useState((modalPost?.endTime && new Date(modalPost?.endTime)) ||new Date());
    const [numberOfPeople, setNumberOfPeople] = useState(modalPost?.numberOfPeople || "1");
 

    const submitReservation = async () => {
        // 추가 검증 필요?
            
        try{
            if((!user)||Object.keys(user).length === 0) return alert("로그인된 유저만 등록 가능합니다.");
            if(endTime < startTime) return alert("시간 역전 안돼!!!");
            if(startTime < new Date()) return alert("지난시간에는 예약할 수 없습니다.");
            const checkReservation = posts.filter((it) => ((startTime >= new Date(it.startTime)) && (startTime <= new Date(it.endTime)) || (endTime >= new Date(it.startTime)) && (endTime <= new Date(it.endTime))));
            console.log(checkReservation)
            if(checkReservation.length > 0) return alert("겹치는 예약이 있습니다!");
            if(Object.keys(modalPost).length > 0){
                await axios.patch(`/reservation/post/${modalPost.calendarId}`, {
                    startTime,
                    endTime,
                    numberOfPeople: parseInt(numberOfPeople),
                    username: user.nickname
                });
            }else{
                await axios.post("/reservation/post", {
                    startTime,
                    endTime,
                    numberOfPeople: parseInt(numberOfPeople),
                    username: user.nickname
                });
            }
            
            mutate();
            setReservationAddModal(false);
            setModalPost({});
            
        }catch(err){
            console.log(err);
            alert(err.response?.data?.error || err.response?.data || "errer");
        }
            

        
    }

    const closeAddModal = () => {
        setReservationAddModal(false);
        setModalPost({});
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
        <div className="bg-white rounded md:w-4/12 w-9/12">
            <div className="flex justify-between items-start p-4 border-b ">
                <h3 className="text-xl font-semibold text-gray-900">
                    예약하기
                </h3>
                
            </div>
            <div className="border-b px-4 py-2 flex-col text-left items-center">
                <div className="flex-col  items-center  ">
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
                            timeInputLabel="Time :"
                            showTimeInput
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
                            timeInputLabel="Time :"
                            showTimeInput
                            minDate={startTime}
                            maxDate={addDays(startTime, 1)}
                        />
                    </div>

                </div>
                <div className="py-2">
                    <label htmlFor="numberOfPeople" className="font-semibold mb-2">인원 수</label>
                    <select id="numberOfPeople" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded m-2 p-1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                    </select>
                    
                </div>
                
                
            
            </div>
            <div className="flex justify-between items-center w-full p-3">
                <div>
                    <button onClick={submitReservation} className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white rounded p-2">등록</button>
                </div>
                <div>
                    <button onClick={closeAddModal} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ReservationAddModal;