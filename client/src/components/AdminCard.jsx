import React from "react";

const AdminCard = ({data}) => {
    return (
        <tr className="text-center text-ellipsis whitespace-nowrap">
            {/* 추후 수정 필요 */}
            <td>{data.level}</td>
            <td>{data.nickname}</td>
            <td className="hidden md:table-cell ">{data.fieldOfHope}</td>
            <td className="hidden md:table-cell">{data.jobObjective}</td>
            <td className="hidden lg:table-cell">{data.email}</td>
            <td className="hidden lg:table-cell">{data.phoneNumber}</td>
            <td><div className="font-semibold hover:text-blue-500 cursor-pointer">상세보기</div></td>
        </tr>
    );
};

export default AdminCard;