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

router.delete("/:commentId", userMiddleware, async (req:Request, res:Response) => {
    const commentId = req.params.commentId;
    try{
        const user = res.locals.user;
        if(!user) return res.status(500).send("로그인이 안되어있습니다.");
        const comment = await Comment.findOneByOrFail({
            commentId: parseInt(commentId)
        });
        if(comment.userId !== user.userId) return res.status(400).send("삭제 권한이 없습니다.");
        await comment.remove();

        return res.status(200).send("삭제 성공");
    }catch(err){
        console.log(err);
        return res.status(500).send("댓글 삭제 과정에서 서버 에러!");
    }
});


router.post("/edit/:commentId", userMiddleware, async (req:Request, res:Response) => {
    const commentId = req.params.commentId;
    const {editComment} = req.body;
    try{
        const user = res.locals.user;
        if(editComment.trim() === "") return res.status(400).send("댓글을 비워둘 수 없습니다.");
        if(!user) return res.status(200).send("로그인이 안되어있습니다.");
        const comment = await Comment.findOneBy({
            commentId: parseInt(commentId)
        });
        if(!comment) return res.status(400).send("해당 댓글이 존재하지 않습니다.");
        if(comment.userId !== user.userId ) return res.status(400).send('수정 권한이 없습니다.');
        comment.comment = editComment;
        await comment.save();

        return res.status(200).send("댓글 수정 성공")
    }catch(err){
        console.log(err);
        return res.status(500).send("댓글 수정과정에서 서버 에러")
    }
})
export default router;