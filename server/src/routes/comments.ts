import {Router, Request, Response} from "express";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { userMiddleware } from "../middlewares/user";


const router = Router();

router.post("/:postId", userMiddleware, async (req:Request, res:Response) => {
    const postId = req.params.postId;
    const {comment} = req.body;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).send("댓글 작성 권한이 없습니다.");

        const post = await Post.findOneByOrFail({
            postId: parseInt(postId)
        });
        
        const newComment = new Comment();
        newComment.comment = comment;
        newComment.post = post;
        newComment.user = user;
        newComment.username = user.nickname;
        await newComment.save();

        return res.status(200).send("저장 성공");

    }catch(err){
        console.log(err);
        return res.status(500).send("댓글 저장 과정에서 서버 에러")
    }
});

export default router;