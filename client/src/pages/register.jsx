import React, { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";

const Register = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [studentId, setStudentId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("1")
    const [blog, setBlog] = useState("");
    const [error, setError] = useState({});
    const [level, setLevel] = useState("Normal");
    const router = useRouter();
    const submitRegister =  async (e) => {
        e.preventDefault();
        try{
            if(nickname.trim() == "" || email.trim() == "" || level.trim() == "") return ;
            const result = await axios.post("/auth/register", {
                nickname,
                email,
                studentId,
                phoneNumber,
                department,
                grade,
                blog,
                level,

            });
            console.log(result.data);
            router.push("/");
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="bg-gray-200 w-full ">
        <div className="flex flex-col items-center justify-center p-6 h-screen">
            <div className="w-10/12 mx-auto bg-white border rounded md:w-96 p-3">
                <h1 className="font-semibold text-lg mb-2">회원가입</h1>
                <select id="small" value={level} onChange={(e) => setLevel(e.target.value)} className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Root">관리자</option>
                    <option value="Manager">임원진</option>
                    <option value="Student">학생</option>
                    <option value="Normal" >일반인</option>
                </select>
                <form onSubmit={submitRegister}>
                    <div className="mb-3">
                        <input 
                            className="w-full border-gray-300 bg-gray-50 p-3  border rounded hover:outline-none focus:bg-white hover:bg-white" 
                            placeholder="이름"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}

                        />
                        <small className="text-red-500 font-medium">{error.name}</small>
                    </div>
                    <div className="mb-3">
                        <input 
                            className="w-full border-gray-300 bg-gray-50 p-3  border rounded hover:outline-none focus:bg-white hover:bg-white" 
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            
                        />
                        <small className="text-red-500 font-medium">{error.email}</small>
                    </div>
                    <div className="mb-3">
                        <input 
                            className="w-full border-gray-300 bg-gray-50 p-3  border rounded hover:outline-none  focus:bg-white hover:bg-white" 
                            placeholder="핸드폰번호"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            
                        />
                        <small className="text-red-500 font-medium">{error.email}</small>
                    </div>
                    <div className="mb-3">
                        <input 
                            className="w-full border-gray-300 bg-gray-50 p-3  border rounded hover:outline-none  focus:bg-white hover:bg-white" 
                            placeholder="블로그 주소"
                            value={blog}
                            onChange={(e) => setBlog(e.target.value)}
                            
                        />
                        <small className="text-red-500 font-medium">{error.blog}</small>
                    </div>

                    {level !== "Normal" && (
                        <>
                    <div className="mb-3">
                        <input 
                            className="w-full border-gray-300 bg-gray-50 p-3  border rounded hover:outline-none  focus:bg-white hover:bg-white" 
                            placeholder="학번"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            
                        />
                        <small className="text-red-500 font-medium">{error.studentId}</small>
                    </div>
                    <div className="mb-3">
                        <input 
                            className="w-full border-gray-300 bg-gray-50 p-3  border rounded hover:outline-none  focus:bg-white hover:bg-white" 
                            placeholder="학과"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            
                        />
                        <small className="text-red-500 font-medium">{error.studentId}</small>
                    </div>
                    <div className="mb-3">
                        <select id="small" value={grade} onChange={(e) => setGrade(e.target.value)} className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                            <option value="4" >4학년</option>
                            <option value="5" >5학년</option>
                        </select>
                    </div>
                   
                    </>
                    )}
                    <div className="flex items-center justify-end">
                        <button className="border rounded bg-blue-400 p-2 font-medium hover:text-white">가입하기</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
    );
};

export default Register;