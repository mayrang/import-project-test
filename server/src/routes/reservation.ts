import {Router, Request, Response} from "express";
import { Reservation } from "../entity/Reservation";
import { userMiddleware } from "../middlewares/user";
import {MoreThanOrEqual, LessThanOrEqual} from "typeorm"

const router = Router();


router.get("/", async (req:Request, res:Response) => {
    try{
        const posts = await Reservation.find();
        console.log(posts);
        return res.json(posts);
    }catch(err){
        console.log(err);
        return res.status(500).send("예약 불러오는 과정에서 서버 에러");
    }
});

router.post("/post", userMiddleware, async (req:Request, res:Response) => {
    const {startTime, endTime, numberOfPeople, username} = req.body;
    try{
        if(endTime < startTime) return res.status(400).json({error: "시간 역전 안돼!"})
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "로그인 유저만 예약할 수 있습니다."});

        console.log(startTime, endTime, username, numberOfPeople);
        const checkReservation = await Reservation.find({
            where: [
                {startTime: LessThanOrEqual(startTime), endTime: MoreThanOrEqual(startTime)},
                {startTime: LessThanOrEqual(endTime), endTime: MoreThanOrEqual(endTime)}
                
            ]
        })
        console.log(checkReservation, "check");
        if(checkReservation.length > 0) return res.status(400).json({error: "겹치는 예약이 있습니다."})
        const reservation = new Reservation();
        reservation.startTime = startTime;
        reservation.endTime = endTime;
        reservation.numberOfPeople = numberOfPeople;
        reservation.username = username;
        reservation.user = user;

        await reservation.save();

        

        return res.send("reservation post sucess");
    }catch(err){
        console.log(err);
        return res.status(500).send("예약 등록 과정에서의 에러");
    }
});




export default router;