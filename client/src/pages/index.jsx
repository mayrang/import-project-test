import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewCalendar from "../components/ViewCalendar";
import { asyncUserLoadMyInfo, asyncUserLogout } from "../redux/reducers/UserSlice";
import wrapper from "../redux/store";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, logoutDone, logoutError} = useSelector((state) => state.user);
  console.log(user)
  const clickLogout =  () => {
    dispatch(asyncUserLogout());
   
  }

  useEffect(() => {
    if(logoutDone){
      router.reload()
    }
    if(logoutError){
      alert(logoutError);
      return;
    }
  }, [logoutDone, logoutError])
  
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
          <Link href={"/clubapp"}>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
  try{
    const cookie = req.headers.cookie;
    if(!cookie) throw new Error("쿠키 정보가 없습니다.");
    await store.dispatch(asyncUserLoadMyInfo(cookie));
    return {
      props: {}
    }
  }catch(err){
    console.log(err);
    return {
      props: {}
    };
  }
})