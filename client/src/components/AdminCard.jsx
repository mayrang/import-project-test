import React, { useState } from "react";
import ClubApplicationModal from "./ClubApplicationModal";
import ClubMemberModal from "./ClubMemberModal";
import HomePageMemberModal from "./HomePageMemberModal";


const AdminCard = ({data, path}) => {
    const [showModal, setShowModal] = useState(false);
    console.log(path)
    return (
        <tr className="text-center text-ellipsis whitespace-nowrap">
            {/* Modal */}
            {showModal&& (
                
                <>

                {path === "/admin/applications" && <ClubApplicationModal data={data} setShowModal={setShowModal} />}
                {path === "/admin/members/club" && <ClubMemberModal data={data} setShowModal={setShowModal} />}
                {path === "/admin/members/homepage" && <HomePageMemberModal data={data} setShowModal={setShowModal}/>}
                </>
            )}
            {/* 추후 수정 필요 */}
            <td>{data.level}</td>
            <td>{data.nickname}</td>
            <td className="hidden md:table-cell ">{data.fieldOfHope}</td>
            <td className="hidden md:table-cell">{data.jobObjective}</td>
            <td className="hidden lg:table-cell">{data.email}</td>
            <td className="hidden lg:table-cell">{data.phoneNumber}</td>
            <td><div onClick={() => setShowModal(true)} className="font-semibold hover:text-blue-500 cursor-pointer">상세보기</div></td>
        </tr>
    );
};

export default AdminCard;