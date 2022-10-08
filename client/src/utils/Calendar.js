import dayjs from "dayjs";

const posts = [
  {
    calendarId: 1,
    startTime: dayjs("2022-10-03 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-08 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상1",
    numberOfPeople: 5,
  },
  {
    calendarId: 2,
    startTime: dayjs("2022-10-04 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-04 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상2",
    numberOfPeople: 3,
  },
  {
    calendarId: 3,
    startTime: dayjs("2022-10-03 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-09 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상3",
    numberOfPeople: 2,
  },
  {
    calendarId: 4,
    startTime: dayjs("2022-10-06 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-06 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상4",
    numberOfPeople: 1,
  },
  {
    calendarId: 5,
    startTime: dayjs("2022-10-09 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-11 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상5",
    numberOfPeople: 3,
  },
  {
    calendarId: 6,
    startTime: dayjs("2022-10-04 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-16 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상6",
    numberOfPeople: 3,
  },
  {
    calendarId: 7,
    startTime: dayjs("2022-10-13 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs("2022-10-13 10:00:00", "YYYY-MM-DD HH:mm:ss"),
    nickname: "박건상6",
    numberOfPeople: 3,
  },
]

export const setCalendarArray =(year, month, holidays) => {

    let monthArray = [];
    let weekArray = [];
    let count = 0
    const allPosts = [];
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

    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        weekArray.unshift({date: prevLastDate-i, type:"prev"});
        if(count === 6){

          monthArray.push(weekArray)
          weekArray = [];
          count = 0;
        }else{
          count++
        }
        

      }
    }

    
    for(let i = 1; i < nextDate+1; i++){
      const dayFormat = year.toString() + (parseInt(month) < 10 ? "0"+month.toString() : month.toString()) + (i < 10 ? "0"+i.toString() : i.toString());
      const dayPosts = posts.filter((post) => (dayjs(post.startTime).format("YYYYMMDD") <= dayFormat)&&(dayFormat <= dayjs(post.endTime).format("YYYYMMDD")));
      let mapPosts = [];
      
      //console.log("dayPost", dayPosts);
      const sortedPosts = dayPosts.sort(function(a, b) {
        let aStartDate = parseInt(dayjs(a.startTime).format("YYYYMMDD"));
        let bStartDate = parseInt(dayjs(b.startTime).format("YYYYMMDD"));
        let aDate = parseInt(dayjs(a.endTime).format("YYYYMMDD")) - parseInt(dayjs(a.startTime).format("YYYYMMDD"));
        let bDate = parseInt(dayjs(b.endTime).format("YYYYMMDD")) - parseInt(dayjs(b.startTime).format("YYYYMMDD"));
      
        if(aStartDate > bStartDate) return 1;
        if(aStartDate < bStartDate) return -1;

        if(aDate > bDate) return -1;
        if(aDate < bDate) return 1;
        return 0;

      });
      if(dayFormat === "20221004"){

        console.log("sortedPosts", sortedPosts)

      }
      let index = [1, 2, 3];
      for(const post of sortedPosts){
       

        let mapPost = {};
        const checkPost = allPosts.find((it) => it.calendarId === post.calendarId)
        if(checkPost){
          
          mapPost = {...post, start: false, multiple: true, index: checkPost.index, startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
          index = index.filter((num) => num !== checkPost.index)
          
        }else{
          if(index.length > 0){
            if(dayFormat === dayjs(post.startTime).format("YYYYMMDD")){
              if(dayjs(post.startTime).format("YYYYMMDD") !== dayjs(post.endTime).format("YYYYMMDD")){
                mapPost = {...post, start: true, multiple: true, index: index.shift(), startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
                
                allPosts.push(mapPost)
              }else{
                mapPost = {...post, start: true, multiple: false, index: index.shift(), startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
                allPosts.push(mapPost)
              }
            }else{
              mapPost = {...post, startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
            }
          }else{
            mapPost = {...post, startTime: JSON.stringify(post.startTime), endTime: JSON.stringify(post.endTime)}
          }
        }
        
        
        mapPosts.push(mapPost);

      }

      if(holidays){
        const holiday = holidays.find((holiday) => holiday.locdate?.toString() === dayFormat);

        if(holiday){
          weekArray.push({date: i, type: "now", posts: mapPosts, holiday: holiday});
         
        }else{
          weekArray.push({date: i, type: "now", posts: mapPosts, });
        
        }
      }
      if(count === 6){
        monthArray.push(weekArray);
        weekArray = [];
        count = 0;
      }else{
        count++;
      }
      
     
    }
    for (let i = 1; i < 7 - nextDay; i++) {
      weekArray.push({date: i, type: "next"});
      if(count === 6){
        
        monthArray.push(weekArray);
        weekArray = [];
        count = 0;
      }else{
        count++;
      }
    }

 

    return monthArray;
  };