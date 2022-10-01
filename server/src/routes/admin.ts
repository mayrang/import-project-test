import {Router, Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ClubApplication } from "../entity/ClubApplication";
import { User } from "../entity/User";

const router = Router();

router.get("/applications", async (req:Request, res:Response) => {
    try{
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

export default router;