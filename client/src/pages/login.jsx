import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState({});
    const submitLogin = (e) => {
        e.preventDefault();
    }
    return (
        <div className="bg-gray-200">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white w-10/12 md:w-96 border rounded p-4">
                    <h1 className="font-semibold text-lg">로그인</h1>
                    <form onSubmit={submitLogin}>
                        <div className="mb-4">
                            <input 
                                className="w-full p-3 bg-gray-50 border-gray-200  focus:bg-white rounded hover:outline-none hover:bg-white"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className="text-red-500 font-medium">{error.email}</small>
                        </div> 
                        <div className="mb-4">
                            <input 
                                className="w-full p-3 bg-gray-50 border-gray-200  focus:bg-white rounded hover:outline-none hover:bg-white"
                                placeholder="닉네임"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            <small className="text-red-500 font-medium">{error.email}</small>
                        </div> 
                        
                        <div className="flex items-center justify-end">
                            <button 
                                className="border rounded bg-blue-400 p-2 font-medium hover:text-white" type="submit"
                            >
                                    로그인
                            </button>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;