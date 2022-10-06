import axios from "axios";
import React from "react";
import { setCalendarArray } from "../utils/Calendar";
import dayjs from "dayjs";
import ViewCalendar from "../components/ViewCalendar";

const Reservation = ({calendarData}) => {
   // console.log(dayjs(JSON.parse(calendarData[9].posts[0].startTime)).toDate());
    console.log(calendarData)
    return (
        <>
        <ViewCalendar calendarData={calendarData} />
        </>
    );
};

export default Reservation;

export const getServerSideProps = async ({query}) => {
    try{
        const {year, month} = query;
        
        console.log(year, month)
        if(year&&month){
            if(query.year.match(/^[0-9]+$/) === null||query.month.match(/^[0-9]+$/) === null||parseInt(query.month)<0||parseInt(query.month)>13){
                return {
                    redirect: {
                        permanent: false,
                        destination: "/reservation",
                    }
                }
            }
            month = parseInt(month) < 10 ? "0"+month : month;
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`)
            const holidays = result.data.response.body?.items?.item || [];
            console.log("holidays", holidays)
            console.log(holidays)
            const calendarData = setCalendarArray(2022, 10, holidays)
            console.log(calendarData)
            return {
                props:{
                    calendarData
                }
            } 
            
        }else{
            console.log(dayjs().get("hour"))
            const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${dayjs().get("year").toString()}&solMonth=${(dayjs().get("month")+1).toString()}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`);
            console.log("result", result)
            const holidays = result.data.response.body?.items?.item || [];
            console.log("holidays", holidays)
            const calendarData = setCalendarArray(2022, 10, holidays)
            console.log(calendarData)
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