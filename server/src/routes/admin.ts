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


router.post("/application/:userId", userMiddleware, async (req:Request, res:Response) => {
    const result = req.query.result;
    const userId = req.body.userId
    try{
        const clubApplication = await ClubApplication.findOneBy({ userId });
        if(!clubApplication) return res.status(400).send("지원서가 존재하지 않습니다.");
        const user = await User.findOneBy({userId});
        if(!user) return res.status(400).send("해당 유저가 존재하지 않습니다.");

        if(result === "1"){
            user.level = "Member"
        }else if(result === "0"){
            
        }else{
            return res.status(400).send("query value error")
        }
        await clubApplication.remove();
        await user.save();

        return res.status(200).send("성공");

    }catch(err){
        console.log(err);
        return res.status(500).send("합불 처리과정에서 서버 에러")
    }
    
});

router.delete("/members", userMiddleware,async (req:Request, res:Response) => {
    const userId = req.body.userId;
    try{
        const users = await User.find({
            where: {
                userId: In(userId)
            }
        });

        console.log(users);
        await AppDataSource.getRepository(User).delete({
            userId: In(userId)
        });
        return res.status(200).send("삭제 성공")
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})
export default router;