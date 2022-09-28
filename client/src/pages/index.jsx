import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 flex items-center justify-between">
      <div>
        <Link href={"/register"}>
          <a className="border rounded p-3">회원가입</a>
        </Link>
        <Link href={"/login"}>
          <a className="border rounded p-3 ml-3">로그인</a>
        </Link>
      </div>

      <div>
        <Link href={"posts/create"}>
          <a className="border rounded p-3">글쓰기</a>
        </Link>
      </div>

      <div>
        <Link href={"/admin"}>
          <a className="border rounded p-3">관리자페이지</a>
        </Link>
      </div>

    </div>
  )
}
