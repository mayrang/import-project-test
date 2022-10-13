import React from "react";

const ScheduleAddModal = ({setShowModal}) => {
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center">
            <div className="bg-white rounded w-10/12">
                <div className="border-b px-4 py-2 flex-col text-left items-center">
                  
                </div>
                <div className="flex justify-between items-center w-full p-3">
                    <div>
                        <button className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white rounded p-2">합격</button>
                    </div>
                    <div>
                        <button onClick={() => setShowModal(false)} className="bg-gray-200 border hover:text-white rounded p-2">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleAddModal;