import dayjs from "dayjs";

const posts = [
  {
    reservationId: 1,
    startTime: dayjs("2022-10-03 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-08 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    user: {
      userId: 1,
      nickname: "박건상"
    }
  },
  {
    reservationId: 2,
    startTime: dayjs("2022-10-04 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-04 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    user: {
      userId: 2,
      nickname: "박건싱2"
    }
  },
  {
    reservationId: 3,
    startTime: dayjs("2022-10-03 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-09 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    user: {
      userId: 3,
      nickname: "박건상3"
    }
  },
  {
    reservationId: 4,
    startTime: dayjs("2022-10-06 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-06 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    user: {
      userId: 4,
      nickname: "박건상4"
    }
  },
]

export const setCalendarArray =(year, month, holidays) => {
    console.log("holidays", holidays)
    //이전 날짜
    let prevLastDate = new Date(year, month - 1, 0).getDate();
    //console.log(prevLastDate)
    let prevLastDay = new Date(year, month - 1, 0).getDay();
    //console.log(prevLastDay)
    //다음 날짜
    const nextDay = new Date(year, month, 0).getDay();
    //console.log(nextDay)
    const nextDate = new Date(year, month, 0).getDate();
    //console.log(nextDate)
    //이전 날짜 만들기
    let PVLD = [];
    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {

        PVLD.unshift({date: prevLastDate, type:"prev"});
      }
    }
    //다음 날짜 만들기
    let TLD = [];
    for (let i = 1; i < 7 - nextDay; i++) {
     
      TLD.push({date: nextDate, type: "next"});
    }

    //현재날짜
    let TD = [];
    for(let i = 1; i < nextDate+1; i++){
      const dayFormat = year.toString() + (parseInt(month) < 10 ? "0"+month.toString() : month.toString()) + (i < 10 ? "0"+i.toString() : i.toString());
      const dayPosts = posts.filter((post) => (dayjs(post.startTime).format("YYYYMMDD") <= dayFormat)&&(dayFormat <= dayjs(post.endTime).format("YYYYMMDD")));
      //console.log("dayPost", dayPosts);
      const mapPosts = dayPosts.map((post) => {
        if(dayjs(post.startTime).format("YYYYMMDD") !== dayjs(post.endTime).format("YYYYMMDD")){
          if(dayFormat === dayjs(post.startTime).format("YYYYMMDD")){
            post = {...post, start: true, multiple: post.reservationId, startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
          }else{
            post = {...post, start: false, multiple: post.reservationId, startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
          }
        }else{
          post = {...post, start: true, multiple: 0, startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
        }
        return post;
      });
      const sortedPosts = mapPosts.sort((a, b) => b.multiple - a.multiple);
      const holiday = holidays.find((holiday) => holiday.locdate?.toString() === dayFormat);
      if(holiday){
        TD.push({date: i, type: "now", posts: sortedPosts, holiday: holiday});
      }else{
        TD.push({date: i, type: "now", posts: sortedPosts, });
      }
      


      //console.log("sortedPosts", sortedPosts);
     
    }
 

    return PVLD.concat(TD, TLD);
  };