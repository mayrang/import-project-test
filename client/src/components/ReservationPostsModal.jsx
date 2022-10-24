import dayjs from "dayjs";
import React from "react";

const ReservationPostsModal = ({postDate, setPostDate, user, mutate, setReservationPostsModal, setReservationAddModal}) => {
    
    const closePostsModal = () => {
        setPostDate({});
        setReservationPostsModal(false);
    }
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
        <div className="bg-white rounded w-10/12">
            <div className="flex justify-between items-start p-4 border-b ">
                <h3 className="text-xl font-semibold text-gray-900">
                    {postDate.date}일
                </h3>   
            </div>
            <div className="border-b px-4 py-2 flex-col text-left items-center">                  
                {postDate?.posts?.map((post) => (
                    <div key={post.calendarId} className="flex border-b items-center justify-between">
                        <div className="flex items-center justify-center">
                            <div className="flex-col justify-center items-center p-2">
                                <p className="font-medium text-sm">예약자: {post.username}</p>
                                <p className="font-medium text-sm">예약 인원: {post.numberOfPeople}명</p>
                            </div>
                            <div className="flex-col justify-center items-center p-2">
                                <p className="font-medium text-sm">시작시간: {dayjs(post.startTime).format("DD일 HH:mm")}</p>
                                <p className="font-medium text-sm">종료시간: {dayjs(post.endTime).format("DD일 HH:mm")}</p>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center w-full p-3">
                <div>
                    <button onClick={closePostsModal} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ReservationPostsModal;