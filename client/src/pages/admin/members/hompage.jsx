import React from "react";
import AdminPage from "../../../components/AdminPage";

const HomePageMembers = () => {
    return (
        // path 용도: 백엔드 보낼 url, 컴포넌트에 어떤 페이지인지 알려주는 용도
        <AdminPage path={"/admin/members/homepage"} />
    )
}

export default HomePageMembers;