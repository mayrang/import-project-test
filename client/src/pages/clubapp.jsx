import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";


const ClubApp = () => {
    const [reasonForApplication, setReasonForApplication] = useState("");
    const [projectExperience, setProjectExperience] = useState("");
    const router = useRouter();
    const submitClubApp = async (e) => {
        e.preventDefault();
        try{
            // if(reasonForApplication.trim() === "") return alert("지원이유를 써주세요");
            // if(projectExperience.trim() === "") return alert("프로젝트 경험을 써주세요")
            await axios.post(`/application/`, {
                reasonForApplication, 
                projectExperience
            });
            router.replace("/");
        }catch(err){
            console.log(err);
            alert(err.response?.data || "error");
        }
    }
    return (
        <div className="flex-col items-center">
            <form onSubmit={submitClubApp}>
                <textarea 
                    placeholder="지원 이유"
                    style={{minWidth: 400, minHeight: 200}}
                    value={reasonForApplication}
                    onChange={(e) => setReasonForApplication(e.target.value)}
                    className="my-2"
                />
                <textarea 
                    placeholder="프로젝트 경험"
                    style={{minWidth: 400, minHeight: 200}}
                    value={projectExperience}
                    onChange={(e) => setProjectExperience(e.target.value)}
                    className="my-2"
                />
                <div className="flex items-center justify-end">
                    <button type="submit" className="border rounded p-2">
                        지원하기
                    </button>
                </div>
            </form>
            
        </div>

    );
};

export default ClubApp;