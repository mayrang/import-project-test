import {Router, Request, Response } from "express";
import { userMiddleware } from "../middlewares/user";
import {isEmpty} from "class-validator";
import { ClubApplication } from "../entity/ClubApplication";

const router = Router();

router.post("/", userMiddleware, async (req:Request, res:Response) => {
    const {reasonForApplication, projectExperience} = req.body;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).send("로그인한 사용자만 지원 가능합니다.");
        if(isEmpty(reasonForApplication)) return res.status(400).send("지원 이유를 써주세요");
        if(isEmpty(projectExperience)) return res.status(400).send("프로젝트 경험을 써주세요");

        const clubApplication = new ClubApplication();
        clubApplication.reasonForApplication = reasonForApplication;
        clubApplication.projectExperience = projectExperience;
        clubApplication.user = user;

        await clubApplication.save();

        return res.status(200).send("동아리 지원서 저장 성공");
    }catch(err){
        console.log(err);
        return res.status(500).send("동아리 지원과정에서 서버 에러");
    }
});

export default router;