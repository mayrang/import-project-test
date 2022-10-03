import axios from "axios";
import React from "react";
import AdminPage from "../../../components/AdminPage";

const HomePageMembers = () => {
  
    return (
        // path 용도: 백엔드 보낼 url, 컴포넌트에 어떤 페이지인지 알려주는 용도
        <AdminPage path={"/admin/members/homepage"} />
    )
}

export default HomePageMembers;

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
        console.log(user)
        if(user.data.level !== "Root") throw new Error("권한이 없습니다.");
        return {
            props: {}
        }
    }catch(err){
        console.log(err.message);

       
        // err.response.data 백엔드에서 넘어온 에러, err.message throw 에러
        return {
            redirect: {
                permanent: false,
                destination: "/"
            },
            props: {
              
            }
        }
    }
}