import React from "react";
import { setCalendarArray } from "../utils/Calendar";

const ViewCalendar = () => {
    console.log(setCalendarArray(2022, 10));
    return (
        <div>calendar</div>
    );
};

export default ViewCalendar;