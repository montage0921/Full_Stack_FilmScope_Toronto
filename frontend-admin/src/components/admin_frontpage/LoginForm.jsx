import React, { useContext, useState } from "react";
import { LoginContext } from "../../App";
import { sendLoginInfo } from "../../api/userAuth";
import { LoginStatus } from "../../utils/loginstatus";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginInfo = {
      username: username,
      password: password,
    };
    await sendLoginInfo(loginInfo, setLoginStatus);
  };

  return (
    <>
      <span className="mt-3">Please Login As Admin</span>
      <form className="text-white text-base pl-1" onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          className="w-11/12 text-black"
          onChange={handleUserName}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          className="w-11/12 text-black"
          value={password}
          onChange={handlePassword}
        />
        <button
          className="mt-2 w-16 border-white border-2 rounded-md hover:font-bold"
          type="submit"
        >
          Login
        </button>
        {loginStatus === LoginStatus.FAILED && (
          <p className="text-red-400 text-base font-bold">
            Error,please try again
          </p>
        )}
      </form>
    </>
  );
}

export default LoginForm;
