import React from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useSelector } from "react-redux";

const SchedulePostsModal = ({modalDate, setModalDate, setModalPost, mutate, setSchedulePostsModal, setScheduleAddModal, }) => {
    // 각 날짜 포스트 시간 순으로 배열
    const sortedPosts = modalDate?.posts.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    const {user} = useSelector((state) => state.user);

    // modal 창 닫기
    const closePostsModal = () => {
        setSchedulePostsModal(false);
        setModalDate({});
    };
    // 수정 버튼 클릭
    const clickEdit = (post) => {
        // modalDate 빈 객체로
        setModalDate({});
        // addmodal에 해당 post 값 넣어주기 위해
        setModalPost(post);
        // 목록 modal 끄고 addModal 창 켜기
        setSchedulePostsModal(false);
        setScheduleAddModal(true);
        
    };

    const clickRemove = async (post) => {
        // 삭제권한 확인
        if(user.userId !== post.userId) return alert("삭제 권한이 없습니다.");

        try{
            await axios.delete(`/schedule/post/${post.calendarId}`);
            mutate();
            setModalDate({});
            setModalPost({});
            setSchedulePostsModal(false);
        }catch(err){
            console.log(err);
            alert(err.response?.data?.error || err.response?.data || "errer");
        }
    }

    return (
    // 배경
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
            {/* modal */} 
            <div className="bg-white rounded w-10/12">
                {/* modal header */}
                <div className="flex justify-between items-start p-4 border-b ">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {modalDate.date}일
                    </h3>   
                </div>
                {/* modal main */}
                <div className="border-b px-4 py-2 flex-col text-left items-center">                  
                    {sortedPosts?.map((post) => (
                        <div key={post.calendarId} className="flex border-b items-center justify-between">
                            <div className="flex items-center justify-center">
                                <div className="flex-col justify-center items-center p-2">
                                    <p className="font-medium text-sm">일정: {post.content}</p>
                                
                                </div>
                                <div className="flex-col justify-center items-center p-2">
                                    <p className="font-medium text-sm">시작시간: {dayjs(post.startTime).format("DD일 HH:mm")}</p>
                                    <p className="font-medium text-sm">종료시간: {dayjs(post.endTime).format("DD일 HH:mm")}</p>
                                </div>
                            </div>
                            <div className="p-2 flex-col items-center ">
                                {/* 수정 삭제 권한 확인 후  */}
                                {post.userId === user.userId && (
                                    <>
                                    <button onClick={() => clickEdit(post)} className="p-2 border rounded bg-white border-green-500 hover:bg-green-500 hover:text-white">수정</button>
                                    <button onClick={() => clickRemove(post)} className="mt-1 p-2 border rounded bg-white border-red-500 hover:bg-red-500 hover:text-white">삭제</button>
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
    )
};

export default SchedulePostsModal;