import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({user}) {
  const router = useRouter();
  const clickLogout = async () => {
    try{
      await axios.get("/auth/logout");
      router.reload();
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="p-10 flex items-center justify-between">
      <div>
        {user ? (
           <button onClick={clickLogout} className="border rounded p-3">로그아웃</button>
        ):(
          
           
            <>
            <Link href={"/register"}>
              <a className="border rounded p-3">회원가입</a>
            </Link>
            <Link href={"/login"}>
              <a className="border rounded p-3 ml-3">로그인</a>
            </Link>
            </>
        )}
      </div>
      {user&&(
        <>
        <div>
        <Link href={"posts/create"}>
          <a className="border rounded p-3">글쓰기</a>
        </Link>
        {(user?.level === "Student" || user?.level === "Normal") && (
          <Link href={"/application"}>
            <a className="border rounded p-3">동아리 지원서</a>
          </Link>
        )}
      </div>
      
      {(user?.level === "Root" || user?.level === "Manager")&&(
         <div>
         <Link href={"/admin"}>
           <a className="border rounded p-3">관리자페이지</a>
         </Link>
       </div>
      )}
     
      </>
      )}
      

    </div>
  )
}

export const getServerSideProps = async ({req}) => {
  try{
    const cookie = req.headers.cookie;
    if(!cookie) throw new Error("쿠키 정보가 없습니다.");
    const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
      headers: {
        cookie: cookie,
        
      }
    });
    console.log(result.data)
    return {
      props: {user: result.data}
    }
  }catch(err){
    console.log(err);
    return {
      props: {}
    };
  }
}