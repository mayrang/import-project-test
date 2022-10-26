import axios from "axios";
import React from "react";
import { setCalendarArray } from "../utils/Calendar";
import dayjs from "dayjs";
import ViewCalendar from "../components/ViewCalendar";
import { useRouter } from "next/router";
import useSWR from "swr";

const Reservation = ({holidays, user}) => {

    const router = useRouter();
    // path값으로 schedule인지 reservation인지 구분
    const path = router.pathname;
    const {year, month} = router.query;
    let calendarData = [];


    const fetcher = async (url) => {
        try{
            const result = await axios.get(url);
            return result.data;
        }catch(err){
            throw err.response.data;
        }
    }; 
    // schedule or reservation을 가져오기 위한 swr
    const {data:posts, mutate} = useSWR(`/reservation`, fetcher);
    // 포스트가 존재시 calendarData 생성
    if(posts){
        calendarData = setCalendarArray(parseInt(year)||dayjs().get("year"), parseInt(month)||dayjs().get("month")+1, holidays, posts)
    }
   
 
    return (
        <>
        {/* ViewCalendar 컴포넌트에 넘겨주기 */}
        <ViewCalendar calendarData={calendarData} path={path} user={user} posts={posts} mutate={mutate}/>

        </>
    );
};

export default Reservation;


// 
export const getServerSideProps = async ({query, req}) => {
    try{
        const {year, month} = query;

        // 가지고 있는 쿠키값을 바탕으로 서버에 로그인 여부를 확인
        const cookie = req.headers.cookie;
        let user = null;
        if(cookie){
            const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
                headers: {
                    cookie,
                }
            });
            user = result.data || null;
        }
        // year, month가 url에 있으면 
        if(year&&month){
            // year와 month가 적절한 값인지 검사하고 아니면 /reservation로 리다이렉트
            if(year.match(/^[0-9]+$/) === null||month.match(/^[0-9]+$/) === null||parseInt(month)<0||parseInt(month)>13){
                return {
                    redirect: {
                        permanent: false,
                        destination: "/reservation",
                    }
                }
            }
            // month가 10이하이면 앞에 0을 붙여줌(ex: 9 -> 09)
            const calendarMonth = parseInt(month) < 10 ? "0"+month : month;
            // 공공데이터포털에 공휴일 정보 받아오기(간헐적으로 정보를 못받아오는 에러가 있음)
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`)
            let holidays = result.data.response?.body?.items?.item || [];
            // 드 달의 공휴일이 하나뿐이면 객체로 넘어오기 때문에 배열로 바꿔주기
            if(!Array.isArray(holidays)){
                holidays = [holidays];
            }
            // props로 휴일과 user정보 넘겨주기  
            return {
                props:{
                    holidays,
                    user, 

                }
            } 
            
        }else{
            // 해달 month가 10이하이면 0을 앞에 추가
            const calendarMonth = dayjs().get("month")+1 < 10 ? "0"+month : (dayjs().get("month")+1).toString();
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${dayjs().get("year").toString()}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`);
            let holidays = result.data.response?.body?.items?.item || [];
            if(!Array.isArray(holidays)){
                holidays = [holidays];
            }
            return {
                props:{
                    holidays,
                    user, 
                }
            } 
            
        }
          
    // 에러발생시 콘솔 찍고 빈값으로 넘겨주기
    }catch(err){
        console.log(err);
        return {
            props: {}
        }
    }
}