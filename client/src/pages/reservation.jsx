import axios from "axios";
import React from "react";
import { setCalendarArray } from "../utils/Calendar";
import dayjs from "dayjs";

const Reservation = ({calendarData}) => {
    console.log(dayjs(JSON.parse(calendarData[9].posts[0].startTime)).toDate());
    console.log(calendarData)
    return (
        <div>예약</div>
    );
};

export default Reservation;

export const getServerSideProps = async () => {
    try{

        const result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${"2022"}&solMonth=${"10"}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`)
        const holidays = result.data.response.body?.items?.item || [];
        console.log(holidays)
        const calendarData = setCalendarArray(2022, 10, holidays)
        console.log(calendarData)
        return {
            props:{
                calendarData
            }
        }
    }catch(err){
        console.log(err);
        return {
            props: {}
        }
    }
}