import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { asyncUserLoadMyInfo } from "../../redux/reducers/UserSlice";
import wrapper from "../../redux/store";


const AdminIndex = () => {

    const router = useRouter()
    const {user} = useSelector((state) => state.user);

    useEffect(() => {
        if(!user||user.level !== 'Root'){
            alert("관리자만 접속할 수 있습니다.");
            router.replace("/");
        }
    }, [user])

  
    


    return (
        <div className="bg-gray-200 w-full">

            <div className="flex items-center justify-center h-screen p-5">
                <div className=" w-10/12 md:w-96 mx-auto bg-white border rounded">
                    <h1 className="font-bold text-lg p-3">관리자 페이지</h1>
                    <div className="flex items-center justify-center p-3">
                        <Link href="/admin/application">
                        <a className="flex-col items-center justify-center cursor-pointer text-center p-4 border rounded mr-4 hover:bg-blue-500 hover:text-white">
                            <p>동아리</p><p>지원서</p> <p>관리</p>
                        </a>
                        </Link>
                        <Link href="/admin/members/club">
                            <a className="flex-col items-center justify-center cursor-pointer text-center p-4 border rounded mr-4 hover:bg-blue-500 hover:text-white">
                                <p>동아리</p> <p>회원</p> <p>관리</p>
                            </a>
                        </Link>
                        <Link href="/admin/members/hompage">
                            <a className="flex-col items-center justify-center cursor-pointer text-center p-4 border rounded mr-4 hover:bg-blue-500 hover:text-white">
                                <p>홈페이지</p> <p>회원</p> <p>관리</p>
                            </a>
                        </Link>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminIndex;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
  
        const cookie = req.headers.cookie;
        if(cookie){
            await store.dispatch(asyncUserLoadMyInfo(cookie));
        }

        return {
            props: {}
        }
    
}) 