import React, { useState } from "react";
import ClubApplicationModal from "./ClubApplicationModal";
import ClubMemberModal from "./ClubMemberModal";
import HomePageMemberModal from "./HomePageMemberModal";

/** 
 * mutate: 데이터 갱신,
 * setUserIdArray: userIdArray변경을 위한 props
 * 
 * */  
const AdminCard = ({data, path, mutate, setUserIdArray}) => {
    console.log(data);
    // modal state
    const [showModal, setShowModal] = useState(false);

    // checkbox에 따라 userIdArray 값 변경
    const changeCheckBox = (e) => {
        if(e.target.checked){
            setUserIdArray((prev) => [...prev, data.userId]);
        }else{
            setUserIdArray((prev) => prev.filter((it) => it !== data.userId));
        }
    }

    return (
        <tr className="text-center text-ellipsis whitespace-nowrap">
            {/* Modal */}
            {showModal&& (  
                // 각 path에 따라 다른 modal 컴포넌트
                <>
                {path === "/admin/applications" && <ClubApplicationModal data={data} setShowModal={setShowModal} mutate={mutate} />}
                {path === "/admin/members/club" && <ClubMemberModal data={data} setShowModal={setShowModal} mutate={mutate} />}
                {path === "/admin/members/homepage" && <HomePageMemberModal data={data} setShowModal={setShowModal} mutate={mutate} />}
                </>
            )}
            {/* 추후 수정 필요 */}
            {path !== "/admin/applications" && (
                <td><input type={"checkbox"} onChange={changeCheckBox}/></td>
            )}
            <td>{data.level}</td>
            <td>{data.nickname}</td>
            {/* 반응형 디자인 */}
            <td className="hidden md:table-cell">{data.studentId || "-"}</td>
            <td className="hidden md:table-cell ">{data.fieldOfHope}</td>
            <td className="hidden md:table-cell">{data.jobObjective}</td>
            <td className="hidden lg:table-cell">{data.email}</td>
            <td className="hidden lg:table-cell">{data.phoneNumber}</td>
            <td><p onClick={() => setShowModal(true)} className="font-semibold hover:text-blue-500 cursor-pointer">상세보기</p></td>
        </tr>
    );
};

export default AdminCard;