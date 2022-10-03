import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import useSWR from "swr";
import AdminCard from "./AdminCard";



const AdminPage = ({path}) => {
    const router = useRouter();

    // 삭제용 userId 목록
    const [userIdArray, setUserIdArray] = useState([]);


    // 각 데이터 가져오기
    const fetcher = async (url) => {
        try{
            console.log("url", url)
            const result = await axios.get(url);
            return result.data;
        }catch(err){
            // error retry error 있어서 fecher단에서 router
            console.log(err, "error")
            alert(err.response?.data?.error || err.response?.data || "error");
            router.replace("/")
        }
    };
    const {data: datas, mutate} = useSWR(path, fetcher, {
        shouldRetryOnError: false
    });

    // 멤버 삭제 
    const removeMembers = async () => {
        if(userIdArray.length > 0){
            await axios.delete("/admin/members", {
                data: {
                    userId: userIdArray
                } 
            });
            mutate();
        }else{
            return;
        }
    }
 

    return (
        <div className=" w-full h-screen bg-gray-300">
            <div className="flex flex-col p-5 items-center justify-center h-screen">
                <table className="table-auto border rounded bg-white w-11/12">
                    <thead className="text-center text-ellipsis whitespace-nowrap overflow-hidden">
                        <tr className="">
                        {/* 멤버관리, 홈페이지 회원관리 체크박스 */}
                        {path !== "/admin/applications" && (
                            <th><input type={"checkbox"} disabled/></th>
                        )}
                            <th>직급</th>
                            <th>이름</th>
                            <th className="hidden md:table-cell mr-2">희망 분야</th>
                            <th className="hidden md:table-cell mr-2">희망 직군</th>
                            <th className="hidden lg:table-cell mr-2">이메일</th>
                            <th className="hidden lg:table-cell mr-2">핸드폰 번호</th>
                            <th>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {datas?.map((data) => (
                            <AdminCard key={data.userId} data={data} path={path} mutate={mutate} setUserIdArray={setUserIdArray} userIdArray={userIdArray}/>
                        ))}
                    </tbody>
                </table>
                {/* 멤버관리, 홈페이지 회원관리 삭제버튼 */}
                {path !== "/admin/applications" && (
                    <div className="flex justify-end items-center w-11/12 pt-2">
                        <button onClick={removeMembers} className="p-2 bg-white border rounded border-red-500 hover:bg-red-500 hover:text-white">회원 삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;