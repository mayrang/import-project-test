import React, { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserLogin } from "../redux/reducers/UserSlice";
import { useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState({});
    const router = useRouter();
    const dispatch = useDispatch();
    const {loginDone, loginError} = useSelector((state) => state.user)
    const submitLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            nickname
        };
        dispatch(asyncUserLogin(data));
        console.log("loginDone", loginDone)
        
    };

    useEffect(() => {
        if(loginDone){
            router.push("/");
        }
        if(loginError){
            console.log(loginError);
            setError(loginError || {});
        }
    }, [loginDone, loginError]);
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