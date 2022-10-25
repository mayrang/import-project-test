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

export default router;