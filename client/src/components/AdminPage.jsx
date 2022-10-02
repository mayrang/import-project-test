import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import AdminCard from "./AdminCard";



const AdminPage = ({path}) => {
    const router = useRouter();

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
    const {data: datas} = useSWR(path, fetcher, {
        shouldRetryOnError: false
    });


 

    console.log(datas);
    return (
        <div className=" w-full h-screen bg-gray-300">
            <div className="flex flex-col p-5 items-center justify-center h-screen">
        
                <table className="table-auto border rounded bg-white w-11/12">
                    <thead className="text-center text-ellipsis whitespace-nowrap overflow-hidden">
                        <tr className="">
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
                            <AdminCard key={data.userId} data={data} />
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AdminPage;