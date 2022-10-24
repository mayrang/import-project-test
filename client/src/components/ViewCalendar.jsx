import React from "react";
import cls from "classnames";
import CalendarPost from "./CalendarPost";
import {useRouter} from "next/router";
import dayjs from "dayjs";
import { useState } from "react";
import ReservationAddModal from "./ReservationAddModal";
import ScheduleAddModal from "./ScheduleAddModal";
import ReservationPostsModal from "./ReservationPostsModal";
import SchedulePostsModal from "./SchedulePostsModal";


const ViewCalendar = ({calendarData, path, user, posts, mutate}) => {
    const [reservationAddModal, setReservationAddmodal] = useState(false);
    const [scheduleAddModal, setScheduleAddModal] = useState(false);
    const [reservationPostsModal, setReservationPostsModal] = useState(false);
    const [schedulePostsModal, setSchedulePostsModal] = useState(false);
    const [postDate, setPostDate] = useState({});
    const router = useRouter();
    const {year, month} = router.query;
    const calendarYear = year||dayjs().format("YYYY");
    const calendarMonth = month||dayjs().format("MM");

    console.log(calendarData)

    const clickNext = () => {
        if(parseInt(month) === 12){
            router.push({
                pathname: path,
                query: {
                    year: (parseInt(calendarYear)+1).toString(),
                    month: "1"
                }
            })
        }else{
            router.push({
                pathname: path,
                query: {
                    year: calendarYear.toString(),
                    month: (parseInt(calendarMonth)+1).toString()
                }
            })
        }
    };

    const clickPrev = () => {
        if(parseInt(month) === 1){
            router.push({
                pathname: path,
                query: {
                    year: (parseInt(calendarYear)-1).toString(),
                    month: "12"
                }
            })
        }else{
            router.push({
                pathname: path,
                query: {
                    year: calendarYear.toString(),
                    month: (parseInt(calendarMonth)-1).toString()
                }
            });

        }
    };


    const clickAdd = () => {
        if(path === "/reservation"){
            setReservationAddmodal(true);
            setScheduleAddModal(false);
        }else if(path === "/schedule"){
            setReservationAddmodal(false);
            setScheduleAddModal(true);
        }else{
            return;
        }
    }

    const clickPostsModal = (date) => {
        if(date?.posts?.length > 0){
            setPostDate(date);
            if(path === "/reservation"){
                setReservationPostsModal(true);
            }else if(path === "/schedule"){
                setSchedulePostsModal(true);
            }else{
                return;
            }
        }else{
            return;
        }
    }

    return (
        <>
        <div className="w-full ">
            <div className="flex-col   h-screen items-center  justify-center">
                <div className="flex items-center justify-between w-full  p-3 ">
                    <div onClick={clickPrev} className="text-2xl">{"<"}</div>
                    <div className="text-2xl">{calendarYear}년 {calendarMonth}월</div>
                    <div onClick={clickNext} className="text-2xl">{">"}</div>
                </div>
                <div className="w-full bg-white  px-3">
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
                            <>
                            <div key={idx} onClick={() => clickPostsModal(date)} className="relative w-full h-full flex-1 border overflow-hidden overflow-ellipsis  whitespace-nowrap">
                                <small className={cls("text-xs ml-1 font-semibold  ", {"text-gray-300":date.type === "prev" || date.type === "next"}, {"text-red-500":date.holiday||idx % 7 === 0}, {" bg-blue-200 bg-rounded rounded-full ":date.dayFormat === dayjs().format("YYYYMMDD")})}>{date.date} </small>
                                <small className="text-[10px] text-red-500">{date.holiday?.dateName}</small>
                                
                                {date.posts?.map((post) => (
                                    <CalendarPost key={post.calendarId} post={post} />
                                ))}
                                {date.posts?.length > 0 &&<p className="absolute bottom-0 px-1  text-gray-400 text-[10px] md:text-xs">{date.posts?.length}개</p>}
                            </div>
                            </>
                        ))}
                        </div>
                        
                    ))}
                </div>
                {user&&
                path === "/reservation"&&
                (user.level === "Root" || user.level === "Manager" || user.level === "Member")&&
                (
                <div className="flex justify-end items-center py-2 px-3">
                    <button onClick={clickAdd} className="border rounded border-blue-500 text-sm md:text-lg  bg-white p-2 hover:bg-blue-500 hover:text-white">예약 추가하기</button>
                </div>
                )}
                {user&&
                path === "/schedule"&&
                (user.level === "Root" || user.level === "Manager")&& 
                (
                    <div className="flex justify-end items-center py-2 px-3">
                       <button onClick={clickAdd} className="border rounded border-blue-500 text-sm md:text-lg  bg-white p-2 hover:bg-blue-500 hover:text-white">일정 추가하기</button>
                    </div>
                )}
            </div>   
        </div>
        {reservationPostsModal && <ReservationPostsModal postDate={postDate} setPostDate={setPostDate} mutate={mutate} user={user} setReservationPostsModal={setReservationPostsModal} setReservationAddmodal={setReservationAddmodal}/>}
        {schedulePostsModal && <SchedulePostsModal postDate={postDate} setPostDate={setPostDate} mutate={mutate} user={user} setSchedulePostsModal={setSchedulePostsModal} setScheduleAddModal={setScheduleAddModal} />}
        {reservationAddModal && <ReservationAddModal setShowModal={setReservationAddmodal} user={user} posts={posts} mutate={mutate}/>}        
        {scheduleAddModal && <ScheduleAddModal setShowModal={setScheduleAddModal}  user={user}  mutate={mutate}/>}

        </>
    )
};

export default ViewCalendar;