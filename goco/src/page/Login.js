import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loginAPI from '../api/authAPI';
import * as React from 'react';
export default function Login() {
  const id = useRef();
  const pwd = useRef();
  // 로그아웃 시 쿠키 삭제
  // document.cookie = `Token=null; expires=Thu, 18 Dec 2000 12:00:00 UTC`;
  return (
    <div className={styles.BackGround}>
      <div>
        <input ref={id} placeholder="ID"></input>
        <input ref={pwd} type="password" placeholder="Password"></input>
        <Link
          to={`/goco`}
          onClick={() => {
            loginAPI(id.current.value, pwd.current.value);
          }}>
          <button>로그인 하기</button>
        </Link>
        <Link to="/search">
          <div>비밀번호 찾기</div>
        </Link>
        <Link to="/signup">
          <div>회원가입</div>
        </Link>
        <button
          onClick={() => {
            loginAPI(id.current.value, pwd.current.value);
          }}>
          qx
        </button>
      </div>
    </div>
  );
}
