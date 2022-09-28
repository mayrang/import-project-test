import {Router, Request, Response} from "express";
import { AvailableFramework } from "../entity/AvailableFramework";
import { AvailableLanguage } from "../entity/AvailableLanguage";
import { User } from "../entity/User";

const router = Router();

router.post("/register", async (req:Request, res:Response) => {
    const {nickname, email, studentId, phoneNumber, grade, department, level, blog} = req.body;
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


export default router;