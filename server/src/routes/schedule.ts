import {Router, Request, Response} from "express";
import { Schedule } from "../entity/Schedule";
import { userMiddleware } from "../middlewares/user";


const router = Router();

router.get("/", async (_:Request, res:Response) => {
    try{
        const schedules = await Schedule.find();
        console.log(schedules)
        return res.status(200).json(schedules);
    }catch(err){
        console.log(err);
        return res.status(500).send("스케줄을 가져오는 과정에서의 서버에러");
    }
});

router.post("/post", userMiddleware, async (req:Request, res:Response) => {
    const {startTime, endTime, content} = req.body;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "로그인한 유저만 등록 가능합니다."});
        if(endTime < startTime) return res.status(400).json({error: "시간 역전 안돼"});
        const schedule = new Schedule();
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        schedule.content = content;
        schedule.user = user;
        await schedule.save();

        return res.status(200).send("스케줄 저장 성공");

    }catch(err){
        console.log(err);
        return res.status(500).send("스케줄 등록 과정에서 서버 에러");
    }
});

router.patch("/post/:calendarId", userMiddleware, async(req:Request, res:Response) => {
    const {calendarId} = req.params;
    const {startTime, endTime, content} = req.body;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "로그인한 유저만 등록 가능합니다."});
        if(endTime < startTime) return res.status(400).json({error: "시간 역전 안돼"});
        const schedule = await Schedule.findOneByOrFail({
            calendarId: parseInt(calendarId)
        });
        if(schedule.userId !== user.userId) return res.status(400).json({error: "수정 권한이 없습니다."});
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        schedule.content = content;

        await schedule.save();

        return res.status(200).send("일정 수정 성공");
        
    }catch(err){

    }
});

router.delete("/post/:calendarId", userMiddleware, async(req:Request, res:Response) => {
    const {calendarId} = req.params;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저 정보가 존재하지 않습니다."});
        const schedule = await Schedule.findOneByOrFail({
            calendarId: parseInt(calendarId)
        });
        if(schedule.userId !== user.userId) return res.status(400).json({error: "삭제 권한이 없습니다."});
        await schedule.remove();

        return res.status(200).send("일정 삭제 성공");
    }catch(err){
        console.log(err);
        return res.status(500).send("일정 삭제과정에서 서버에러");
    }
});

export default router;