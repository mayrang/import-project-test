import {Router, Request, Response} from "express";
import { AvailableFramework } from "../entity/AvailableFramework";
import { AvailableLanguage } from "../entity/AvailableLanguage";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { userMiddleware } from "../middlewares/user";

const router = Router();

router.post("/register", async (req:Request, res:Response) => {
    const {nickname, email, studentId, jobObjective, fieldOfHope, phoneNumber, grade, department, level, blog} = req.body;
    try{
        let error:any = {};
        if(nickname.trim() == "") error.nickname = "이름은 비워둘 수 없습니다.";
        if(email.trim() == "") error.email = "이메일은 비워둘 수 없습니다.";
        if(level.trim() == "") error.level = "레벨은 비워둘 수 없습니다.";
        if(Object.keys(error).length > 0) return res.status(400).json(error);

        const checkUser = await User.findOneBy({ email});
        if(checkUser) return res.status(400).json({email: "중복되는 이메일은 사용할 수 없습니다."});

        const user = new User();
        const availableLanguage = new AvailableLanguage();
        const availableFramework = new AvailableFramework();

        user.nickname = nickname;
        user.email = email;
        user.level = level;
        if(level !==  "Normal"){
            user.studentId = studentId;
            user.grade = grade;
            user.department = department;
            availableLanguage.languageName = "Python";
            availableFramework.framework = "Django";
        }else{
            availableLanguage.languageName = "Java";
            availableFramework.framework = "Spring";
        }
        if(phoneNumber.trim() !== "") user.phoneNumber = phoneNumber;
        if(blog.trim() !== "") user.blog = blog;
        if(jobObjective.trim() !== "") user.jobObjective = jobObjective;
        if(fieldOfHope.trim() !== "") user.fieldOfHope = fieldOfHope;

        await user.save();

        availableFramework.user = user;
        availableLanguage.user = user;

        await availableFramework.save();
        await availableLanguage.save();

        return res.status(200).json(user);


    }catch(err){
        console.log(err);
        return res.status(500).json({error: "회원가입 과정에서 서버에러"})
    }
    
});


router.post("/login", async (req:Request, res:Response) => {
    const {email, nickname} = req.body;
    try{
        let error:any = {};
        if(email.trim() === "") error.email = "이메일은 비워둘 수 없습니다.";
        if(nickname.trim() === "") error.nickname = "닉네임은 비워둘 수 없습니다.";

        if(Object.keys(error).length > 0) return res.status(400).json(error);

        const user = await User.findOneBy({email, nickname});
        if(!user) return res.status(400).json({error: "해당 유저가 없습니다."});

        const token = jwt.sign(email, process.env.JWT_SECRET_KEY);

        res.set("Set-Cookie", cookie.serialize("token", token, {httpOnly: true, maxAge: 60*30, path: "/"}));
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "로그인 과정에서 서버 에러"});
    }
});

router.get("/me", userMiddleware, async (req:Request, res:Response) => {
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저가 존재하지 않습니다."});
        else return res.status(200).json(user);

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "로그인 여부 체크 과정에서의 서버 에러"})
    }
});

router.get("/logout", async (_:Request, res:Response) => {
    res.set("Set-Cookie", cookie.serialize("token", "", {httpOnly: true, sameSite: "strict", expires: new Date(0), path: "/"}));
    return res.status(200).send("로그아웃 성공");
});

export default router;