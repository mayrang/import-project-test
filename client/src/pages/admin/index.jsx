import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";


const AdminPage = ({error}) => {

    const router = useRouter()

    // error가 있으면 alert후 홈으로 리다이렉트
    useEffect(() => {
        if(error){
            console.log(error)
            alert(error);
            router.replace("/")
        }
    },[error]);
    


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

export default AdminPage;

export const getServerSideProps = async ({req}) => {
    try{
        const cookie = req.headers.cookie;
        if(!cookie) throw new Error("유저 식별 쿠키가 존재하지 않습니다.");
        // 임시로 만든 로그인 체크 여부
        const user = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
            headers: {
                cookie
            }
        });

        // 관리자 권한만 접속가능하도록 에러 발생
        if(user.level !== "root") throw new Error("권한이 없습니다.");
        return {
            props: {}
        }
    }catch(err){
        console.log(err.message);

       
        // err.response.data 백엔드에서 넘어온 에러, err.message throw 에러
        return {
            props: {
               error: err.response?.data  || err.message || "error"
            }
        }
    }
}