import axios from "axios";
import React from "react";


/**
 * setShowModal: modal 닫기 위한 props
 * 
 */
const ClubApplicationModal = ({data, setShowModal, mutate}) => {

    // 합격 submit
    const submitAccept = async (userId) => {
        try{
            await axios.post(`/admin/application/${userId}?result=1`, {
                userId
            });
            setShowModal(false);
            mutate();
        }catch(err){
            console.log(err);
            alert(err.response?.data || "error");
        }
    };

    // 불합격 submit
    const submitFailure = async (userId) => {
        try{
            await axios.post(`/admin/application/${userId}?result=0`, {
                userId
            });
            setShowModal(false);
            mutate();
        }catch(err){
            console.log(err);
            alert(err.response?.data || "error");
        }
    }
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
            <div className="bg-white rounded w-10/12">
                <div className="border-b px-4 py-2 flex-col text-left items-center">
                   <p>이름: {data.nickname}</p>
                   <p>직급: {data.level}</p>
                   <p>이메일: {data.email}</p>
                   <p>핸드폰 번호: {data.phoneNumber || "None"}</p>
                   <p>학과: {data.department || "None"}</p>
                   <p>학년: {data.grade || "None"}</p>
                   <p>블로그: {data.blog || "None"}</p>
                   <p>희망분야: {data.fieldOfHope || "None"}</p>
                   <p>희망직군: {data.jobObjective || "None"}</p>
                   <p>가능 언어: {data.availableLanguages?.map((language, idx) => (
                        <span key={idx}>#{language} </span>
                    )) || "None"}
                   </p>
                   <p>가능 기술: {data.availableFrameworks?.map((framework, idx) => (
                        <span key={idx}>#{framework} </span>
                    )) || "None"}
                    </p>
                    <p>지원 이유: {data.reasonForApplication}</p>
                    <p>프로젝트 경험: {data.projectExperience}</p>
                </div>
                <div className="flex justify-between items-center w-full p-3">
                    <div>
                        <button onClick={() => submitAccept(data.userId)} className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white rounded p-2">합격</button>
                        <button onClick={() => submitFailure(data.userId)} className="bg-white border border-red-500 hover:bg-red-500 hover:text-white rounded p-2 ml-2">불합격</button>
                    </div>
                    <div>
                        <button onClick={() => setShowModal(false)} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ClubApplicationModal;