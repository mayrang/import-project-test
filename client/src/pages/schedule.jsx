import React from "react";
import axios from "axios";
import { setCalendarArray } from "../utils/Calendar";
import dayjs from "dayjs";
import ViewCalendar from "../components/ViewCalendar";
import { useRouter } from "next/router";

const Schedule = ({calendarData}) => {
    console.log(calendarData)
    const router = useRouter();
    const path = router.pathname;
    console.log("path", path)
    return (
        <>
        <ViewCalendar calendarData={calendarData} path={path}/>
        </>
    );
};

export default Schedule;

export const getServerSideProps = async ({query}) => {
    try{
        const {year, month} = query;
        

        if(year&&month){
            if(year.match(/^[0-9]+$/) === null||month.match(/^[0-9]+$/) === null||parseInt(month)<0||parseInt(month)>13){
                return {
                    redirect: {
                        permanent: false,
                        destination: "/schedule",
                    }
                }
            }
            const calendarMonth = parseInt(month) < 10 ? "0"+month : month;
            console.log(month)
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`)
            let holidays = result.data.response.body?.items?.item || [];
            console.log(typeof(holidays))
            if(!Array.isArray(holidays)){
                holidays = [holidays];
            }
            console.log("holicay", holidays)
            const calendarData = setCalendarArray(year, month, holidays)
            return {
                props:{
                    calendarData
                }
            } 
            
        }else{
            console.log(dayjs().get("hour"))
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${dayjs().get("year").toString()}&solMonth=${(dayjs().get("month")+1).toString()}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`);

            let holidays = result.data.response.body?.items?.item || [];
            if(!Array.isArray(holidays)){
                holidays = [holidays];
            }
            console.log("holicay", holidays)
           
            const calendarData = setCalendarArray(2022, 10, holidays)

            return {
                props:{
                    calendarData
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