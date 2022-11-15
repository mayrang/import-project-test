import React from 'react';
import { useState } from 'react';

const ProjectCreate = () => {
    const [projectTitle, setProjectTitle] = useState("");
    const [main, setMain] = useState("");
    const [fieldTags, setFieldTags] = useState([]);
    return (
        <div className='w-full bg-white'>
            <div className='flex items-center justify-center h-screen '>
                <div className='w-10/12 md:w-9/12'>
                    <div className=' text-2xl font-semibold'>프로젝트 생성</div>
                    <form>
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
                            <div className='flex flex-wrap items-center mt-2'>
                                <div className='flex items-center'>
                                    <input id="AI" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"}/>
                                    <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='AI'>AI</label>
                                </div>
                                <div className='flex items-center ml-10'>
                                    <input id="Data" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"}/>
                                    <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Data'>Data</label>
                                </div>
                                <div className='flex items-center ml-10'>
                                    <input id="Hackathon" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"}/>
                                    <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Hackathon'>Hackathon</label>
                                </div>
                                <div className='flex items-center ml-10'>
                                    <input id="Web" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"}/>
                                    <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='Web'>Web</label>
                                </div>
                                <div className='flex items-center ml-10'>
                                    <input id="BigData" className='w-4 h-4 bg-gray-400 border-gray-300 text-blue-500' type={"checkbox"}/>
                                    <label className='ml-2 text-sm font-medium text-gray-900' htmlFor='BigData'>Big Data</label>
                                </div>
                                
                        
                            </div>
                            

                        </div>

                    </div>
                    </form>
                
                </div>
            </div>
            
        </div>
    );
};

export default ProjectCreate;