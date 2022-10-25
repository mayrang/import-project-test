import dayjs from "dayjs";
import React from "react";

const ReservationPostsModal = ({postDate, setPostDate, user, mutate, setReservationPostsModal, setReservationAddModal}) => {
    // 각 날짜의 포스트 시작시간순으로 배열
    const sortedPosts = postDate?.posts?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    console.log(sortedPosts)
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
                {sortedPosts?.map((post) => (
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
                        <div className="p-2 flex-col md:flex items-center">
                            {post.userId === user.userId && (
                                <>
                                <button className="p-2 border rounded bg-white border-green-500 hover:bg-green-500 hover:text-white">수정</button>
                                <button className="mt-1 md:ml-2 p-2 border rounded bg-white border-red-500 hover:bg-red-500 hover:text-white">삭제</button>
                                </>
                          
                            )}
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="flex justify-end items-center w-full p-3">
                <div>
                    <button onClick={closePostsModal} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ReservationPostsModal;