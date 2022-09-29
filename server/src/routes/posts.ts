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
        console.log(postData)
        post.push(postData);
        const comments = await Comment.findBy({
            postId: postData!.postId
        });
        console.log(postData);
        post = [
            ...post,
            ...comments
        ];
        console.log(post)

        

        return res.status(200).send(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "페이지를 가져오는데 실패하였습니다."})
    }
});

export default router;