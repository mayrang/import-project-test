import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminPage from "../../../components/AdminPage";
import { asyncUserLoadMyInfo } from "../../../redux/reducers/UserSlice";
import wrapper from "../../../redux/store";

const HomePageMembers = () => {
    const router = useRouter();
    const {user} = useSelector((state) => state.user);
    
    useEffect(() => {
        if(!user || user.level !== "Root"){
            alert("관리자 권한만 접속할 수 있습니다.");
            router.replace("/");
        }
    }, [user])
    
    return (
        // path 용도: 백엔드 보낼 url, 컴포넌트에 어떤 페이지인지 알려주는 용도
        <AdminPage path={"/admin/members/homepage"} />
    )
}

export default HomePageMembers;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {

    const cookie = req.headers.cookie;
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie));
    }
    return {
        props: {}
    };
       
}) 