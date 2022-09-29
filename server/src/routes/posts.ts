import {Router, Request, Response} from "express";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { userMiddleware } from "../middlewares/user";

const router = Router();

router.post("/create", userMiddleware, async (req:Request, res:Response) => {
    const {postTitle, postMain} = req.body;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({message: "로그인한 유저만 글을 쓸 수 있습니다."});
        console.log(req.body)
        if(postTitle.trim() === "") return res.status(400).json({message: "제목은 비워둘 수 없습니다."});
        if(postMain.trim() === "") return res.status(400).json({message: "내용은 비워둘 수 없습니다."});

        const newPost = new Post();
        newPost.postTitle = postTitle;
        newPost.main = postMain;
        newPost.user = user;
        newPost.username = user.nickname;

        await newPost.save();

        return res.status(200).json(newPost);
        
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "저장 과정에서 서버 에러 발생!"});
    }
});

router.get("/:id", async (req:Request, res:Response) => {
    try{
        const postId = req.params.id;
        let post:any = [];
        const postData = await Post.findOneByOrFail({
            postId: parseInt(postId)
        });

        post.push(postData);
        const comments = await Comment.findBy({
            postId: postData!.postId
        });

        post = [
            ...post,
            ...comments
        ];


        

        return res.status(200).send(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "페이지를 가져오는데 실패하였습니다."})
    }
});

router.delete("/:postId", userMiddleware, async (req:Request, res:Response) => {
    const postId = req.params.postId;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).send("유저가 존재하지 않습니다.");
        const post = await Post.findOneByOrFail({postId: parseInt(postId)});
        if(post.userId !== user.userId) return res.status(400).send("삭제 권한이 없습니다.");
        await post.remove();
        return res.status(200).send("삭제 성공")
    }catch(err){
        console.log(err);
        return res.status(500).send("삭제 과정에서 서버 에러!")
    }
});

export default router;