import React from "react";
import axios from "axios";
import { setCalendarArray } from "../utils/Calendar";
import dayjs from "dayjs";
import ViewCalendar from "../components/ViewCalendar";
import { useRouter } from "next/router";
import useSWR from "swr";

const Schedule = ({holidays, user}) => {

    const router = useRouter();
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

    const {data:posts, mutate} = useSWR(`/schedule`, fetcher);

    if(posts){
        calendarData = setCalendarArray(parseInt(year)||dayjs().get("year"), parseInt(month)||dayjs().get("month")+1, holidays, posts)
    }
   
    
    console.log(user)
    return (
        <>
        <ViewCalendar calendarData={calendarData} user={user} path={path} mutate={mutate}/>
        
  
        </>
    );
};

export default Schedule;

export const getServerSideProps = async ({query, req}) => {
    try{
        const {year, month} = query;
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
    
        if(year&&month){
            if(year.match(/^[0-9]+$/) === null||month.match(/^[0-9]+$/) === null||parseInt(month)<0||parseInt(month)>13){
                return {
                    redirect: {
                        permanent: false,
                        destination: "/reservation",
                    }
                }
            }
            const calendarMonth = parseInt(month) < 10 ? "0"+month : month;
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`)
            let holidays = result.data.response.body?.items?.item || [];
            if(!Array.isArray(holidays)){
                holidays = [holidays];
            }

            return {
                props:{
                    holidays,
                    user, 

                }
            } 
            
        }else{
 
            const calendarMonth = dayjs().get("month")+1 < 10 ? "0"+month : (dayjs().get("month")+1).toString();
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${dayjs().get("year").toString()}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`);
            let holidays = result.data.response.body?.items?.item || [];
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
          
        
    }catch(err){
        console.log(err);
        return {
            props: {}
        }
    }
}