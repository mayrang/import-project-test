import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
//import { v4 as uuidv4 } from 'uuid';

export default function PostForm() {
    const [post, setPost] = useState({
        postTitle: "",
        postMain: "",
    });
    const router = useRouter();

    const handleChange = ({ target: { name, value } }) =>
        setPost({ ...post, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

           // post.postId= uuidv4();
            //post.postTime= new Date().getTime();
            const result = await axios.post(`posts/edit`,{
                body: JSON.stringify({
                    //postId:post.postId,
                    postTitle:post.postTitle,
                    postMain:post.postMain,
                    //postTime:post.postTime,
                }),
                headers: { "Content-Type": `application/json`}
            });
            toast.success("저장되었습니다.", { //으잉 왜 이건 안되냐
                position:"bottom-right"
            });
            router.push(`/posts/${result.data.id}`);

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="postTitle">
                        Post title
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        id="postTitle"
                        name="postTitle"
                        onChange={handleChange}
                        value={post.postTitle}
                    />
                </div>


                <div>
                    <label
                        htmlFor="postMain"
                    >
                        Write a main
                    </label>
                    <input
                        name="postMain"
                        id="postMain"
                        placeholder="Main"
                        onChange={handleChange}
                        value={post.postMain}
                    ></input>
                </div>

                <button>
                    Save Post
                </button>
            </form>
        </div>
    );
};

