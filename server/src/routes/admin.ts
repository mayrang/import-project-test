import {Router, Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ClubApplication } from "../entity/ClubApplication";
import { User } from "../entity/User";
import { userMiddleware } from "../middlewares/user";
import {In} from "typeorm"; 

const router = Router();

router.get("/applications", userMiddleware, async (_:Request, res:Response) => {
    try{
        const user = res.locals.user;
        if(user.level !== "Root") return res.status(400).send("권한이 없습니다.");
        const clubApplications = await ClubApplication.find({
            relations: {
                user: {
                    availableFrameworks: true,
                    availableLanguages: true
                },
                
            },
            select: {
                projectExperience: true,
                reasonForApplication: true,
                user: {
                    userId: true,
                    nickname: true,
                    department: true,
                    grade: true,
                    phoneNumber: true,
                    email: true,
                    blog: true,
                    level: true,
                    studentId: true,
                    fieldOfHope: true,
                    jobObjective: true,
                    availableFrameworks: {
                        framework: true
                    },
                    availableLanguages: {
                        languageName: true
                    }

                }

            }
        });
        const returnClubApplications = clubApplications.map((clubApplication) => {
            return {
                ...clubApplication.user,
                reasonForApplication: clubApplication.reasonForApplication,
                projectExperience: clubApplication.projectExperience,
                availableFrameworks: clubApplication.user.availableFrameworks.map((it) => it.framework),
                availableLanguages: clubApplication.user.availableLanguages.map((it) => it.languageName)      
            }
        })
        console.log(returnClubApplications)


        return res.status(200).send(returnClubApplications)
    }catch(err){
        console.log(err);
        return res.status(500).send("지원서 가져오는 과정에서 서버 에러");
    }
});


router.get("/members/homepage", userMiddleware,  async (_:Request, res:Response) => {
    try{
        const user = res.locals.user;
        if(user.level !== "Root") return res.status(400).send("권한이 없습니다.");

        const users = await User.find({
            where: {
                level: In(["Normal", "Student",])
            },
            relations: {
                availableFrameworks: true,
                availableLanguages: true,
            }
        });

        const returnUsers = users.map((user) => {
            return {
                ...user,
                availableFrameworks: user.availableFrameworks.map((framework) => framework.framework),
                availableLanguages: user.availableLanguages.map((language) => language.languageName),
            }
        });

        return res.status(200).send(returnUsers);

    }catch(err){
        console.log(err);
        return res.status(500).send("홈페지이 멤버를 가져오는 과정에서 서버 에러");
    }
});

router.get("/members/club", userMiddleware, async (_:Request, res:Response) => {
    try{
        const user = res.locals.user;
        if(user.level !== "Root") return res.status(400).send("권한이 없습니다.");

        const users = await User.find({
            where: {
                level: In(["Root", "Member", "Manager"])
            },
            relations: {
                availableFrameworks: true,
                availableLanguages: true,
            }
        });

        const returnUsers = users.map((user) => {
            return {
                ...user,
                availableFrameworks: user.availableFrameworks.map((framework) => framework.framework),
                availableLanguages: user.availableLanguages.map((language) => language.languageName),
            }
        });

        return res.status(200).send(returnUsers);
    }catch(err){
        console.log(err);
        return res.status(500).send("동아리 멤버를 가져오는 과정에서 서버 에러");
    }
})

export default router;