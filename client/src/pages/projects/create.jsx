import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ProjectCreate = () => {
    const [projectTitle, setProjectTitle] = useState("");
    const [main, setMain] = useState("");
    const [fieldTags, setFieldTags] = useState([]);
    const [checkEtc, setCheckEtc] = useState(false);
    const [etc, setEtc] = useState("");
    const [stateTag, setStateTag] = useState("");
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        if(submit){
            handleSubmit();
        }
    }, [submit])
 
    const handleFieldCheck = (e) => {
        if(e.target.checked){
            setFieldTags((prev) => [...prev, e.target.name]);
        }else{
            setFieldTags((prev) => prev.filter((it) => it !== e.target.name));
        }
    }


    const handleStateCheck = (e) => {
        if(e.target.checked){
            setStateTag(e.target.name);
        }else{
            setStateTag("");
        }
    }


    const handleEtcFieldCheck = (e) => {
        if(e.target.checked){
            setCheckEtc(true);
            
        }else{
            setCheckEtc(false);
            setEtc("");
        }
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        if(checkEtc && etc.trim() !== ""){
            setFieldTags((prev) => [...prev, etc]);
        }
        setSubmit(true);
    }   
    const handleSubmit = async () => {
        console.log(fieldTags);
        
    }


    return (
        <div className='w-full bg-white'>
            <div className='flex items-center justify-center h-screen '>
                <div className='w-10/12 md:w-9/12'>
                    <div className=' text-2xl font-semibold'>프로젝트 생성</div>
                    <form onSubmit={clickSubmit}>
                        <div className='mt-2 bg-white border shadow-lg flex flex-col items-center justify-center'>
                            <div className='w-11/12 px-4 py-2 '>
                                <label htmlFor='projectTitle' className='text-lg'>프로젝트 이름</label>
                                <input id="projectTitle" type="text" className='w-full p-1 mt-2 bg-white border rounded' placeholder='제목을 입력해주세요' value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}/>
                            </div>
                            <div className='w-11/12 px-4 py-2'>
                                <label htmlFor='main' className='text-lg'>프로젝트 소개</label>
                                <textarea id="main" className='w-full mt-2 bg-white border rounded' style={{minHeight: 400}} placeholder="프로젝트 소개를 입력해주세요" value={main} onChange={(e) => setMain(e.target.value)}/>
                            </div>
                            <div className='w-11/12 py-2 px-4 flex flex-col'>
                                <label htmlFor='fieldTags' className='text-lg'>분야 태그 선택</label>
                                <div className='flex flex-wrap items-center'>
                                    <div className='w-1/3 flex items-center mt-2'>
                                        <input id="AI" name="ai" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={handleFieldCheck}/>
                                        <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='AI'>AI</label>
                                    </div>
                                    <div className='w-1/3 flex items-center mt-2'>
                                        <input id="Data" name="data" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={handleFieldCheck}/>
                                        <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Data'>Data</label>
                                    </div>
                                    <div className='w-1/3 flex items-center mt-2'>
                                        <input id="Hackathon" name="hackathon" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={handleFieldCheck}/>
                                        <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Hackathon'>Hackathon</label>
                                    </div>
                                    <div className='w-1/3 flex items-center mt-2'>
                                        <input id="Web" name="web" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={ handleFieldCheck}/>
                                        <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Web'>Web</label>
                                    </div>
                                    <div className='w-1/3 flex items-center mt-2'>
                                        <input id="BigData" name="bigdata" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={handleFieldCheck}/>
                                        <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='BigData'>Big Data</label>
                                    </div>
                                    <div className=' w-1/3 flex items-center mt-2'>
                                        <input id="Mobile" name="moblie" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={handleFieldCheck}/>
                                        <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Mobile'>Mobile</label>
                                    </div>
                                    <div className=' w-1/3 flex items-center mt-2'>
                                        <input id="etc" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"} onClick={handleEtcFieldCheck}/>
                                        {checkEtc ? (
                                            <input className='ml-2 border rounded bg-white w-44 text-sm' value={etc} onChange={(e) => setEtc(e.target.value)} placeholder='기타'/>
                                        ):(
                                            <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='etc' >기타</label>
                                        )}
                                        
                                    </div>
                            
                                </div>
                                

                            </div>
                            <div className='w-11/12 py-2 px-4 flex flex-col'>
                                <label htmlFor='fieldTags' className='text-lg'>진행 상황 선택</label>
                                <select className='border bg-gray-100 w-4/12 mt-2 p-1'>
                                    <option value="모집중" checked>모집중</option>
                                    <option value="진행중">진행중</option>
                                    <option value="완료">완료</option>
                                </select>
                            </div>
                            <div className='w-11/12 py-4 px-3'>
                                <button type="submit"  className='bg-blue-400 border rounded shadow-sm p-3'>프로젝트 생성</button>

                            </div>

                        </div>
                    </form>
                
                </div>
            </div>
            
        </div>
    );
};

export default ProjectCreate;