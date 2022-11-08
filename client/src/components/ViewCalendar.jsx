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
import { useSelector } from "react-redux";


const ViewCalendar = ({calendarData, path, posts, mutate}) => {
    // 예약 추가 or 일정 추가 modal을 컨트롤 하기 위한 state
    const [reservationAddModal, setReservationAddmodal] = useState(false);
    const [scheduleAddModal, setScheduleAddModal] = useState(false);
    // 예약 목록 or 일정 목록 modal을 컨트롤 하기위한 state
    const [reservationPostsModal, setReservationPostsModal] = useState(false);
    const [schedulePostsModal, setSchedulePostsModal] = useState(false);
    // modalDate 예약 or 일정 목록 modal에 해당 일자의 객체 정보를 주기 위한 state
    const [modalDate, setModalDate] = useState({});
    // modalPost 예약 or 일정 수정을 위한 state
    const [modalPost, setModalPost] = useState({});
    const router = useRouter();
    const {year, month} = router.query;
    // 년도와 월을 표시하기 위한 변수
    const calendarYear = year||dayjs().format("YYYY");
    const calendarMonth = month||dayjs().format("MM");
    const {user} = useSelector((state) => state.user);
    // 다음 달
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

    // 이전 달
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

    // 예약 OR 일정 추가 함수
    const clickAdd = () => {
        // path를 통해 어떤 addModal을 켜야하는지 체크 
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

    // 예약 or 일정 목록 modal를 키는 함수
    const clickPostsModal = (date) => {
        // 목록이 존재하는 경우에만 키도록 검증
        if(date?.posts?.length > 0){
            setModalDate(date);
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
                {/* year, month를 표시하는 부분 */}
                <div className="flex items-center justify-between w-full  p-3 ">
                    <div onClick={clickPrev} className="text-2xl">{"<"}</div>
                    <div className="text-2xl">{calendarYear}년 {calendarMonth}월</div>
                    <div onClick={clickNext} className="text-2xl">{">"}</div>
                </div>
                {/* 요일 ui를 표시하는 부분 */}
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
                   {/* calendarData 배열을 주 단위로 map */}
                   {calendarData?.map((week, idx) => (
                        <div key={idx} className="flex items-center w-full h-24 md:h-32">
                        {/* 각 week를 date단위로 map */}
                        {week.map((date, idx) => (
                            // 각 date ui 부분 content나 username이 길어질시 ...으로 자르도록 했음
                            <div key={idx} onClick={() => clickPostsModal(date)} className="relative w-full h-full flex-1 border overflow-hidden overflow-ellipsis  whitespace-nowrap">
                                {/* 날짜 표시하는 부분(공휴일이거나 휴일일시 text-red, 해당 날짜가 오늘일시 bg에 blue 추가) */}
                                <small className={cls("text-xs ml-1 font-semibold  ", {"text-gray-300":date.type === "prev" || date.type === "next"}, {"text-red-500":date.holiday||idx % 7 === 0}, {" bg-blue-200 bg-rounded rounded-full ":date.dayFormat === dayjs().format("YYYYMMDD")})}>{date.date} </small>
                                {/* 공휴일 ui 부분 */}
                                <small className="text-[10px] text-red-500">{date.holiday?.dateName}</small>
                                {/* 각 post표시 ui 컴포넌트 */}
                                {date.posts?.map((post) => (
                                    <CalendarPost key={post.calendarId} post={post} />
                                ))}
                                {/* 해당 날짜에 몇개의 post가 있는지 표시 */}
                                {date.posts?.length > 0 &&<p className="absolute bottom-0 px-1  text-gray-400 text-[10px] md:text-xs">{date.posts?.length}개</p>}
                            </div>
                 
                        ))}
                        </div>
                        
                    ))}
                </div>
                {/* 로그인 여부와 해당 유저의 레벨 체크후 각 path에 맞게 추가 버튼 ui 생성 */}
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
        {/* 예약 or 일정 추가 modal 컴포넌트 */}
        {reservationPostsModal && <ReservationPostsModal  setModalPost={setModalPost} modalDate={modalDate} setModalDate={setModalDate} mutate={mutate} user={user} setReservationPostsModal={setReservationPostsModal} setReservationAddModal={setReservationAddmodal}/>}
        {schedulePostsModal && <SchedulePostsModal setModalPost={setModalPost} modalDate={modalDate} setModalDate={setModalDate} mutate={mutate} user={user} setSchedulePostsModal={setSchedulePostsModal} setScheduleAddModal={setScheduleAddModal} />}
        {/* 예약 or 일정 목록 modal 컴포넌트 */}
        {reservationAddModal && <ReservationAddModal modalPost={modalPost} setModalPost={setModalPost} setReservationAddModal={setReservationAddmodal} user={user} posts={posts} mutate={mutate}/>}        
        {scheduleAddModal && <ScheduleAddModal modalPost={modalPost} setModalPost={setModalPost} setScheduleAddModal={setScheduleAddModal}  user={user}  mutate={mutate}/>}

        </>
    )
};

export default ViewCalendar;